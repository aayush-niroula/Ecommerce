import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

const MainLayout = () => {
  const navigate = useNavigate()
  
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] sm:h-screen">
        <img
          src={"cover.jpg"}
          alt="Hero"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="max-w-4xl">
            <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-7xl leading-tight tracking-tight drop-shadow-lg mb-4 sm:mb-6">
              FIND CLOTHES THAT <span className="text-pink-300">MATCH</span> YOUR STYLE
            </h1>
            <p className="text-gray-100 mt-2 sm:mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Browse through our diverse range of meticulously crafted garments designed to bring out your individuality.
            </p>
            <div className="mt-6 sm:mt-10 flex gap-3 sm:gap-5 flex-wrap justify-center">
              <Button 
                size={"lg"} 
                onClick={() => navigate("/shop")} 
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Shop Now
              </Button>
              <Button 
                size={"lg"} 
                variant="outline" 
                className="border-2 border-pink-300 text-pink-100 hover:bg-pink-300 hover:text-gray-900 px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-12 sm:py-20 px-4 sm:px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {[
            { title: "200+", subtitle: "International Brands", icon: "🌎" },
            { title: "2000+", subtitle: "High Quality Products", icon: "✨" },
            { title: "30000+", subtitle: "Happy Customers", icon: "😊" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center transform hover:-translate-y-1">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.icon}</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-base sm:text-lg">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Brands Section */}
      <div className="bg-black py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider mb-6 sm:mb-8">Featured Brands</h3>
          <div className="flex justify-around items-center flex-wrap gap-6 sm:gap-8">
            {[
              { name: "VERSACE", color: "text-yellow-400" },
              { name: "ZARA", color: "text-white" },
              { name: "GUCCI", color: "text-green-400" },
              { name: "PRADA", color: "text-pink-400" }
            ].map((brand, i) => (
              <h1
                key={i}
                className={`${brand.color} font-semibold text-xl sm:text-2xl md:text-3xl tracking-widest opacity-90 hover:opacity-100 cursor-pointer transition-all duration-300`}
              >
                {brand.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-gray-900 text-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16">Why Shop With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {[
              { title: "Fast Delivery", description: "Get your order delivered within days" },
              { title: "Quality Materials", description: "All products are crafted with premium materials" },
              { title: "Easy Returns", description: "No-questions-asked return policy within 30 days" },
            ].map((feature, i) => (
              <div key={i} className="border border-gray-700 rounded-lg p-5 sm:p-6 hover:border-pink-500 transition-colors duration-300">
                <h3 className="text-lg sm:text-xl font-semibold text-pink-300 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout