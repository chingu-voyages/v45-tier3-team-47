import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box } from '@mui/material';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
type MarkerWithId = mapboxgl.Marker & { id: string };
type PopupWithId = mapboxgl.Popup & { id: string };

type Props = {
  longitude: number;
  latitude: number;
};

const MapComponent = ({ longitude, latitude }: Props) => {

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null)
    const [zoom, _] = useState(5);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [longitude, latitude],
            zoom: zoom
        })


        // marker1 and popup1 are currently not rendered on map. Below is template to use 
        const marker1 = new mapboxgl.Marker() as MarkerWithId;
        marker1.setLngLat([-74.0445, 40.6892]);
        // marker1.addTo(map.current);

        const popup1 = new mapboxgl.Popup({ closeOnClick: false }) as PopupWithId;
        popup1.setLngLat([-79.0747, 43.0799]);
        popup1.setHTML('<h4>Niagara Falls</h4>')
        // popup1.addTo(map.current);

    }, [longitude, latitude])


    return (
        <Box
            sx={{
                width: {
                    xs: '100%',
                    lg: '65%'
                }
            }}
        >
            <Box ref={mapContainer} sx={{ height: "600px" }}></Box>
        </Box>
    )
}

export default MapComponent;
