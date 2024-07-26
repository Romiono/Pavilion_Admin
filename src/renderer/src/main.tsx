import './styles/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Horizontal from './pages/Horizontal/Horizontal'
import Vertical from './pages/Vertical/Vertical'
import PeriodVertical from './pages/Vertical/periods/firstPeriod/PeriodVertical'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'horizontal',
        element: <Horizontal />
      },
      {
        path: 'vertical',
        element: <Vertical />,
        children: [
          {
            path: 'first-period',
            element: <PeriodVertical period={1} />
          },
          {
            path: 'second-period',
            element: <PeriodVertical period={2} />
          },
          {
            path: 'third-period',
            element: <PeriodVertical period={3} />
          },
          {
            path: 'fourth-period',
            element: <PeriodVertical period={4} />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
