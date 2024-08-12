import HorizontalNavigation from '../../components/ui/navigation/horizontalNavigation/HorizontalNavigation'
import { Outlet } from 'react-router-dom'

const Vertical = () => {
  const path = [
    { to: '0', label: 'Первый период', id: 0 },
    { to: '1', label: 'Второй период', id: 1 },
    { to: '2', label: 'Третий период', id: 2 },
    { to: '3', label: 'Четвертый период', id: 3 }
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
