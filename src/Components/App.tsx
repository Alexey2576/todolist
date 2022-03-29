import {appActions} from "../Redux";
import {useAppSelector} from "../Redux/store";
import {Login} from "../Features/Login/Login";
import {useActions} from "../Utils/useActions";
import Container from "@mui/material/Container";
import React, {useEffect, useState} from 'react';
import NotFound from "./Commons/NotFound/NotFound";
import {Navigate, Route, Routes} from "react-router-dom";
import {selectIsInitialized} from "../Redux/App/Selectors";
import {AuthorizedApp} from "./AuthorizedApp/AuthorizedApp";
import {AppBarTodoList} from "./AppBarTodoList/AppBarTodoList";
import {CustomSnackbar} from "./Commons/Snackbar/CustomSnackbar";
import {CircularPreloader} from "./CircularPreloader/CircularPreloader";

export const App = () => {
   const {initializeApp} = useActions(appActions)
   const [open, setOpen] = useState(false);
   const isInitialized = useAppSelector(selectIsInitialized)

   const handleDrawerOpenCallback = () => setOpen(true)

   useEffect(() => {
      initializeApp()
   }, [])

   if (!isInitialized) {
      return <CircularPreloader/>
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