import React, {useEffect, useState} from 'react';
import {AppBarTodoList} from "./AppBarTodoList/AppBarTodoList";
import {Container} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../Redux/store";
import {getTodoListsTC} from "../Redux/TodoLists/todoListsThunks";
import {CustomSnackbar} from "./Commons/Snackbar/CustomSnackbar";
import {Login} from "../Features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./Commons/NotFound/NotFound";
import {AuthorizedApp} from "./AuthorizedApp/AuthorizedApp";

export const App = () => {
   const [open, setOpen] = useState(false);
   const dispatch = useAppDispatch()
   const handleDrawerOpenCallback = () => setOpen(true)
   //========================================= USE EFFECT ==========================================================================================================================================================================
   useEffect(() => {
      dispatch(getTodoListsTC())
   }, [dispatch])

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