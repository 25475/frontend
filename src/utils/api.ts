/**
 * Utilidad para manejar URLs de la API
 * Centraliza la configuración del servidor backend
 */

/**
 * Obtiene la URL base de la API desde las variables de entorno
 */
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

/**
 * Construye una URL completa de la API combinando la base con el endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  // Asegurar que el endpoint empiece con '/'
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${normalizedEndpoint}`;
};

/**
 * Función helper para hacer fetch con la URL de la API
 */
export const apiFetch = (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  return fetch(getApiUrl(endpoint), options);
};

/**
 * Función helper para hacer fetch y obtener JSON directamente
 */
export const apiGet = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const response = await apiFetch(endpoint, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Normaliza una URL de imagen que pueda venir desde la base de datos.
 * Casos cubiertos:
 * - URL absoluta apuntando a localhost:5000 -> se reemplaza por la URL base configurada (VITE_API_URL)
 * - Rutas relativas que comienzan con /uploads o uploads/ -> se prefija con la URL base
 * - Otros hosts válidos se devuelven tal cual
 */
export const normalizeImageUrl = (img?: string | null): string | undefined => {
  if (!img) return undefined

  const base = getApiBaseUrl()

  try {
    const url = new URL(img)

    // Si la imagen apunta a localhost o al puerto 5000 del servidor local,
    // reemplazamos por la URL base actual (p. ej. https://server-x5pe.vercel.app)
    if (url.hostname === 'localhost' || url.port === '5000') {
      const baseUrl = new URL(base)
      return `${baseUrl.origin}${url.pathname}${url.search}`
    }

    // URL válida y no localhost -> devolver tal cual
    return img
  } catch (e) {
    // No es una URL válida (probablemente una ruta relativa)
    // Soportar '/uploads/...' , 'uploads/...' y también ':5000/uploads/...'
    if (img.startsWith('/uploads')) return `${base}${img}`
    if (img.startsWith('uploads/')) return `${base}/${img}`

    const m = img.match(/:5000(\/uploads\/.*)/)
    if (m && m[1]) return `${base}${m[1]}`

    // Por defecto devolver la cadena original
    return img
  }
}

/**
 * Función helper para hacer POST con JSON
 */
export const apiPost = async (endpoint: string, data: any, options: RequestInit = {}): Promise<any> => {
  const response = await apiFetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export default {
  getApiBaseUrl,
  getApiUrl,
  apiFetch,
  apiGet,
  apiPost,
};