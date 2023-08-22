import { Formik } from 'formik';
import React, {useState}from 'react';
import { Grid,TextField,Button } from '@mui/material';

import * as yup from "yup";
// import Dropzone from "react-dropzone";
interface FormValues {
  firstName: string,
  lastName:string,
  email:string,
  password:string,
  occupation:string,
  location:string,
  picture:string

};
const intialValuesRegister:FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  occupation: "",
  location: "",
  picture: "",
};
const registerSchema= yup.object().shape({
  firstName:yup.string().required("required"),
  lastName: yup.string().required("required"),
  email:yup.string().email().required("required"),
  password: yup.string().required("required"),
  occupation: yup.string().required("required"),
  location:yup.string().required("required"),
  picture: yup.string().required("required"),
});

const Form:React.FC = () => {
  return (
    <>
    <div>Form</div>
  
    <Formik
    initialValues={intialValuesRegister}
    validationSchema={registerSchema}
    onSubmit={(value)=>{
      //code
    }}
    >
     {/*components go here */}
    </Formik>
    <Button>Hello</Button>
    
    </>
  );
}

export default Form;