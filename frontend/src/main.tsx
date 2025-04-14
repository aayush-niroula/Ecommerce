import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider ,createBrowserRouter } from 'react-router-dom'
import ProductList from './components/ProductList.tsx'
import { Provider } from 'react-redux'
import {store} from './redux/store.ts'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:"/shop",
    element:<ProductList/>
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <RouterProvider router={router}/>
    </Provider>
      
  
)
