
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { IPointsOfInterest } from "../../types/types";
import axiosInstance from "../../axiosConfig";
//Component imports
import CitySearchForm from "./Forms/CitySearchForm";
import FilterForm from "./Forms/FilterForm";
import MapContainer from "./MapContainer";
import PointOfInterestModal from "../POI/PointOfInterestModal";

const Landing = () => {

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
    setSelectedPointOfInterest(poi);
    setIsModalOpen(true);
    await handlePointOfInterestSelect(poi.id);
  };

  const handlePointOfInterestSelect = async (poiId: number) => {
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
