import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import router from './router'
import ConfigProvider from 'antd/es/config-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider 
      theme={{
        token: {
           
        },
      }}
    ></ConfigProvider>
    <RouterProvider router={router} />
  </StrictMode>,
)
