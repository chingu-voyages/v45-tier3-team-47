import { Formik, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { Grid,TextField,Typography,
  Box,Button } from '@mui/material';
// import Dropzone from 'react-dropzone';

import * as yup from "yup";
import { blue } from '@mui/material/colors';
// import Dropzone from "react-dropzone";
interface FormValues {
  firstName: string,
  lastName:string,
  userName:string,
  email:string,
  password:string,
  occupation:string,
  location:string,
  picture:string

};
const intialValuesRegister:FormValues = {
  firstName: "",
  lastName: "",
  userName:"",
  email: "",
  password: "",
  occupation: "",
  location: "",
  picture: "",
};
const intialValuesLogin:FormValues = {
  firstName: "",
  lastName: "",
  userName:"",
  email: "",
  password: "",
  occupation: "",
  location: "",
  picture: "",
};
const registerSchema= yup.object().shape({
  userName: yup.string().required("required"),
  email:yup.string().email().required("required"),
  password: yup.string().required("required"),
});
const loginSchema= yup.object().shape({
  email:yup.string().email().required("required"),
  password: yup.string().required("required"),
});

const Form:React.FC = () => {
  const [pageType,setPageType]=useState<string>("login");
  const isLogin:boolean = pageType === "login";
  const isRegister:boolean = pageType === "register";
  // const handleLogin= async(values,onSubmitProps)=>{
  //   console.log(values);
  // };
  // const handleRegister= async(values,onSubmitProps)=>{
  //   console.log(values);
  // }
  const handleFormSubmit=async()=>{
    // console.log(values,onSubmitProps)
    // if(isLogin) return await handleLogin(values,onSubmitProps);
    //   if(isRegister) return await handleRegister(values,onSubmitProps);
  }
  return (
  <Box width="100%">
  <Box sx={{ width:"100%",border:"2px solid", borderColor:"pink",m:"2rem",p:"2rem"}}>
    <Typography>SightSeeShare</Typography>
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={isLogin? intialValuesRegister:intialValuesLogin}
    validationSchema={isLogin ? registerSchema :loginSchema}
    >
  {({values,errors,touched,handleBlur,handleChange ,handleSubmit,setFieldValue,resetForm})=>(
     <form onSubmit={handleSubmit}>
      <Box display="grid" gap="30px"   gridTemplateColumns="repeat(4,minmax(0,1fr)" >
      
     
     {isRegister &&(
        <>
        
        <TextField
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        error={
          Boolean(touched.firstName)&& Boolean(errors.firstName)
        }
        helperText={
          <ErrorMessage name="firstName" />
        }
        />
         <TextField
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.picture}
        error={
          Boolean(touched.picture)&& Boolean(errors.picture)
        }
        helperText={
          <ErrorMessage name="picture" />
        }
        />
        <TextField
        label="User Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.userName}
        error={
          Boolean(touched.userName)&& Boolean(errors.userName)
        }
        helperText={
          <ErrorMessage name="userName" />
        }
        />
          <TextField
        label="Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.occupation}
        error={
          Boolean(touched.occupation)&& Boolean(errors.occupation)
        }
        helperText={
          <ErrorMessage name="occupation" />
        }
        />
        <TextField
        label="Location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location}
        error={
          Boolean(touched.location)&& Boolean(errors.location)
        }
        helperText={
          <ErrorMessage name="location" />
        }
        />
         <TextField
        label="picture"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location}
        error={
          Boolean(touched.location)&& Boolean(errors.location)
        }
        helperText={
          <ErrorMessage name="location" />
        }
        />

       
        </>
      )
     }
     <TextField
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        error={
          Boolean(touched.email)&& Boolean(errors.email)
        }
        helperText={
          <ErrorMessage name="email" />
        }
        />
        <TextField
        label="Password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        error={
          Boolean(touched.password)&& Boolean(errors.password)
        }
        helperText={
          <ErrorMessage name="password" />
        }
        />
     
        <Button type='submit'
        sx={{
          width:"70%",
          border:"2px solid",
          borderColor:"black",
          color:"black",
          m:"1rem 3rem",
          pd:"1rem"
        }}>
             {
          isLogin?"LOGIN":"REGISTER"
        }
        </Button>
        <Typography onClick={
          ()=>{
            setPageType(isLogin?"register":"login");
            resetForm();
          }
        }
        sx={{
          textDecoration:"underline",
          color:"blue"
        }}
        />
        {
          isLogin?"Don't have an account? Sign Up here.":"Already have an account? Login here."
        }


    </Box>
     </form>

  )}  
  </Formik>
  </Box>
  </Box>
  );
  
};

export default Form;