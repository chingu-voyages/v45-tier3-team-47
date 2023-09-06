import { Field, Formik, FormikHelpers,FieldProps} from 'formik';
import React from 'react';
import { TextField,
  Box,Button ,useMediaQuery, Select, MenuItem, FormControl, InputLabel, FormHelperText, } from '@mui/material';
  import { useNavigate } from 'react-router-dom';


import * as yup from "yup";

interface FormValues {
  title:string;
  category:string;
  description: string;
  price?:number;
  website?:string;
  city?:string;
  post_code?: string;
  province:string;
  country?:string;
  phoneNumber?:string;
  address:string;
  selectedOption:string;
  

};


const formData:FormValues = {
  title:"",
  category:"",
  description: "",
  price:0,
  website:"",
  city:"",
  post_code:"",
  province:"",
  country:"",
  phoneNumber:"",
  address:"",
  selectedOption:'',
  
};
const formSchema= yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  category:yup.string().required("required"),
  selectedOption:yup.string().required("required")
 
  
});



const PostForm:React.FC= () => {
 
 const isNonMobileScreens = useMediaQuery(("(min-width:600px"));
  const navigate=useNavigate();
 
  
 
  const handleFormSubmit = async (values: FormValues, onSubmitProps:
     FormikHelpers<FormValues>) => {
  
    try {

      console.log("Form submitted with values:", values);
      const saveResponseData = await fetch(`http://localhost:3000/pointOfInterest`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json", 
        },
      });
  
      if (!saveResponseData.ok) {
        // Handle non-successful response (e.g., server error)
        throw new Error(`Failed to save data: ${saveResponseData.status}`);
      }
  
      const savedUser = await saveResponseData.json();
      console.log("save", savedUser);
      onSubmitProps.resetForm();
      if (savedUser) {
        navigate('/');
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error here (e.g., show an error message to the user)
    }

  }
  return (

    
      <Formik onSubmit={handleFormSubmit}
    initialValues={formData}
    validationSchema={formSchema}>
    {({values,errors,touched,handleBlur,handleChange ,handleSubmit,setFieldValue})=>(
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
        value={values.title}
        name="title"
        error={Boolean(touched.title) && Boolean(errors.title)}
  
        helperText={(touched.title && (errors.title != null)) ? errors.title : ' '}
        sx={{
          gridColumn: "span 2",
          borderRadius:"5px",
          mt:"0.2rem"  
        }}
      />
       <TextField
        label="description"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
        name="description"
        error={Boolean(touched.description) && Boolean(errors.description)}
  
        helperText={(touched.description && (errors.description != null)) ? errors.description : ' '}
        sx={{
          gridColumn: "span 2",
          borderRadius:"5px",
          mt:"0.2rem"  
        }}
      />
        
        <Field name="selectedOption">
        {({ field }: FieldProps)=> (
          <FormControl
            sx={{
              gridColumn: "span 2",
              borderRadius: "5px"
            }}
            error={touched.selectedOption && Boolean(errors.selectedOption)}
          >
            <InputLabel>Choose an option</InputLabel>
            <Select
              {...field}
              value={values.selectedOption}
              onChange={(event) => setFieldValue('selectedOption', event.target.value)}
            >
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="option1">Entertainment</MenuItem>
              <MenuItem value="option2">Sport</MenuItem>
              <MenuItem value="option3">Music</MenuItem>
            </Select>
            {touched.selectedOption && errors.selectedOption && (
              <FormHelperText error>{errors.selectedOption}</FormHelperText>
            )}
          </FormControl>
        )}
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
  label="Province/state"
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
  value={values.post_code}
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

export default PostForm;