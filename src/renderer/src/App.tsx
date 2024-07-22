import VerticalNavigation from "./components/ui/navigation/verticalNavigation/VerticalNavigation";
import classes from './styles/App.module.scss'
const App = () =>  {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className={classes.container}>
      <VerticalNavigation/>
    </div>
  )
}

export default App
