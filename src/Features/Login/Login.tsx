import React from 'react'
import Grid from '@mui/material/Grid';
import {authActions} from "../../Redux";
import {Navigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import {FormikHelpers, useFormik} from "formik";
import {LoginDataType} from "../../API/auth-api";
import {useActions} from "../../Utils/useActions";
import FormControl from '@mui/material/FormControl';
import {selectIsLoggedIn} from "../../Redux/Auth/Selectors";
import FormControlLabel from '@mui/material/FormControlLabel';
import {useAppDispatch, useAppSelector} from "../../Redux/store";

export const Login = () => {
   const dispatch: any = useAppDispatch()
   const {login} = useActions(authActions)
   const isLoggedIn = useAppSelector(selectIsLoggedIn)

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      validate: (values) => {
         const errors: FormikErrorType = {};
         if (!values.email) {
            errors.email = 'Required';
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
         }

         if (!values.password) {
            errors.password = 'Required';
         } else if (values.password.length < 2) {
            errors.password = 'Password must be 3 characters or more';
         }
         return errors;
      },
      onSubmit: async (loggedData: LoginDataType, formikHelpers: FormikHelpers<LoginDataType>) => {
         const action = await dispatch(login(loggedData))
         if (login.rejected.type.match(action)) {
            if (action.payload.fieldsError.length) {
               const error = action.payload.fieldsError[0]
               formikHelpers.setFieldError(error.fieldError, error.errorMessage)
            }
         }
      },
   });

   if (isLoggedIn) {
      return <Navigate to={"/"}/>
   }

   return <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'} alignItems={'center'} marginTop={'60px'}>
         <form onSubmit={formik.handleSubmit}>
            <FormControl>
               <FormLabel>
                  <p>To log in get registered
                     <a href={'https://social-network.samuraijs.com/'}
                        target='_blank'> here
                     </a>
                  </p>
                  <p>or use common test account credentials:</p>
                  <p>Email: alexeynikinitin@yandex.by</p>
                  <p>Password: M7L85fu96huisXG</p>
               </FormLabel>
               <FormGroup>
                  <TextField
                     label="Email"
                     margin="normal"
                     type="email"
                     {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
                  <TextField
                     type="password"
                     label="Password"
                     margin="normal"
                     {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}
                  <FormControlLabel
                     label={'Remember me'}
                     control={
                        <Checkbox
                           {...formik.getFieldProps('rememberMe')}
                        />
                     }
                  />
                  <Button
                     type={'submit'}
                     variant={'contained'}
                     color={'primary'}
                  >
                     Login
                  </Button>
               </FormGroup>
            </FormControl>
         </form>
      </Grid>
   </Grid>
}

type FormikErrorType = {
   email?: string
   password?: string
   rememberMe?: boolean
}


