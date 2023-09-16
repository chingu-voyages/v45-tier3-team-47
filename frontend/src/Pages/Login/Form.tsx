import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import axiosInstance from "../../axiosConfig";
import.meta.env.VITE_APP_CLOUD_NAME;


interface FormValues {
  first_name?: string;
  last_name?: string;
  user_name?: string;
  occupation?: string;
  email: string;
  password: string;

  location?: string;
  profile_image?: File | null;
}

const intialValuesRegister: FormValues = {
  first_name: "",
  last_name: "",
  user_name: "",
  occupation: "",
  email: "",
  password: "",
  location: "",
  profile_image: null,
};
interface FormProps {
  onSuccessfulLogin: () => void;
}
const intialValuesLogin: FormValues = {
  email: "",
  password: "",
};
const registerSchema = yup.object().shape({
  user_name: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const Form: React.FC<FormProps> = ({ onSuccessfulLogin }) => {
  const [pageType, setPageType] = useState<string>("login");
  const [_, setUrl] = useState<string | null>(null);
  const isLogin: boolean = pageType === "login";
  const isRegister: boolean = pageType === "register";
  const isNonMobileScreens = useMediaQuery("(min-width:600px");
  const navigate = useNavigate();


  const handleLogin = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    try {
      const loginResponse = await axiosInstance.post(
        "http://localhost:3000/user/login",
        values
      );

      if (loginResponse.status === 200) {
        const userId = loginResponse.data.existingUser.id; 
        sessionStorage.setItem("userId", userId);
    
        onSubmitProps.resetForm();
       
        onSuccessfulLogin();
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleRegister = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    let imageUrl;
    try {
      const formData = new FormData();

      for (const key in values) {
        const value = values[key as keyof FormValues];

        if (key === "profile_image" && value instanceof File) {
          formData.append("file", value);
          formData.append(
            "upload_preset",
            `${import.meta.env.VITE_APP_CLOUD_NAME}`
          );
          formData.append(
            "cloud_name",
            `${import.meta.env.VITE_APP_CLOUD_NAME}`
          );

          const cloudinaryResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_APP_CLOUD_NAME
            }/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (cloudinaryResponse.ok) {
            const cloudinaryData = await cloudinaryResponse.json();
            imageUrl = cloudinaryData.secure_url;
            setUrl(imageUrl);
            formData.set("profile_image", imageUrl);
            
          } else {
            throw new Error("Failed to upload image to Cloudinary");
          }
        } else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, value.toString());
        }
      }

      const savedUserResponse = await fetch(`http://localhost:3000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          user_name: values.user_name,
          email: values.email,
          occupation: values.occupation,
          location: values.location,
          password: values.password,
          profile_image: imageUrl,
        }),
      });
      const savedUser = await savedUserResponse.json();

      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    if (isLogin) return await handleLogin(values, onSubmitProps);
    if (isRegister) return await handleRegister(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? intialValuesLogin : intialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "&>div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user_name}
                  name="user_name"
                  error={
                    Boolean(touched.user_name) && Boolean(errors.user_name)
                  }
                  helperText={
                    touched.user_name && errors.user_name != null
                      ? errors.user_name
                      : " "
                  }
                  sx={{
                    gridColumn: "span 4",
                    borderRadius: "5px",
                    mt: "0.2rem",
                  }}
                />

                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  name="first_name"
                  sx={{
                    gridColumn: "span 2",
                    // border:`1px solid #b3b3ff`,
                    borderRadius: "5px",
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  name="last_name"
                  sx={{
                    gridColumn: "span 2",
                    // border:`1px solid #b3b3ff`,
                    borderRadius: "5px",
                  }}
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  sx={{
                    gridColumn: "span 2",
                    // border:`1px solid #b3b3ff`,
                    borderRadius: "5px",
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  sx={{
                    gridColumn: "span 2",
                    // border:`1px solid #b3b3ff`,
                    borderRadius: "5px",
                  }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid #b3b3ff`}
                  borderRadius="5px"
                  mt="0.5rem "
                  padding="1rem"
                >
                  <Dropzone
                    //  acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("profile_image", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed #b3b3ff`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.profile_image ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box>
                            <Typography>
                              {" "}
                              {values.profile_image.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={
                touched.email && errors.email != null ? errors.email : " "
              }
              sx={{
                gridColumn: "span 2",
                borderColor: "#b3b3ff",
                borderRadius: "5px",
                mt: "0.2rem",
              }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={
                touched.password && errors.password != null
                  ? errors.password
                  : " "
              }
              sx={{
                gridColumn: "span 2",
                borderColor: "#b3b3ff",
                borderRadius: "5px",
                mt: "0.2rem",
              }}
            />

            <Box
              sx={{
                gridColumn: "span 4",
              }}
            >
              <Button
                type="submit"
                sx={{
                  width: "60%",
                  border: "2px solid",
                  alignItems: "centers",
                  borderRadius: "30px",
                  borderColor: "#b3b3ff",
                  color: "#400080",
                  m: "0.5rem 0.5rem",
                  pd: "0.5rem",
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>

              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: "#40008",
                  m: "1rem",

                  "&:hover": {
                    cursor: "pointer",
                    color: "#b3b3ff",
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
