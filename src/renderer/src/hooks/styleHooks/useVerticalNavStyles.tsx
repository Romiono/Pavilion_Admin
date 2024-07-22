import {createStyles, makeStyles} from "@mui/material";
import {Theme} from "@mui/material/styles";


const drawerWidth = 240

export default makeStyles((theme: Theme) =>
  createStyles({
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      },
      drawerOpen: {
        position: 'fixed',
        zIndex: 100001,
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        position: 'fixed',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 50,
        maxWidth: 50,
      }
    }
  )
)
