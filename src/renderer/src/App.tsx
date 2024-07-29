import VerticalNavigation from './components/ui/navigation/verticalNavigation/VerticalNavigation'
import classes from './styles/App.module.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className={classes.container}>
      <VerticalNavigation />
      <ToastContainer />
    </div>
  )
}

export default App
