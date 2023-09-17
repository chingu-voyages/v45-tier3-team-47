import {
  Drawer,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

interface Post {
  id: number;
  rating: number;
  comment: string;
  userId: number;
}

interface PointOfInterestModalProps {
  open: boolean;
  onClose: () => void;
  pointOfInterest: {
    id: number;
    title: string;
    description: string;
  };
  currentPostData?: {};
  postId?: number | null;
  loggedInUserId?: number | null;
}

const PointOfInterestModal: React.FC<PointOfInterestModalProps> = ({
  open,
  onClose,
  pointOfInterest,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [postsData, setPostsData] = useState<
    Array<{
      id: number;
      rating: number;
      comment: string;
      userId: number;
    }>
  >([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editRating, setEditRating] = useState<number>(0);
  const [editComment, setEditComment] = useState<string>("");

  const userId = sessionStorage.getItem("userId");

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `/posts/byPoi/${pointOfInterest.id}`
      );
      if (response.status === 200) {
        setPostsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts for POI:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [pointOfInterest, axiosInstance]);

  const handleEditClick = (post: Post) => {
    setEditRating(post.rating);
    setEditComment(post.comment);
    setIsEditing(true);
    setSelectedPost(post);
  };
  const handleUpdatePostClick = async () => {
    if (!selectedPost) return;

    try {
      const ratingValue =
        typeof editRating === "number" ? parseFloat(editRating.toFixed(1)) : 0;
      const postData = {
        rating: ratingValue,
        comment: editComment,
        userId,
        pointOfInterestId: pointOfInterest.id,
      };

      const response = await axiosInstance.patch(
        `/posts/${selectedPost.id}`,
        postData
      );

      if (response.status === 200) {
        const updatedPosts = postsData.map((post) =>
          post.id === selectedPost.id
            ? { ...post, rating: editRating, comment: editComment }
            : post
        );
        setPostsData(updatedPosts);
        setEditRating(0);
        setEditComment("");
        setIsEditing(false);
        setSelectedPost(null);
        setSnackbar({
          open: true,
          message: "Post updated successfully.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Error updating post.",
          severity: "error",
        });
      }
    } catch (error: any) {
      console.error("Error updating post:", error);
      setSnackbar({
        open: true,
        message: "Error updating post.",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = async (postId: number) => {
    try {
      const response = await axiosInstance.delete(`/posts/${postId}`);

      if (response.status === 200) {
        const updatedPosts = postsData.filter((post) => post.id !== postId);
        setPostsData(updatedPosts);
        setIsEditing(false);
        setSnackbar({
          open: true,
          message: "Post deleted successfully.",
          severity: "success",
        });
        setTimeout(() => {
          fetchPosts();
        }, 1000);
      } else {
        console.error("Unexpected server response:", response);
        setSnackbar({
          open: true,
          message: "Error deleting post.",
          severity: "error",
        });
      }
    } catch (error: any) {
      console.error("Error deleting post:", error);
      if (error && typeof error === "object" && "response" in error) {
        console.error("Error response data:", error.response.data);
      }
      setSnackbar({
        open: true,
        message: "Error deleting post.",
        severity: "error",
      });
    }
  };

  const handleCreatePostClick = async () => {
    try {
      const postData = {
        rating: parseFloat(rating.toFixed(1)),
        comment,
        userId,
        pointOfInterestId: pointOfInterest.id,
      };

      const response = await axiosInstance.post("/posts", postData);

      if (response.status === 201) {
        setRating(0);
        setComment("");
        const newPost = response.data;
        setPostsData((prevPosts) => [...prevPosts, newPost]);
        setSnackbar({
          open: true,
          message: "Post added successfully.",
          severity: "success",
        });
        setTimeout(() => {
          fetchPosts();
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: "Error creating post.",
          severity: "error",
        });
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      if (error && typeof error === "object" && "response" in error) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const userIdFromSession = Number(sessionStorage.getItem("userId"));

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper
        style={{
          width: "450px",
          padding: "20px",
          overflow: "auto",
          height: "100%",
        }}
      >
        <Box mb={3}>
          <Typography variant="h5" gutterBottom>
            {pointOfInterest.title}
          </Typography>
          <Typography variant="body1">{pointOfInterest.description}</Typography>
        </Box>

        <Divider variant="middle" />

        <Box my={3}>
          {postsData &&
            postsData.map((post) => (
              <Box
                key={post.id}
                bgcolor="grey.100"
                p={2}
                borderRadius={2}
                mb={3}
              >
                <Typography variant="h6" gutterBottom>
                  Rating: {post.rating}
                </Typography>
                <Typography variant="body1">{post.comment}</Typography>
                {post.userId === userIdFromSession && (
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      onClick={() => handleEditClick(post)}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(post.id)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </Box>
                )}

                {isEditing && selectedPost && selectedPost.id === post.id && (
                  <Box bgcolor="grey.200" p={2} borderRadius={2} mt={3}>
                    <Typography variant="h6" gutterBottom>
                      Update Post
                    </Typography>
                    <TextField
                      label="Rating"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={editRating}
                      onChange={(e) =>
                        setEditRating(parseFloat(e.target.value))
                      }
                      placeholder="Enter a rating between 1-5"
                    />
                    <Box mt={2}>
                      <TextField
                        label="Comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        placeholder="Share your thoughts here..."
                      />
                    </Box>
                    <Box mt={2} display="flex" justifyContent="space-between">
                      <Button
                        onClick={handleUpdatePostClick}
                        variant="contained"
                        color="primary"
                      >
                        Update Post
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedPost(null);
                        }}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
        </Box>

        <Box bgcolor="grey.100" p={2} borderRadius={2}>
          <Typography variant="h6" gutterBottom>
            Create a New Post
          </Typography>
          <TextField
            label="Rating"
            variant="outlined"
            fullWidth
            type="number"
            value={rating}
            onChange={(e) => {
              const newRating = parseFloat(e.target.value);
              setEditRating(!isNaN(newRating) ? newRating : 0);
            }}
            placeholder="Enter a rating between 1-5"
          />
          <Box mt={2}>
            <TextField
              label="Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts here..."
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              onClick={handleCreatePostClick}
              variant="contained"
              color="primary"
            >
              Add Post
            </Button>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>

        <Divider variant="middle" />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default PointOfInterestModal;
