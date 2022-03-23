import React from 'react';
import clsx from 'clsx';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useAppDispatch, useAppSelector} from "../../Redux/store";
import {logoutTC} from "../../Redux/Auth/authThunks";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      appBar: {
         zIndex: theme.zIndex.drawer + 1,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
      },
      appBarShift: {
         marginLeft: drawerWidth,
         width: `calc(100% - ${drawerWidth}px)`,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      menuButton: {
         marginRight: 36,
      },
      title: {
         flexGrow: 1,
      },
      hide: {
         display: 'none',
      },
   }),
);

export type AppBarTodoListType = {
   open: boolean
   handleDrawerOpenCallback: () => void
}

export const AppBarTodoList: React.FC<AppBarTodoListType> = (
   {
      open,
      handleDrawerOpenCallback
   }
) => {
   const dispatch = useAppDispatch()
   const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
   const isFetching = useAppSelector<boolean>(state => state.app.isFetching)
   const classes = useStyles();

   const handleDrawerOpen = () => handleDrawerOpenCallback()
   const onLogoutHandle = () => dispatch(logoutTC());

   return (
      <AppBar position="sticky"
              className={clsx(classes.appBar, {
                 [classes.appBarShift]: open,
              })}>
         <Toolbar>
            <IconButton color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                           [classes.hide]: open,
                        })}>
               <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
               My TodoLists
            </Typography>
            {isLoggedIn && <Button color="inherit" onClick={onLogoutHandle}>Logout</Button>}
         </Toolbar>
         {isFetching && <LinearProgress/>}
      </AppBar>
   );
};