import './styles/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import {store} from "./store/store";
import {createHashRouter, RouterProvider} from "react-router-dom";
import Horizontal from "./pages/Horizontal/Horizontal";
import Vertical from "./pages/Vertical/Vertical";
import FirstPeriodHorizontal from "./pages/Horizontal/periods/firstPeriod/FirstPeriodHorizontal";
import SecondPeriodHorizontal from "./pages/Horizontal/periods/secondPeriod/SecondPeriodHorizontal";
import ThridPeriodHorizontal from "./pages/Horizontal/periods/thirdPeriod/ThridPeriodHorizontal";
import FourthPeriodHorizontal from "./pages/Horizontal/periods/fourthPeriod/FourthPeriodHorizontal";
import FirstPeriodVertical from "./pages/Vertical/periods/firstPeriod/FirstPeriodVertical";
import SecondPeriodVertical from "./pages/Vertical/periods/secondPeriod/SecondPeriodVertical";
import ThridPeriodVertical from "./pages/Vertical/periods/thirdPeriod/ThridPeriodVertical";
import FourthPeriodVertical from "./pages/Vertical/periods/fourthPeriod/FourthPeriodVertical";

const router = createHashRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'horizontal',
        element: <Horizontal/>,
        children: [
          {
            path: 'first-period',
            element: <FirstPeriodHorizontal />,
          },
          {
            path: 'second-period',
            element: <SecondPeriodHorizontal />,
          },
          {
            path: 'third-period',
            element: <ThridPeriodHorizontal />,
          },
          {
            path: 'fourth-period',
            element: <FourthPeriodHorizontal />,
          },
        ]
      },
      {
        path: 'vertical',
        element: <Vertical/>,
        children: [
          {
            path: 'first-period',
            element: <FirstPeriodVertical />,
          },
          {
            path: 'second-period',
            element: <SecondPeriodVertical />,
          },
          {
            path: 'third-period',
            element: <ThridPeriodVertical />,
          },
          {
            path: 'fourth-period',
            element: <FourthPeriodVertical />,
          },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
