import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  layers: string[];
  className?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ layers, className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map centered on Ahmedabad
      mapInstanceRef.current = L.map(mapRef.current).setView([23.0225, 72.5714], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Add some mock markers for Ahmedabad landmarks
      const landmarks = [
        { name: 'Sabarmati Ashram', lat: 23.0607, lng: 72.5797 },
        { name: 'Kankaria Lake', lat: 23.0088, lng: 72.6283 },
        { name: 'ISRO Space Applications Centre', lat: 23.0693, lng: 72.5493 }
      ];

      landmarks.forEach(landmark => {
        L.marker([landmark.lat, landmark.lng])
          .addTo(mapInstanceRef.current!)
          .bindPopup(landmark.name);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className={`h-96 w-full rounded-lg ${className}`} />;
};