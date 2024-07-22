import {Tab, Tabs} from "@mui/material";
import {NavLink} from "react-router-dom";
import Box from "@mui/material/Box";
import classes from './HorizontalNavigation.module.scss'

const HorizontalNavigation = () => {
  return (
    <Box sx={{width: '100%'}} className={classes.tabsWrapper}>
      <Tabs
        className={classes.tabsWrapper__tabs}
        role="navigation"
      >
        <NavLink className={classes.tabsWrapper__tabs__tab} to="first-period"><Tab label='первый период'/></NavLink>
        <NavLink className={classes.tabsWrapper__tabs__tab} to="second-period"><Tab label='второй период'/></NavLink>
        <NavLink className={classes.tabsWrapper__tabs__tab} to="third-period"><Tab label='третий период'/></NavLink>
        <NavLink className={classes.tabsWrapper__tabs__tab} to="fourth-period"><Tab label='четвертый период'/></NavLink>
      </Tabs>
    </Box>
  );
};

export default HorizontalNavigation;
