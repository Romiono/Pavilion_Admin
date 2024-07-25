import { Tab, Tabs } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import classes from './HorizontalNavigation.module.scss'
import { useState } from 'react'
import clsx from 'clsx'

const HorizontalNavigation = () => {
  const [selectedPage, setSelectedPage] = useState<number>(9999)

  const path = [
    { to: 'first-period', label: 'Первый период', id: 0 },
    { to: 'second-period', label: 'Второй период', id: 1 },
    { to: 'third-period', label: 'Третий период', id: 2 },
    { to: 'fourth-period', label: 'Четвертый период', id: 3 }
  ]

  const clickHandler = (id: number) => {
    if (id !== selectedPage) {
      setSelectedPage(id)
    }
  }

  return (
    <Box sx={{ width: '100%' }} className={classes.tabsWrapper}>
      <Tabs className={classes.tabsWrapper__tabs} role="navigation">
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
