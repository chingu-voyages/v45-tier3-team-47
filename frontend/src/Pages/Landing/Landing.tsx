
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import CitySearchForm from "./Forms/CitySearchForm";
import FilterForm from "./Forms/FilterForm";

import MapContainer from "./MapContainer";
import PointOfInterestModal from "../POI/PointOfInterestModal";
import axiosInstance from "../../axiosConfig";

export interface IPointsOfInterest {
  id: number;
  title: string;
  category: string;
  description: string;
  longitude: number;
  latitude: number;
  price: string;
  city: string;
  website: string;
  post_code: string;
  province: string;
  country: string;
  phone_number: number;
  userId: number;
}

const Landing = () => {
  // We might be able to move the city/setCity declaration into the CitySearchForm once we no longer use the StateChecker component in FilterForm, as that is the only other component that requires the city state
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [longitude, setLongitude] = useState(-74.006);
  const [latitude, setLatitude] = useState(40.7128);
  const [pointsOfInterest, setPointsOfInterest] = useState<IPointsOfInterest[]>(
    []
  );
  const [renderedPointsOfInterest, setRenderedPointsOfInterest] = useState<
    IPointsOfInterest[]
  >([]);
  const getPointsOfInterestQuery =
    "https://sightseeshare-api.onrender.com/pointOfInterest/";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPointOfInterest, setSelectedPointOfInterest] =
    useState<IPointsOfInterest | null>(null);
  const [currentPostData, setCurrentPostData] = useState<any | null>(null);
  const [postId, setPostId] = useState<number | null>(null);

  const fetchPointsOfInterest = async (query: string) => {
    const response = await fetch(query);
    const data = await response.json();
    setPointsOfInterest(data);
    setRenderedPointsOfInterest(data);
  };

  const handleMarkerClick = async (poi: IPointsOfInterest) => {
    console.log("selected point of interest:", poi);
    setSelectedPointOfInterest(poi);
    setIsModalOpen(true);
    await handlePointOfInterestSelect(poi.id);
  };

  const handlePointOfInterestSelect = async (poiId: number) => {
    console.log("Fetching posts for POI with ID:", poiId);
    try {
      const response = await axiosInstance.get(`posts/byPoi/${poiId}`);
      const postsByPoi = response.data;

      if (postsByPoi && postsByPoi.length > 0) {
        setCurrentPostData(postsByPoi[0]);
        setPostId(postsByPoi[0].id);
      }
    } catch (error) {
      console.error("Error fetching posts by POI", error);
    }
  };

  useEffect(() => {
    fetchPointsOfInterest(getPointsOfInterestQuery);
  }, []);

  const userId = Number(sessionStorage.getItem("userId"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <CitySearchForm
        city={city}
        setCity={setCity}
        setSubmitted={setSubmitted}
        setLongitude={setLongitude}
        setLatitude={setLatitude}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <FilterForm
          submitted={submitted}
          pointsOfInterest={pointsOfInterest}
          setRenderedPointsOfInterest={setRenderedPointsOfInterest}
        />
        <MapContainer
          longitude={longitude}
          latitude={latitude}
          renderedPointsOfInterest={renderedPointsOfInterest}
          onMarkerClick={handleMarkerClick}
        />
      </Box>
      {selectedPointOfInterest && (
        <PointOfInterestModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pointOfInterest={selectedPointOfInterest}
          currentPostData={currentPostData}
          postId={postId}
          loggedInUserId={userId}
        />
      )}
    </Box>
  );
};

export default Landing;
