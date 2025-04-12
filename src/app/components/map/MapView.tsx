// src/app/components/map/MapView.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Market } from '../../lib/types';
import MarkerPopup from './MarkerPopup';

// Import leaflet CSS in your component or in a global CSS file
// This is a workaround since we can't use Leaflet in SSR
// You would normally handle this differently in production
import 'leaflet/dist/leaflet.css';

// This is needed to properly display markers in Leaflet
// In a real app, you'd have these as actual files
const defaultIcon = L.icon({
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  markets: Market[];
  selectedMarket: Market | null;
  onMarkerClick: (market: Market) => void;
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({
  markets,
  selectedMarket,
  onMarkerClick,
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // This prevents hydration errors with Leaflet
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={`bg-gray-200 ${className}`}>Loading map...</div>;
  }

  // Calculate center position from markets or default to a position
  const center = selectedMarket 
    ? [selectedMarket.coordinates.lat, selectedMarket.coordinates.lng] 
    : [37.7749, -122.4194]; // Default to San Francisco
  
  return (
    <MapContainer 
      center={center as [number, number]} 
      zoom={12} 
      className={`h-full w-full ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {markets.map(market => (
        <Marker
          key={market.id}
          position={[market.coordinates.lat, market.coordinates.lng]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick(market),
          }}
        >
          <Popup>
            <MarkerPopup market={market} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;