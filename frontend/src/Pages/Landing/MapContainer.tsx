import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Box } from "@mui/material";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
type MarkerWithId = mapboxgl.Marker & { id: string };
type PopupWithId = mapboxgl.Popup & { id: string };
import { IPointsOfInterest } from "./Landing";

type Props = {
  longitude: number;
  latitude: number;
  renderedPointsOfInterest: Array<IPointsOfInterest>;
  onMarkerClick: (poi: IPointsOfInterest) => void;
};

const MapComponent = ({
  longitude,
  latitude,
  renderedPointsOfInterest,
  onMarkerClick,
}: Props) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom, _] = useState(10);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: zoom,
    });

    const popup1 = new mapboxgl.Popup({ closeOnClick: false }) as PopupWithId;
    popup1.setLngLat([-79.0747, 43.0799]);
    popup1.setHTML("<h4>Niagara Falls</h4>");
    // popup1.addTo(map.current);

    for (const poi of renderedPointsOfInterest) {
      const marker = new mapboxgl.Marker() as MarkerWithId;
      marker.setLngLat([poi.longitude, poi.latitude]);
      marker.addTo(map.current);
      marker.getElement().addEventListener("click", () => {
        onMarkerClick(poi);
      });
    }
  }, [longitude, latitude, renderedPointsOfInterest, onMarkerClick]);

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          lg: "65%",
        },
      }}
    >
      <Box ref={mapContainer} sx={{ height: "600px" }}></Box>
    </Box>
  );
};

export default MapComponent;
