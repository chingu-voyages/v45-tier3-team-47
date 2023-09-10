import {
  TextField,
  Box,
  Button,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

import * as yup from 'yup';
import { Field, Formik, FormikHelpers, FieldProps } from 'formik';

interface FormValues {
  title: string;
  category: string;
  description: string;
  price?: number;
  website?: string;
  city?: string;
  post_code?: string;
  province: string;
  country?: string;
  phoneNumber?: string;
  address?: string;
  selectedOption: string;
  longitude?: number;
  latitude?: number;
  userId:string
}



const formData: FormValues = {
  title: '',
  category: '',
  description: '',
  price: 0,
  website: '',
  city: '',
  post_code: '',
  province: '', 
  country: '',
  phoneNumber: '',
  address: '',
  selectedOption: '',
  longitude: 0,
  latitude: 0,
  userId:""
};

const formSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  // category: yup.string().required('Category is required'),
  selectedOption: yup.string().required('Selected Option is required'),
});

const PostForm = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 600px)');
  const navigate = useNavigate();
 

  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      if (!response.ok) {
        throw new Error(`Failed to geocode address: ${response.status}`);
      }
      const data = await response.json();
      if (data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        return { longitude, latitude };
      } else {
        throw new Error('No results found for the address');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      throw error;
    }
  };
  
  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
    ) => {
      
      try {
        values.category = values.selectedOption;
        const userId = localStorage.getItem('userId');
        if (!userId || typeof userId !== 'string') {
          console.error('Invalid userId:', userId);
          return; 
        }
        
        values.userId = userId;
        
        if (values.address) {
          
          const geocodeResult = await geocodeAddress(values.address);
          values.longitude = geocodeResult.longitude;
          values.latitude = geocodeResult.latitude;
        }
        
      const saveResponseData = await fetch('http://localhost:3000/pointOfInterest', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!saveResponseData.ok) {
        // Handle non-successful response (e.g., server error)
        throw new Error(`Failed to save data: ${saveResponseData.status}`);
      }

      const savedUser = await saveResponseData.json();
      
      onSubmitProps.resetForm();
      if (savedUser) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={formData}
      validationSchema={formSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '&>div': {
                gridColumn: isNonMobileScreens ? undefined : 'span 4',
              },
            }}
          >
            <TextField
              label="Place Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={Boolean(touched.title) && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              sx={{
                gridColumn: 'span 2',
                borderRadius: '5px',
                mt: '0.2rem',
              }}
            />
            <TextField
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={Boolean(touched.description) && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              sx={{
                gridColumn: 'span 2',
                borderRadius: '5px',
                mt: '0.2rem',
              }}
            />
            <Field name="selectedOption">
              {({ field }: FieldProps) => (
                <FormControl
                  sx={{
                    gridColumn: 'span 2',
                    borderRadius: '5px',
                    p:'6px'
                    
                  }}
                  error={touched.selectedOption && Boolean(errors.selectedOption)}
                >
                  <InputLabel >Choose an option</InputLabel>
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
              sx={{
                gridColumn: 'span 2',
                borderRadius: '5px',
                p:'6px'
              }}
            />
         
            <TextField
              label="Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
              name="address"
              sx={{
                gridColumn: 'span 4',
                borderRadius: '5px',
              }}
            />
            <TextField
              label="City"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              name="city"
              sx={{
                gridColumn: 'span 2',
                borderColor: '#b3b3ff',
                borderRadius: '5px',
                mt: '0.2rem',
              }}
            />
            <TextField
              label="Province/state"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.province}
              name="province"
              sx={{
                gridColumn: 'span 2',
                borderColor: '#b3b3ff',
                borderRadius: '5px',
                mt: '0.2rem',
              }}
            />
            <TextField
              label="Country"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.country}
              name="country"
              sx={{
                gridColumn: 'span 2',
                borderColor: '#b3b3ff',
                borderRadius: '5px',
                mt: '0.2rem',
              }}
            />
            <TextField
              label="Postal Code"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.post_code}
              name="post_code"
              sx={{
                gridColumn: 'span 2',
                borderColor: '#b3b3ff',
                borderRadius: '5px',
                mt: '0.2rem',
              }}
            />
            <TextField
              label="Phone Number"
              type='tel'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phoneNumber}
              name="phoneNumber"
              sx={{
                gridColumn: 'span 2',
                borderColor: '#b3b3ff',
                borderRadius: '5px',
                mt: '0.2rem',
              }}
            />
               <TextField
              label="Website"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.website}
              name="website"
              sx={{
                gridColumn: 'span 2',
                borderRadius: '5px',
              }}
            />
            <Box
              sx={{
                gridColumn: 'span 4',
              }}
            >
              <Button
                type="submit"
                sx={{
                  width: '60%',
                  border: '2px solid',
                  alignItems: 'centers',
                  borderRadius: '30px',
                  borderColor: '#b3b3ff',
                  color: '#400080',
                  m: '0.5rem 0.5rem',
                  pd: '0.5rem',
                }}
              >
                Create A Post
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PostForm;
