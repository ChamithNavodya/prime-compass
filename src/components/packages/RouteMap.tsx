'use client';

// Loaded client-side only via dynamic(() => import('./RouteMap'), { ssr: false })

import { useEffect, useRef } from 'react';
import type { Map, Marker, Polyline } from 'leaflet';
import { RouteWaypoint } from '@/types/db';

export default function RouteMap({ waypoints }: { waypoints: RouteWaypoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const polylineRef = useRef<Polyline | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof import('leaflet');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const center: [number, number] = waypoints.length > 0
      ? [waypoints[0].lat, waypoints[0].lng]
      : [7.8731, 80.7718];

    const map = L.map(containerRef.current, { zoomControl: true, scrollWheelZoom: false }).setView(center, 7);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    waypoints.forEach((wp, i) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:30px;height:30px;background:#2D5A27;border:2.5px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${i + 1}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -18],
      });
      const marker = L.marker([wp.lat, wp.lng], { icon }).addTo(map);
      marker.bindPopup(`<strong style="font-size:13px">${wp.label}</strong>`, { maxWidth: 200 });
      markersRef.current.push(marker);
    });

    if (waypoints.length >= 2) {
      const latlngs = waypoints.map((wp) => [wp.lat, wp.lng] as [number, number]);
      polylineRef.current = L.polyline(latlngs, {
        color: '#2D5A27',
        weight: 3,
        dashArray: '8, 5',
        opacity: 0.8,
      }).addTo(map);

      map.fitBounds(latlngs as [[number, number], [number, number]], { padding: [50, 50] });
    } else if (waypoints.length === 1) {
      map.setView([waypoints[0].lat, waypoints[0].lng], 10);
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
      polylineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: '380px', width: '100%', borderRadius: '16px', border: '1px solid #e5e7eb' }}
    />
  );
}
