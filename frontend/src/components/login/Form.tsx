import { Formik, ErrorMessage, 
  // useField 
 } from 'formik';
import React, { useState } from 'react';
import { TextField,Typography,
  Box,Button ,useMediaQuery} from '@mui/material';
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from 'react-dropzone';

import * as yup from "yup";

// import Dropzone from "react-dropzone";
interface FormValues {
  userName?:string,
  firstName?: string,
  lastName?:string,
  occupation?:string,
  location?:string,
  picture?:string,
  email:string,
  password:string

};

const intialValuesRegister:FormValues = {
  userName:"",
  firstName: "",
  lastName: "",
  occupation: "",
  location: "",
  picture: "",
  email: "",
  password: "",
  
};
const intialValuesLogin:FormValues = {
  email: "",
  password: ""
  
};
const registerSchema= yup.object().shape({
  userName: yup.string().required("required"),
  email:yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});
const loginSchema= yup.object().shape({
  email:yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});
// interface FileInputProps extends DropzoneProps {
  // name: string;
// }

const Form:React.FC= () => {
  const [pageType,setPageType]=useState<string>("register");
  const isLogin:boolean = pageType === "login";
  const isRegister:boolean = pageType === "register";
  // const [field, meta, helpers] = useField();
 const isNonMobileScreens = useMediaQuery(("(min-width:600px"));
  // const onDrop = (acceptedFiles: File[]) => {
  //   if (acceptedFiles && acceptedFiles[0]) {
  //     // helpers.setValue(acceptedFiles[0]);
  //   }
  // };
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

    
      <Formik onSubmit={handleFormSubmit}
    initialValues={isLogin? intialValuesLogin:intialValuesRegister}
    validationSchema={isLogin ? loginSchema: registerSchema}>
    {({values,errors,touched,handleBlur,handleChange ,handleSubmit,setFieldValue,resetForm})=>(
     <form onSubmit={handleSubmit}>
      <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{"&>div": {
      gridColumn: isNonMobileScreens? undefined : "span 4"}
    }}>

  
    {isRegister && (
    <>
      <TextField
        label="User Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.userName}
        name="userName"
        error={Boolean(touched.userName) && Boolean(errors.userName)}
        helperText={touched.userName && errors.userName}
        sx={{
          gridColumn: "span 4",
          borderColor:"#b3b3ff"
          //  border:`0.123px solid #b3b3ff`,
          // borderRadius:"0.2px"
        }}
      />
        
        <TextField
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name="firstName"
        sx={{
          gridColumn: "span 2",
          border:`1px solid #b3b3ff`,
          borderRadius:"5px"
        }}
        />
        <TextField
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name="lastName"
        sx={{
          gridColumn: "span 2",
          border:`1px solid #b3b3ff`,
          borderRadius:"5px"
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
          border:`1px solid #b3b3ff`,
          borderRadius:"5px"
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
          border:`1px solid #b3b3ff`,
          borderRadius:"5px"
        }}
        />
         
         <Box
       gridColumn="span 4"
       border={`1px solid #b3b3ff`}
       borderRadius="5px"
       padding="1rem">
        <Dropzone  
        //  acceptedFiles=".jpg,.jpeg,.png"
         multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                    
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box     {...getRootProps()}   border={`2px dashed #b3b3ff`} p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}>
                      <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box>
                            <Typography>{values.picture}</Typography>
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
        helperText={touched.email && errors.email}
        sx={{
          gridColumn:"span 2",
          borderColor:"#b3b3ff",
          borderRadius: "5px",
    
        }}
    
       />
   
  
        
        
        <TextField
  label="Password"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.password}
  name="password"
  error={Boolean(touched.password) && Boolean(errors.password)}
  helperText={touched.password && errors.password}
  sx={{
    gridColumn: "span 2",
    borderColor:  "#b3b3ff", 
    borderRadius: "5px",
  }}
/>
  
   <Box sx={{
    gridColumn:"span 4",
    
   }}
   >
        <Button type='submit'
        
        sx={{
        
          width:"60%",
          border:"2px solid",
          alignItems:"centers",
          borderRadius:"30px",
          borderColor:"#b3b3ff",
          color:"#400080",
          m:"1rem 1rem",
          pd:"0.5rem"
        }}>
             {
          isLogin ?"LOGIN" :"REGISTER"
        }
        </Button>
        
        <Typography onClick={
          ()=>{
            setPageType(isLogin ? "register" : "login");
            resetForm();
          }
        }
        sx={{
          textDecoration:"underline",
          color:"#40008",

          "&:hover": {
            cursor: "pointer",
            color: "#b3b3ff",
          },
        }}
        >
        {
          isLogin? "Don't have an account? Sign Up here.": "Already have an account? Login here."
        }
        </Typography>

</Box>
    </Box>
     </form>

  )}  
      </Formik>
  
  );
  
};

export default Form;