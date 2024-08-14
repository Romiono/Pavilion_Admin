import './styles/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Horizontal from './pages/Horizontal/Horizontal'
import Vertical from './pages/Vertical/Vertical'
import PeriodVertical from './pages/Vertical/periods/PeriodVertical'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'horizontal/:id',
        element: <Horizontal />
      },
      {
        path: 'vertical/:id',
        element: <Vertical />,
        children: [
          {
            path: ':period',
            element: <PeriodVertical />
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
