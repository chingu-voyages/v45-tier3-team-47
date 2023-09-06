import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
type MarkerWithId = mapboxgl.Marker & { id: string };
type PopupWithId = mapboxgl.Popup & { id: string };

const MapComponent = () => {

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null)
    const markers = useRef<Record<string, MarkerWithId>>({})
    const [lng, setLng] = useState(-74.50);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(5);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        })

        const marker1 = new mapboxgl.Marker() as MarkerWithId;
        marker1.setLngLat([-74.0445, 40.6892]);
        marker1.addTo(map.current);

        const popup1 = new mapboxgl.Popup({ closeOnClick: false }) as PopupWithId;
        popup1.setLngLat([-79.0747, 43.0799]);
        popup1.setHTML('<h4>Niagara Falls</h4>')
        popup1.addTo(map.current);


    }, [])


    return (
        <div style={{ width: "65%" }}>
            <div ref={mapContainer} style={{ height: "600px" }}></div>
        </div>
    )
}

export default MapComponent;