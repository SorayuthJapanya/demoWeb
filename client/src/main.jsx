import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import RemoveBG from './components/RemoveBG.jsx'
import Upload from './components/upload.jsx'
import HITL from './components/HITL.jsx'
import ResultClass from './components/ResultClass.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/removebg',
    element: <RemoveBG/>
  },
  {
    path: '/upload',
    element: <Upload/>
  },
  {
    path: '/hmitl',
    element: <HITL/>
  },
  {
    path: '/result',
    element: <ResultClass/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
