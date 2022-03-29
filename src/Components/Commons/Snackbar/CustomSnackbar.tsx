import * as React from 'react';
import Stack from '@mui/material/Stack';
import {appActions} from "../../../Redux";
import Snackbar from '@mui/material/Snackbar';
import {useAppSelector} from "../../../Redux/store";
import {useActions} from "../../../Utils/useActions";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {selectErrorMessage} from "../../../Redux/App/Selectors/selectErrorMessage";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref,
) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export const CustomSnackbar = () => {
   const errorMessage = useAppSelector(selectErrorMessage)
   const {setIsErrorGettingData} = useActions(appActions)

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway')
         return;
      setIsErrorGettingData({errorMessage: ""})
   }

   return (
      <Stack spacing={2} sx={{ width: '100%' }}>
         <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
               {errorMessage}
            </Alert>
         </Snackbar>
         {/*<Alert severity="error">This is an error message!</Alert>*/}
         {/*<Alert severity="warning">This is a warning message!</Alert>*/}
         {/*<Alert severity="info">This is an information message!</Alert>*/}
         {/*<Alert severity="success">This is a success message!</Alert>*/}
      </Stack>
   )
}