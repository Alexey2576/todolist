import {Navigate} from "react-router-dom";
import {SideBar} from "./SideBar/SideBar";
import React, {FC, useEffect} from 'react';
import {todoListsActions} from "../../Redux";
import {TodoLists} from "./TodoLists/TodoLists";
import {useAppSelector} from "../../Redux/store";
import {useActions} from "../../Utils/useActions";
import {selectIsLoggedIn} from "../../Redux/Auth/Selectors";
import {AddNewTodoList} from "./AddNewTodoList/AddNewTodoList";

export const AuthorizedApp: FC<AuthorizedAppType> = ({open, setOpen}) => {
   const isLoggedIn = useAppSelector(selectIsLoggedIn)
   const {getTodoLists} = useActions(todoListsActions)

   const handleDrawerCloseCallback = () => setOpen(false)

   useEffect(() => {
      getTodoLists()
   }, [])

   if (!isLoggedIn) {
      return <Navigate to={"/login"}/>
   }

   return (
      <>
         <SideBar
            open={open}
            handleDrawerCloseCallback={handleDrawerCloseCallback}
         />
         <AddNewTodoList/>
         <TodoLists />
      </>
   );
};

type AuthorizedAppType = {
   open: boolean
   setOpen: (open: boolean) => void
}