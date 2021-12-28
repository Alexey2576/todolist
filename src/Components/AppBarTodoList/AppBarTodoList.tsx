import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export const AppBarTodoList = () => {
   return (
      <AppBar position="static">
         <Toolbar>
            <IconButton edge="start"
                        color="inherit"
                        aria-label="menu">
               <MenuIcon/>
            </IconButton>
            <Typography variant="h6">
               TodoLists
            </Typography>
            <Button color="inherit">Login</Button>
         </Toolbar>
      </AppBar>
   );
};