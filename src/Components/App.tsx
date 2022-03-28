import React, {useEffect, useState} from 'react';
import {AppBarTodoList} from "./AppBarTodoList/AppBarTodoList";
import {useAppSelector} from "../Redux/store";
import {CustomSnackbar} from "./Commons/Snackbar/CustomSnackbar";
import {Login} from "../Features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./Commons/NotFound/NotFound";
import {AuthorizedApp} from "./AuthorizedApp/AuthorizedApp";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "../Redux/App/appReducer";

export const App = () => {
   const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

   const [open, setOpen] = useState(false);
   const dispatch = useDispatch()
   const handleDrawerOpenCallback = () => setOpen(true)
   //========================================= USE EFFECT ==========================================================================================================================================================================
   useEffect(() => {
      dispatch(initializeAppTC())
   }, [])

   if (!isInitialized) {
      return <div
         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
         <CircularProgress/>
      </div>
   }

   return (
      <div>
         <AppBarTodoList open={open} handleDrawerOpenCallback={handleDrawerOpenCallback}/>
         <Container fixed>
            <Routes>
               <Route path={"/"} element={<AuthorizedApp open={open} setOpen={setOpen}/>}/>
               <Route path={"/login"} element={<Login/>}/>
               <Route path={"/404"} element={<NotFound/>}/>
               <Route path={"*"} element={<Navigate to={"/404"}/>}/>
            </Routes>
         </Container>
         <CustomSnackbar/>
      </div>
   );
};