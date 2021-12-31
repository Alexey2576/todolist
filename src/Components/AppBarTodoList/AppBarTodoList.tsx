import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";

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
   const classes = useStyles();

   const handleDrawerOpen = () => handleDrawerOpenCallback()

   return (
      <AppBar position="fixed"
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
               News
            </Typography>
            <Button color="inherit">Login</Button>
         </Toolbar>
      </AppBar>
   );
}