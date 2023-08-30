import { Formik, FormikHelpers,Field,useFormikContext} from 'formik';
import React, { useState } from 'react';
import { TextField,Select, MenuItem ,FormControl,
  Box,Button ,useMediaQuery, InputLabel} from '@mui/material';


import * as yup from "yup";
interface FormValues {
  placeName:string;
  description: string;
  category:string;
  price:number;
  website?:string;
  address:string;
  city:string;
  province?:string;
  country:string;
  postalCode?:string;
  phoneNumber?:string;
  selectedOption?:string;

};


const formData:FormValues = {
  placeName:"",
  description: "",
  category:"",
  price:0,
  website:"",
  address:"",
  city:"",
  province:"",
  country:"",
  postalCode:"",
  phoneNumber:"",
  
};
const formSchema= yup.object().shape({
  placeName: yup.string().required("required"),
  description: yup.string().required("required"),
  category:yup.string().required("required"),
  address:yup.string().required("required"),
  
});



const Form:React.FC= () => {
  const [pageType,setPageType]=useState<string>("register");
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
  
 
  const handleFormSubmit=async(values: FormValues, onSubmitProps: FormikHelpers<FormValues>)=>{
    console.log("values",JSON.stringify(values, null, 2),onSubmitProps)
    //  if(isLogin) return await handleLogin(values,onSubmitProps);

  }
  return (

    
      <Formik onSubmit={handleFormSubmit}
    initialValues={formData}
    validationSchema={formSchema}>
    {({values,errors,touched,handleBlur,handleChange ,handleSubmit,setFieldValue,resetForm})=>(
     <form onSubmit={handleSubmit}>
      <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{"&>div": {
      gridColumn: isNonMobileScreens? undefined : "span 4"}
    }
    }
    >
      <TextField
        label="Place Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.placeName}
        name="placeName"
        error={Boolean(touched.placeName) && Boolean(errors.placeName)}
  
        helperText={(touched.placeName && (errors.placeName != null)) ? errors.placeName : ' '}
        sx={{
          gridColumn: "span 2",
          borderRadius:"5px",
          mt:"0.2rem"  
        }}
      />
        
        {/* <TextField
        label="Category"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.category}
        name="category"
        error={Boolean(touched.category) && Boolean(errors.category)}
  
        helperText={(touched.category && (errors.category != null)) ? errors.category : ' '}
        sx={{
          gridColumn: "span 2",
          borderRadius:"5px",
          
        }}
       
       
        /> */}
        {/* <Field name="selectedOption" sx={{
          gridColumn: "span 2",
          borderRadius:"5px",
          
        }}>
          {({ field }) => (
            <Select {...field}>
              <MenuItem value="option1">Entartiament </MenuItem>
              <MenuItem value="option2">Sport</MenuItem>
              <MenuItem value="option3">Music</MenuItem>
            </Select>
          )}
        </Field> */}
        {/* <FormControl  sx={{
          gridColumn: "span 2",
          borderRadius:"5px",
          
        }}>
          <InputLabel >Choose an option</InputLabel>
          <Field name="selectedOption" >
            {({ field }) => (
              <Select {...field} >
                <MenuItem value="option1">Entertainment</MenuItem>
      <MenuItem value="option2">Sport</MenuItem>
      <MenuItem value="option3">Music</MenuItem>
              </Select>
            )}
       */}
       
        <Field name="selectedOption">
  {() => {
    const { values, setFieldValue } = useFormikContext<FormValues>();
    
    return (
      <FormControl sx={{ gridColumn: "span 2",
      borderRadius:"5px"}}>
        <InputLabel>Choose an option</InputLabel>
        <Select
          value={values.selectedOption }
          onChange={(event) => setFieldValue('selectedOption', event.target.value)}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="option1">Entertainment</MenuItem>
          <MenuItem value="option2">Sport</MenuItem>
          <MenuItem value="option3">Music</MenuItem>
        </Select>
      </FormControl>
    );
  }}
</Field>


  
        <TextField
        label="Price"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.price}
        name="price"
        error={Boolean(touched.price) && Boolean(errors.price)}
  
        helperText={(touched.price && (errors.price != null)) ? errors.price : ' '}
        sx={{
          gridColumn: "span 2",
          borderRadius:"5px"
        }}
        /> 





          <TextField
        label="Website"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.website}
        name="website"
       
        sx={{
          gridColumn: "span 2",
          borderRadius:"5px"
        }}
        />
        <TextField
        label="Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.address}  
        name="address" 
        error={Boolean(touched.address) && Boolean(errors.address)}
  
        helperText={(touched.address && (errors.address != null)) ? errors.address : ' '}  
        sx={{
          gridColumn: "span 2",
          borderRadius:"5px"
        }}
        />
      
       
     <TextField
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name="city"
        sx={{
          gridColumn:"span 2",
          borderColor:"#b3b3ff",
          borderRadius: "5px",
          mt:"0.2rem"
    
        }}
       />
       <TextField
  label="Province"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.province}
  name="province"
  sx={{
    gridColumn: "span 2",
    borderColor:  "#b3b3ff", 
    borderRadius: "5px",
    mt:"0.2rem"
  }}
/>
        <TextField
  label="Country"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.country}
  name="country"
  sx={{
    gridColumn: "span 2",
    borderColor:  "#b3b3ff", 
    borderRadius: "5px",
    mt:"0.2rem"
  }}
/>
<TextField
  label="Postal Code"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.postalCode}
  name="postal code"
  sx={{
    gridColumn: "span 2",
    borderColor:  "#b3b3ff", 
    borderRadius: "5px",
    mt:"0.2rem"
  }}
/>
        <TextField
  label="Phone Number"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.phoneNumber}
  name="phoneNumber"
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
        " Create A Post"
        }
        </Button>
        
       

</Box>
    </Box>
     </form>

  )}  
      </Formik>
  
  );
  
};

export default Form;