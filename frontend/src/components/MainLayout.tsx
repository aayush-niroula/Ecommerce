import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"


const MainLayout = () => {
  const navigate= useNavigate()
  return (
    <div className="overflow-x-hidden ">
        <div className=" relative w-full">
            <img src={"cover.jpg"} alt="" className="w-screen h-auto object-cover " />
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           <h1 className="font-bold text-6xl">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
           <p className="font-light text-pink-600 text-base  md:text-lg mt-4 max-w-xl mx-auto  ">Browse throught our diverse range of meliculosly crafted garments designed to bringout your indiviuality and cater to your sense of style</p>
          <div className="mt-6">
           <Button size={"lg"} onClick={()=>navigate("/shop")}>Shop Now</Button>
           <Button size={"lg"}>Explore</Button>
          </div>
           </div>
           
          <div className="bg-white py-12 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div>
            <h1 className="text-3xl font-bold">200+</h1>
            <p className="text-gray-600 mt-2">International Brands</p>
          </div>
          <div>
            <h1 className="text-3xl font-bold">2000+</h1>
            <p className="text-gray-600 mt-2">High Quality Products</p>
          </div>
          <div>
            <h1 className="text-3xl font-bold">30000+</h1>
            <p className="text-gray-600 mt-2">Happy Customers</p>
          </div>
          </div>

          <div className="bg-black h-24 w-full flex justify-around items-center">
             <h1 className="text-white font-bold font-[Regular]">VERSACE</h1>
             <h1 className="text-white font-bold font-[Oswald ]">ZARA</h1>
             <h1 className="text-white font-bold font-[Granjon Roman]">GUCCI</h1>
             <h1 className="text-white font-bold">PRADA</h1>
          </div>
            
        </div>
    </div>
  )
}

export default MainLayout