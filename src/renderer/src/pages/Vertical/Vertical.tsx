import HorizontalNavigation from '../../components/ui/navigation/horizontalNavigation/HorizontalNavigation'
import { Outlet } from 'react-router-dom'

const Vertical = () => {
  const path = [
    { to: '1', label: 'Первый период', id: 1 },
    { to: '2', label: 'Второй период', id: 2 },
    { to: '3', label: 'Третий период', id: 3 },
    { to: '4', label: 'Четвертый период', id: 4 }
  ]

  return (
    <div>
      <HorizontalNavigation path={path} title="Вертикальная модель" />
      <>
        <Outlet />
      </>
    </div>
  )
}

export default Vertical
