import HorizontalNavigation from '../../components/ui/navigation/horizontalNavigation/HorizontalNavigation'
import { Outlet } from 'react-router-dom'

const Vertical = () => {
  const path = [
    { to: 'first-period', label: 'Первый период', id: 0 },
    { to: 'second-period', label: 'Второй период', id: 1 },
    { to: 'third-period', label: 'Третий период', id: 2 },
    { to: 'fourth-period', label: 'Четвертый период', id: 3 }
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
