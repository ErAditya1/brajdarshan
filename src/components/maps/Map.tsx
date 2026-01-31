'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PlaceMapProps {
  lat: number;
  lng: number;
  name: string;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function PlaceMap({ lat, lng, name }: PlaceMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 14,
    });

    // Marker
    new mapboxgl.Marker({ color: '#dc2626' })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setText(name)
      )
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng, name]);

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
