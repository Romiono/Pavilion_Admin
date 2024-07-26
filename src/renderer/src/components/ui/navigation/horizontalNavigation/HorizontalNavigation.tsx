import { Tab, Tabs } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import classes from './HorizontalNavigation.module.scss'
import { useState } from 'react'
import clsx from 'clsx'

interface IPath {
  to: string
  label: string
  id: number
}

interface HorizontalNavigation {
  path: IPath[]
  title: string
}

const HorizontalNavigation = ({ path, title }: HorizontalNavigation) => {
  const [selectedPage, setSelectedPage] = useState<number>(0)

  const clickHandler = (id: number) => {
    if (id !== selectedPage) {
      setSelectedPage(id)
    }
  }

  return (
    <Box sx={{ width: '100%' }} className={classes.tabsWrapper}>
      <Tabs className={classes.tabsWrapper__tabs} role="navigation">
        {title && (
          <Tab
            style={{ borderRight: '1px solid #7d7d7d' }}
            className={classes.tabsWrapper__tabs__tab__child}
            label={title}
          />
        )}
        {path.map((item) => (
          <span key={item.id} onClick={() => clickHandler(item.id)}>
            <NavLink
              className={clsx(classes.tabsWrapper__tabs__tab, {
                [classes.current]: item.id === selectedPage
              })}
              to={item.to}
            >
              <Tab className={classes.tabsWrapper__tabs__tab__child} label={item.label} />
            </NavLink>
          </span>
        ))}
      </Tabs>
    </Box>
  )
}

export default HorizontalNavigation
