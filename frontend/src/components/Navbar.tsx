import { Search, ShoppingCart, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate=useNavigate()
  return (
    <div className="flex items-center justify-between px-6 py-6 w-full ">
      <div className="font-bold text-4xl  ">
        SHOP.CO
      </div>
        <ul className="flex space-x-6">
          <li className="font-light text-gray-500 px-3 hover:text-black cursor-pointer " onClick={()=>navigate("/shop")}>Shop</li>
          <li className="font-light text-gray-500 px-3 hover:text-black cursor-pointer ">On Sale</li>
          <li className="font-light text-gray-500 px-3 hover:text-black cursor-pointer ">New Arrivals</li>
          <li className="font-light text-gray-500 px-3 hover:text-black cursor-pointer ">Brands</li>
        </ul>
        <div className="flex items-center space-x-6">
        <div className="relative">
       <Search className="absolute left-3 top-1/2 w-5 h-5 transform -translate-y-1/2 "/>
      <input type="text" placeholder="Search for prodcuts..... " className="border rounded-2xl pl-12 pr-4 py-2 text-sm outline-none bg-gray-200 w-100 " />
        </div>
        </div>
        <div className="flex items-center space-x-4">
      <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-black cursor-pointer gap-2 " />
      <User className="w-6 h-6 text-gray-300 hover:text-black cursor-pointer"/>
        </div>
    </div>
  )
}

export default Navbar