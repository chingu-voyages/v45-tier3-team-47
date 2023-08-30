import { Formik, FormikHelpers} from 'formik';
import React, { useState } from 'react';
import { TextField,Typography,
  Box,Button ,useMediaQuery} from '@mui/material';
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from 'react-dropzone';
import * as yup from "yup";
interface FormValues {
  userName?:string;
  firstName?: string;
  lastName?:string;
  occupation?:string;
  location?:string;
  picture?:File | null;
  email:string;
  password:string

};

const intialValuesRegister:FormValues = {
  userName:"",
  firstName: "",
  lastName: "",
  occupation: "",
  location: "",
  picture: null,
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


const Form:React.FC= () => {
  const [pageType,setPageType]=useState<string>("register");
  const isLogin:boolean = pageType === "login";
  const isRegister:boolean = pageType === "register";
 const isNonMobileScreens = useMediaQuery(("(min-width:600px"));
  
  const handleLogin= async(values: FormValues,      onSubmitProps: FormikHelpers<FormValues>)=>{
    try{
  //   const loggedInResponse = await fetch(`${URL}/login`,{
  //     method:"POST",
  //     headers:{
  //       "Content-Type":"application/json"
        
  //     },
  //     body:JSON.stringify(values)
  //   });
  //  const loggedIn = await loggedInResponse.json();
  console.log(values);
    onSubmitProps.resetForm();
    // if(loggedIn){
    //  //
    // }
    }catch(error){
      console.error("Error submitting form:", error)
    }
  };
  
  const handleRegister = async (values: FormValues,      onSubmitProps: FormikHelpers<FormValues>) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        const value = values[key as keyof FormValues];
        
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value, value.name);
        } else if (typeof value === 'string' || typeof value === 'number') {
          formData.append(key, value.toString());
        }
      }
    //   const savedUserResponse = await fetch(`${URL}/register`,{
    //     method:"POST",
    //     body:formData
    //   });
    //  const savedUser = await savedUserResponse.json();
       onSubmitProps.resetForm();
    //   if(savedUser){
    //     setPageType("login");
    //   }
  
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleFormSubmit=async(values: FormValues, onSubmitProps: FormikHelpers<FormValues>)=>{
    console.log("values",JSON.stringify(values, null, 2),onSubmitProps)
     if(isLogin) return await handleLogin(values,onSubmitProps);
    if(isRegister) return await handleRegister(values,onSubmitProps);
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
    }
    }
    >

  
    {isRegister && (
    <>

      <TextField
        label="User Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.userName}
        name="userName"
        error={Boolean(touched.userName) && Boolean(errors.userName)}
        // helperText={touched.userName && errors.userName ? ' ' : ''}
        helperText={(touched.userName && (errors.userName != null)) ? errors.userName : ' '}
        sx={{
          gridColumn: "span 4",
          borderRadius:"5px",
          mt:"0.2rem"

          
        
          
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
          // border:`1px solid #b3b3ff`,
          borderRadius:"5px",
          
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
          // border:`1px solid #b3b3ff`,
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
          // border:`1px solid #b3b3ff`,
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
          // border:`1px solid #b3b3ff`,
          borderRadius:"5px"
        }}
        />
         
         <Box
       gridColumn="span 4"
       border={`1px solid #b3b3ff`}
       borderRadius="5px"
       mt="0.5rem "
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
                            <Typography> { values.picture.name}</Typography>
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
        // helperText={touched.email && errors.email}
        helperText={(touched.email && (errors.email != null)) ? errors.email : ' '}
        sx={{
          gridColumn:"span 2",
          borderColor:"#b3b3ff",
          borderRadius: "5px",
          mt:"0.2rem"
    
        }}
    
       />
        <TextField
  label="Password"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.password}
  name="password"
  error={Boolean(touched.password) && Boolean(errors.password)}
  helperText={(touched.password && (errors.password != null)) ? errors.password : ' '}
  sx={{
    gridColumn: "span 2",
    borderColor:  "#b3b3ff", 
    borderRadius: "5px",
    mt:"0.2rem"
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
          m:"0.5rem 0.5rem",
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
          m:"1rem",

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