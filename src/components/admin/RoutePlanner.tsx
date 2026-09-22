'use client';

// Loaded client-side only via dynamic(() => import('./RoutePlanner'), { ssr: false })

import { useEffect, useRef, useState } from 'react';
import type { Map, Marker, Polyline } from 'leaflet';
import { RouteWaypoint } from '@/types/db';

export interface DestOption {
  id: string;
  name: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

interface RoutePlannerProps {
  waypoints: RouteWaypoint[];
  destinations: DestOption[];
  onChange: (waypoints: RouteWaypoint[]) => void;
}

export default function RoutePlanner({ waypoints, destinations, onChange }: RoutePlannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const polylineRef = useRef<Polyline | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [selectedDestId, setSelectedDestId] = useState('');

  // Keep refs in sync to avoid stale closures inside the map click handler
  const addModeRef = useRef(addMode);
  const waypointsRef = useRef(waypoints);
  const onChangeRef = useRef(onChange);
  useEffect(() => { addModeRef.current = addMode; }, [addMode]);
  useEffect(() => { waypointsRef.current = waypoints; }, [waypoints]);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  // Initialize map once on mount
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

    const map = L.map(containerRef.current).setView([7.8731, 80.7718], 7);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    map.on('click', (e: { latlng: { lat: number; lng: number } }) => {
      if (!addModeRef.current) return;
      const { lat, lng } = e.latlng;
      const id = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const current = waypointsRef.current;
      const customCount = current.filter((w) => !w.destinationId).length;
      onChangeRef.current([
        ...current,
        { id, label: `Custom Stop ${customCount + 1}`, lat, lng },
      ]);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
      polylineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-draw markers and polyline whenever waypoints change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof import('leaflet');

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (polylineRef.current) { polylineRef.current.remove(); polylineRef.current = null; }

    waypoints.forEach((wp, i) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:28px;height:28px;background:#059669;border:2.5px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,0.35)">${i + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      });
      const marker = L.marker([wp.lat, wp.lng], { icon }).addTo(map);
      marker.bindTooltip(wp.label, { permanent: false, direction: 'top', offset: [0, -8] });
      markersRef.current.push(marker);
    });

    if (waypoints.length >= 2) {
      const latlngs = waypoints.map((wp) => [wp.lat, wp.lng] as [number, number]);
      polylineRef.current = L.polyline(latlngs, {
        color: '#059669',
        weight: 3,
        dashArray: '8, 5',
        opacity: 0.85,
      }).addTo(map);
    }

    if (waypoints.length === 1) {
      map.setView([waypoints[0].lat, waypoints[0].lng], 10);
    } else if (waypoints.length >= 2) {
      const bounds = waypoints.map((wp) => [wp.lat, wp.lng] as [number, number]);
      map.fitBounds(bounds as [[number, number], [number, number]], { padding: [50, 50] });
    }
  }, [waypoints]);

  function addFromDestination() {
    const dest = destinations.find((d) => d.id === selectedDestId);
    if (!dest || dest.latitude == null || dest.longitude == null) return;
    onChange([
      ...waypoints,
      { id: dest.id, label: dest.name, lat: dest.latitude, lng: dest.longitude, destinationId: dest.id },
    ]);
    setSelectedDestId('');
  }

  const availableDests = destinations.filter(
    (d) => d.latitude != null && d.longitude != null && !waypoints.some((w) => w.destinationId === d.id)
  );

  return (
    <div className="space-y-4">
      {/* Add controls */}
      <div className="flex gap-2 flex-wrap items-center">
        <select
          value={selectedDestId}
          onChange={(e) => setSelectedDestId(e.target.value)}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">— Add from saved destination —</option>
          {availableDests.map((d) => (
            <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={addFromDestination}
          disabled={!selectedDestId}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          Add Stop
        </button>
        <button
          type="button"
          onClick={() => setAddMode((v) => !v)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            addMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'border border-gray-200 text-gray-600 hover:border-blue-400'
          }`}
        >
          {addMode ? '✓ Tap map to place' : '+ Custom stop'}
        </button>
      </div>

      {addMode && (
        <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
          Click anywhere on the map to add a custom waypoint. Click &ldquo;+ Custom stop&rdquo; again to exit this mode.
        </p>
      )}

      {/* Waypoint list */}
      {waypoints.length > 0 ? (
        <div className="space-y-2">
          {waypoints.map((wp, i) => (
            <div key={wp.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
              <span className="w-7 h-7 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{wp.label}</p>
                <p className="text-xs text-gray-400">{wp.lat.toFixed(5)}, {wp.lng.toFixed(5)}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange(waypoints.filter((_, idx) => idx !== i))}
                className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none flex-shrink-0"
                aria-label="Remove waypoint"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 text-center py-1">
          No stops yet — add from saved destinations or place custom stops on the map.
        </p>
      )}

      {/* Map */}
      <div
        ref={containerRef}
        style={{ height: '380px', width: '100%', borderRadius: '12px', border: '1px solid #e5e7eb' }}
      />
    </div>
  );
}
