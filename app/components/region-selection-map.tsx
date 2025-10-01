"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import {
  CircleMarker,
  MapContainer,
  Polygon,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

type LatLngTuple = [number, number];

type RegionSelectionMapProps = {
  center: LatLngTuple;
  vertices: LatLngTuple[];
  className?: string;
  zoom?: number;
  disabled?: boolean;
  onAddPoint?: (point: LatLngTuple) => void;
  currentLocation?: LatLngTuple | null;
};

const MapUpdater = ({ center, zoom }: { center: LatLngTuple; zoom: number }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

const MapClickHandler = ({
  onAddPoint,
  disabled,
}: {
  onAddPoint?: (point: LatLngTuple) => void;
  disabled?: boolean;
}) => {
  useMapEvents({
    click(event) {
      if (disabled) return;
      onAddPoint?.([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
};

export const RegionSelectionMap = ({
  center,
  vertices,
  className,
  zoom = 16,
  disabled,
  onAddPoint,
  currentLocation,
}: RegionSelectionMapProps) => {
  const mapClassName = ["h-[320px] w-full overflow-hidden rounded-[32px]", className]
    .filter(Boolean)
    .join(" ");

  const polygonPositions = useMemo(() => {
    if (vertices.length < 3) return null;
    return [...vertices, vertices[0]];
  }, [vertices]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      className={mapClassName}
      style={{ minHeight: "20rem", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} zoom={zoom} />
      <MapClickHandler onAddPoint={onAddPoint} disabled={disabled} />

      {vertices.length >= 2 && (
        <Polyline
          positions={vertices}
          pathOptions={{ color: "#2563eb", weight: 2, dashArray: !polygonPositions ? "6 6" : undefined }}
        />
      )}

      {polygonPositions && (
        <Polygon
          positions={polygonPositions}
          pathOptions={{ color: "#0b7ef3", weight: 2, fillColor: "#3b82f6", fillOpacity: 0.18 }}
        />
      )}

      {vertices.map((point, index) => (
        <CircleMarker
          key={`${point[0]}-${point[1]}-${index}`}
          center={point}
          radius={7}
          pathOptions={{ color: "#1d4ed8", weight: 3, fillColor: "#ffffff", fillOpacity: 1 }}
        />
      ))}

      {currentLocation && (
        <CircleMarker
          center={currentLocation}
          radius={9}
          pathOptions={{ color: "#0b7ef3", weight: 3, fillColor: "#22d3ee", fillOpacity: 0.6 }}
        />
      )}
    </MapContainer>
  );
};
