import React from 'react';
import s from "./CircularPreloader.module.css"
import CircularProgress from "@mui/material/CircularProgress";

export const CircularPreloader = () => {
   return (
      <div className={s.circularPreloader}
         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
         <CircularProgress/>
      </div>
   );
};