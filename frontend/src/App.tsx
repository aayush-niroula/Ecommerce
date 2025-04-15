import './App.css'
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductPage from './components/Productpage'
import Cart from './components/Cart'


function App() {

  return (
    <>
 
    <div className='fixed top-0 left-0 w-full z-50 shadow-md bg-white'>
    <Navbar/>
    </div>
    <div className='pt-16'>
    <Routes>
   <Route path='/' element={<MainLayout/>}/> 
   <Route path='/shop' element={<ProductList/>}/> 
   <Route path="/product/:id" element={<ProductPage/>}/>
   <Route path='/cart' element={<Cart/>}/>
    </Routes>

    </div>
    </>
  )
}

export default App
