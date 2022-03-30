import clsx from 'clsx';
import React, {FC, memo} from 'react';
import {authActions} from "../../Redux";
import MenuIcon from "@material-ui/icons/Menu";
import {useAppSelector} from "../../Redux/store";
import {useActions} from "../../Utils/useActions";
import {selectIsFetching} from "../../Redux/App/Selectors";
import {selectIsLoggedIn} from "../../Redux/Auth/Selectors";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";

export const AppBarTodoList: FC<AppBarTodoListType> = memo(({open, handleDrawerOpenCallback}) => {
   const classes = useStyles()
   const {logout} = useActions(authActions)
   const isLoggedIn = useAppSelector(selectIsLoggedIn)
   const isFetching = useAppSelector(selectIsFetching)

   const onLogoutHandle = () => logout()
   const handleDrawerOpen = () => handleDrawerOpenCallback()

   return (
      <AppBar
         position="sticky"
         className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
         })}
      >
         <Toolbar>
            <IconButton
               color="inherit"
               aria-label="open drawer"
               onClick={handleDrawerOpen}
               edge="start"
               className={clsx(classes.menuButton, {
                  [classes.hide]: open,
               })}
            >
               <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
               My TodoLists
            </Typography>
            {
               isLoggedIn &&
               <Button color="inherit" onClick={onLogoutHandle}>
                 Logout
               </Button>
            }
         </Toolbar>
         {
            isFetching && <LinearProgress/>}
      </AppBar>
   )
})

export type AppBarTodoListType = {
   open: boolean
   handleDrawerOpenCallback: () => void
}

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
)