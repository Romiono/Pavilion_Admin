import * as React from 'react';
import {styled, Theme, CSSObject} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {PersonalVideo, Smartphone} from "@mui/icons-material";
import {NavLink, Outlet} from "react-router-dom";
import classes from './VerticalNavigation.module.scss'
// @ts-ignore
// const styles = useVerticalNavStyles();
const drawerWidth = 320
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const VerticalNavigation = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <Drawer variant="permanent"
              open={open}
      >
        <List className={classes.navlist} style={{padding: 0}}>
          {!open ? <ListItem disablePadding sx={{display: 'block'}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleDrawerOpen}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MenuIcon/>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
            :
            <ListItem disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronLeftIcon/>
                </ListItemIcon>

                <ListItemText primary='Свернуть' sx={{opacity: open ? 1 : 0}}/>

              </ListItemButton>
            </ListItem>
          }
          <Divider/>
          <NavLink to='vertical' className={classes.navlist__link}>
            <ListItem disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Smartphone/>
                </ListItemIcon>

                <ListItemText classes={{primary: classes.text}}  primary='Вертикальный' sx={{opacity: open ? 1 : 0}}/>

              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to='horizontal' className={classes.navlist__link}>
            <ListItem disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PersonalVideo/>
                </ListItemIcon>

                <ListItemText className={classes.text} primary="Горизонтальный" sx={{opacity: open ? 1 : 0}}/>

              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, px: 3}}>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default VerticalNavigation
