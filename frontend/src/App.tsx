import './App.css'
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout'
import {store} from './redux/store'
import {Provider} from 'react-redux'

function App() {

  return (
    <>
    <Provider store={store}>
    <div className='fixed top-0 left-0 w-full z-50 shadow-md bg-white'>
    <Navbar/>
    </div>
    <MainLayout/>
    </Provider>
    </>
  )
}

export default App
