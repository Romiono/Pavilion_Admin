import { useEffect, useState } from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ExpandLess, ExpandMore, PersonalVideo, Smartphone } from '@mui/icons-material'
import { NavLink, Outlet } from 'react-router-dom'
import classes from './VerticalNavigation.module.scss'
import { Collapse } from '@mui/material'
import { useAppDispatch } from '../../../../hooks/redux/useTypedRedux'
import { getAllHorizontalEntities } from '../../../../store/slices/horizontalEntitySlice'
import { getAllVerticalEntities } from '../../../../store/slices/verticalEntitySlice'
import clsx from 'clsx'

const drawerWidth = 320
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

const VerticalNavigation = () => {
  const [open, setOpen] = useState(false)
  const [openHorisontal, setOpenHorizontal] = useState(false)
  const [openVertical, setOpenVertical] = useState(false)
  const [selectedPage, setSelectedPage] = useState(0)
  // const allHorizontalEntities = useAppSelector((state) => state.horizontalEntity.allEntities)
  // const allVrticalEntities = useAppSelector((state) => state.verticalEntity.allEntities)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllHorizontalEntities())
    dispatch(getAllVerticalEntities())
  }, [])
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const mockHorizontals = [
    { id: 1, name: 'горизонтальная модель 1' },
    { id: 2, name: 'горизонтальная модель 2' }
  ]

  const mockVerticals = [
    { id: 3, name: 'вертикальная модель 1' },
    { id: 4, name: 'вертикальная модель 2' }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <List className={classes.navlist} style={{ padding: 0 }}>
          {!open ? (
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                onClick={handleDrawerOpen}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <MenuIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronLeftIcon />
                </ListItemIcon>

                <ListItemText primary="Свернуть" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}
          <Divider />
          <ListItemButton
            onClick={() => {
              if (open) {
                setOpenVertical(!openVertical)
              } else {
                setOpen(true)
                setOpenVertical(true)
              }
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <Smartphone />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              primary={'Вертикальный'}
              sx={{ opacity: open ? 1 : 0 }}
            />
            {open && (openVertical ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openVertical && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/*{allVrticalEntities.map((item) => (*/}
              {mockVerticals.map((item) => (
                <NavLink
                  to={`vertical/${item.id}`}
                  className={clsx(classes.navlist__link, {
                    [classes.current]: item.id === selectedPage
                  })}
                  key={item.id}
                  onClick={() => {
                    setSelectedPage(item.id)
                  }}
                >
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5
                      }}
                    >
                      <ListItemText
                        className={classes.text}
                        primary={item.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </Collapse>

          <ListItemButton
            onClick={() => {
              if (open) {
                setOpenHorizontal(!openHorisontal)
              } else {
                setOpen(true)
                setOpenHorizontal(true)
              }
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <PersonalVideo />
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              primary={'Горизонтальный'}
              sx={{ opacity: open ? 1 : 0 }}
            />
            {open && (openHorisontal ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openHorisontal && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/*{allVrticalEntities.map((item) => (*/}
              {mockHorizontals.map((item) => (
                <NavLink
                  to={`horizontal/${item.id}`}
                  className={clsx(classes.navlist__link, {
                    [classes.current]: item.id === selectedPage
                  })}
                  key={item.id}
                  onClick={() => {
                    setSelectedPage(item.id)
                  }}
                >
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5
                      }}
                    >
                      <ListItemText
                        className={classes.text}
                        primary={item.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default VerticalNavigation
