'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Marker as LeafletMarker } from 'leaflet';
import {
  MapContainer,
  Marker as LeafletMarkerComponent,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { type ReactNode, useEffect, useMemo, useRef } from 'react';

export type LocationMapProps = {
  center: [number, number];
  marker?: [number, number];
  className?: string;
  zoom?: number;
  scrollWheelZoom?: boolean;
  onLocationChange?: (coords: [number, number]) => void;
  tileUrl?: string;
  tileAttribution?: string;
  showMarker?: boolean;
  children?: ReactNode;
};

const markerHtml = `
  <span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9999px;background:#ffffff;border:3px solid #3B82F6;box-shadow:0 6px 12px rgba(0,0,0,0.18);">
    <span style="display:block;width:12px;height:12px;border-radius:9999px;background:#3B82F6"></span>
  </span>
`;

const markerIcon = L.divIcon({
  className: '',
  html: markerHtml,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  const [lat, lng] = center;

  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [map, lat, lng, zoom]);

  return null;
};

const MapClickListener = ({
  onLocationChange,
}: {
  onLocationChange?: (coords: [number, number]) => void;
}) => {
  useMapEvents({
    click(event) {
      if (!onLocationChange) return;
      const { lat, lng } = event.latlng;
      onLocationChange([lat, lng]);
    },
  });

  return null;
};

const DraggableMarker = ({
  position,
  onLocationChange,
}: {
  position: [number, number];
  onLocationChange?: (coords: [number, number]) => void;
}) => {
  const markerRef = useRef<LeafletMarker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (!marker) return;
        const { lat, lng } = marker.getLatLng();
        onLocationChange?.([lat, lng]);
      },
    }),
    [onLocationChange]
  );

  return (
    <LeafletMarkerComponent
      position={position}
      icon={markerIcon}
      draggable={Boolean(onLocationChange)}
      eventHandlers={eventHandlers}
      ref={markerRef}
    />
  );
};

export function LocationMap({
  center,
  marker,
  className,
  zoom = 16,
  scrollWheelZoom = false,
  onLocationChange,
  tileUrl,
  tileAttribution,
  showMarker = true,
  children,
}: LocationMapProps) {
  const mapClassName = ['w-full overflow-hidden'];
  if (className) {
    mapClassName.push(className);
  } else {
    mapClassName.push('h-64');
  }

  const markerPosition = marker ?? center;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={false}
      className={mapClassName.join(' ')}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution={
          tileAttribution ??
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
        url={tileUrl ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
      />
      <MapUpdater center={center} zoom={zoom} />
      <MapClickListener onLocationChange={onLocationChange} />
      {showMarker ? (
        <DraggableMarker position={markerPosition} onLocationChange={onLocationChange} />
      ) : null}
      {children}
    </MapContainer>
  );
}
