'use client';

// Loaded client-side only via dynamic(() => import('./MapPicker'), { ssr: false })

import { useEffect, useRef } from 'react';
import type { Map, Marker } from 'leaflet';

interface MapPickerProps {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof import('leaflet');

    // Fix broken default icon paths in webpack
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const center: [number, number] = lat != null && lng != null ? [lat, lng] : [7.8731, 80.7718];
    const map = L.map(containerRef.current).setView(center, lat != null ? 10 : 7);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    if (lat != null && lng != null) {
      markerRef.current = L.marker([lat, lng]).addTo(map);
    }

    map.on('click', (e: { latlng: { lat: number; lng: number } }) => {
      const { lat: newLat, lng: newLng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([newLat, newLng]);
      } else {
        markerRef.current = L.marker([newLat, newLng]).addTo(map);
      }
      onChange(newLat, newLng);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        style={{ height: '288px', width: '100%', borderRadius: '12px', border: '1px solid #e5e7eb' }}
      />
      {lat != null && lng != null ? (
        <p className="text-xs text-gray-500">
          Selected: {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
      ) : (
        <p className="text-xs text-gray-400">Click on the map to set the destination location</p>
      )}
    </div>
  );
}
