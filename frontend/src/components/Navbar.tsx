import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { fetchCartItems } from "../redux/cartSlice"



const Navbar = () => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const loaction= useLocation()
  const isActive=(path:string)=>loaction.pathname===path;
  const userId = 1
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state:RootState)=>state.cart.items) || []
  const cartItemCount= new Set(cartItems.map(item=>item?.product?.id)).size
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleCartClick=()=>{
      dispatch(fetchCartItems(userId))
        navigate('/cart')
  }
  useEffect(()=>{
    dispatch(fetchCartItems(userId))
  },[dispatch,userId])
  
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 w-full">
        <div 
          className="font-bold text-2xl sm:text-3xl tracking-tight cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <span className="text-black">SHOP</span>
          <span className="text-pink-500">.CO</span>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-1">
          <li 
            className={`font-medium text-gray-600 px-4 py-2 hover:text-pink-500 cursor-pointer transition-colors duration-200 relative group ${isActive('/shop')&& "text-pink-600 "}`} 
            onClick={() => navigate("/shop")}
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="font-medium text-gray-600 px-4 py-2 hover:text-pink-500 cursor-pointer transition-colors duration-200 relative group">
            On Sale
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="font-medium text-gray-600 px-4 py-2 hover:text-pink-500 cursor-pointer transition-colors duration-200 relative group">
            New Arrivals
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="font-medium text-gray-600 px-4 py-2 hover:text-pink-500 cursor-pointer transition-colors duration-200 relative group">
            Brands
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>
        
        {/* Search and Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-pink-500 transition-colors duration-200" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 w-32 md:w-64 transition-all duration-200" 
            />
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="relative group cursor-pointer">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-pink-500 transition-colors duration-200" onClick={handleCartClick} />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">{cartItemCount}</span>
            </div>
            
            <div className="cursor-pointer group hidden sm:block">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-pink-500 transition-colors duration-200" />
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-500 hover:text-pink-500 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col py-2">
            <li 
              className="font-medium text-gray-600 px-6 py-3 hover:bg-gray-50 hover:text-pink-500 cursor-pointer" 
              onClick={() => {
                navigate("/shop")
                setMobileMenuOpen(false)
              }}
            >
              Shop
            </li>
            <li 
              className="font-medium text-gray-600 px-6 py-3 hover:bg-gray-50 hover:text-pink-500 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              On Sale
            </li>
            <li 
              className="font-medium text-gray-600 px-6 py-3 hover:bg-gray-50 hover:text-pink-500 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Arrivals
            </li>
            <li 
              className="font-medium text-gray-600 px-6 py-3 hover:bg-gray-50 hover:text-pink-500 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Brands
            </li>
            <li className="px-6 py-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:border-pink-500 w-full" 
                />
              </div>
            </li>
            <li 
              className="font-medium text-gray-600 px-6 py-3 hover:bg-gray-50 hover:text-pink-500 cursor-pointer flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-5 h-5 mr-3 text-gray-500" />
              My Account
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar