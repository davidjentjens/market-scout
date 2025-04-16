// src/app/components/map/MapView.tsx
"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Market } from '../../lib/types';
import MarkerPopup from './MarkerPopup';

// Import leaflet CSS in your component
import 'leaflet/dist/leaflet.css';

// Create custom market icon
const createMarketIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    html: `
      <div class="relative flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isSelected ? '#3D6C38' : '#5B8C56'}" class="w-8 h-8">
          <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
        ${isSelected ? '<div class="absolute top-0 right-0 w-3 h-3 bg-primary-300 rounded-full border-2 border-white animate-ping"></div>' : ''}
      </div>
    `
  });
};

// Create custom user location icon
const userLocationIcon = L.divIcon({
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  html: `
    <div class="flex items-center justify-center">
      <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
        <div class="w-3 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  `
});

// MapView recenter component (to handle map centering)
const MapViewCenter = ({ center, markets, userLocation, selectedMarket }: { 
  center: [number, number], 
  markets: Market[], 
  userLocation: { lat: number, lng: number } | null,
  selectedMarket: Market | null
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedMarket) {
      map.setView([selectedMarket.coordinates.lat, selectedMarket.coordinates.lng], map.getZoom());
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], map.getZoom());
    } else if (markets.length > 0) {
      // Center the map to fit all markets
      const bounds = L.latLngBounds(markets.map(m => [m.coordinates.lat, m.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView(center, map.getZoom());
    }
  }, [center, map, markets, userLocation, selectedMarket]);
  
  return null;
};

interface MapViewProps {
  markets: Market[];
  selectedMarket: Market | null;
  onMarkerClick: (market: Market) => void;
  userLocation?: { lat: number, lng: number } | null;
  className?: string;
}

const mapCenter: [number, number] = [45.522, -122.677]; // Default Portland

const MapView: React.FC<MapViewProps> = ({
  markets,
  selectedMarket,
  onMarkerClick,
  userLocation = null,
  className = '',
}) => {
  const defaultZoom = 11;

  return (
    <MapContainer 
      center={mapCenter}
      zoom={defaultZoom}
      className={`h-full w-full ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapViewCenter 
        center={mapCenter} 
        markets={markets} 
        userLocation={userLocation} 
        selectedMarket={selectedMarket} 
      />
      
      {/* User location marker */}
      {userLocation && (
        <>
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userLocationIcon}
          >
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
          <Circle 
            center={[userLocation.lat, userLocation.lng]}
            radius={1000}
            pathOptions={{ 
              fillColor: '#3B82F6', 
              fillOpacity: 0.1, 
              color: '#3B82F6',
              weight: 1
            }} 
          />
        </>
      )}
      
      {/* Market markers */}
      {markets.map(market => (
        <Marker
          key={market.id}
          position={[market.coordinates.lat, market.coordinates.lng]}
          icon={createMarketIcon(selectedMarket?.id === market.id)}
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