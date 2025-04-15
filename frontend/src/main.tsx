
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Provider } from 'react-redux'
import {store} from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'sonner'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store} >
    <Toaster richColors position='top-center'/>
    <App/>
    </Provider>
  </BrowserRouter>
      
  
)
