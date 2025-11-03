import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet's default icon paths when bundlers change asset locations
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function ClickHandler({ onClick }: { onClick: (lat:number, lon:number)=>void }){
  useMapEvents({
    click(e){
      onClick(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}

export default function MapPicker({ initialPosition, onCancel, onConfirm }: { initialPosition?: {lat:number, lon:number}, onCancel: ()=>void, onConfirm: (sel:{lat:number, lon:number, display_name?:string})=>void }){
  const [pos, setPos] = useState<{lat:number, lon:number}|null>(initialPosition || null)
  const [displayName, setDisplayName] = useState<string|undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(!pos) return
    // reverse geocode
    let mounted = true
    setLoading(true)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.lat}&lon=${pos.lon}`)
      .then(r=>r.json())
      .then(js=>{ if(mounted) setDisplayName(js.display_name || undefined) })
      .catch(()=>{})
      .finally(()=>{ if(mounted) setLoading(false) })
    return ()=>{ mounted = false }
  }, [pos])

  const confirm = ()=>{
    if(!pos) return alert('Selecciona un punto en el mapa')
    onConfirm({ lat: pos.lat, lon: pos.lon, display_name: displayName })
  }

  return (
    <div className="fixed inset-0 z-70 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl h-[70vh] rounded-none overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 border-b">
          <h4 className="font-semibold">Seleccionar ubicación en el mapa</h4>
          <button onClick={onCancel} className="text-gray-600">Cerrar</button>
        </div>
        <div className="flex-1">
          <MapContainer center={pos? [pos.lat, pos.lon] : [0,0]} zoom={pos? 13 : 2} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onClick={(lat, lon)=> setPos({lat, lon})} />
            {pos && <Marker position={[pos.lat, pos.lon]} />}
          </MapContainer>
        </div>
        <div className="p-3 border-t flex items-center justify-between gap-3">
          <div className="text-sm">
            {pos ? (
              <div>
                <div className="font-medium">{displayName || `${pos.lat.toFixed(6)}, ${pos.lon.toFixed(6)}`}</div>
                {loading && <div className="text-xs text-gray-500">Obteniendo dirección...</div>}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">Haz click en el mapa para seleccionar una ubicación.</div>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="px-3 py-2 border">Cancelar</button>
            <button onClick={confirm} className="px-3 py-2 bg-cyan-500 text-white">Confirmar ubicación</button>
          </div>
        </div>
      </div>
    </div>
  )
}
