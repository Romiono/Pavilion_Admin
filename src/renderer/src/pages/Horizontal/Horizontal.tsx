import classes from './Horizontal.module.scss'
import { Tab, Tabs } from '@mui/material'
import Box from '@mui/material/Box'
import PeriodHorizontal from './periods/PeriodHorizontal'

const Horizontal = () => {
  return (
    <div>
      <Box sx={{ width: '100%' }} className={classes.tabsWrapper}>
        <Tabs className={classes.tabsWrapper__tabs} role="navigation">
          <Tab className={classes.tabsWrapper__tabs__tab__child} label={'ГОРИЗОНТАЛЬНАЯ МОДЕЛЬ'} />
        </Tabs>
      </Box>
      <>
        <PeriodHorizontal />
      </>
    </div>
  )
}

export default Horizontal
