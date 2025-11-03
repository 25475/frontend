import { getApiBaseUrl, getApiUrl } from './utils/api';

// Debugging de URLs - puedes ejecutar esto en la consola del navegador
console.log('='.repeat(50));
console.log('🔍 DEBUG DE URLs DE API');
console.log('='.repeat(50));
console.log('📍 URL Base:', getApiBaseUrl());
console.log('🛍️ URL Productos:', getApiUrl('/api/products'));
console.log('📂 URL Categorías:', getApiUrl('/api/categories'));
console.log('📋 URL Planes:', getApiUrl('/api/plans'));
console.log('='.repeat(50));

// Test rápido de conexión
fetch(getApiUrl('/api/products'))
  .then(response => {
    console.log('✅ Status de productos:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('📦 Productos encontrados:', data.length);
  })
  .catch(error => {
    console.error('❌ Error al cargar productos:', error);
  });

export {};