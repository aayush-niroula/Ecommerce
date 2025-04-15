import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';


interface ProductCardProps {
  imageUrl?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  price,
  stock,
  description,
  onClick
}) => {
  
  // Handle unavailable images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/api/placeholder/400/300';
  };

  return (
    <div 
      className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col'
      onClick={onClick}
    >
      {/* Image container with consistent aspect ratio */}
      <div className='relative w-full pt-[75%]'>
        <img 
          src={imageUrl} 
          alt={name}
          onError={handleImageError}
          className='absolute inset-0 w-full h-full object-cover transition-opacity duration-300'
        />
        {/* Stock indicator */}
        <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded ${
          stock > 10 ? 'bg-green-100 text-green-800' : 
          stock > 0 ? 'bg-orange-100 text-orange-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Sold Out'}
        </div>
      </div>
      
      {/* Content section */}
      <div className='p-4 flex-grow flex flex-col'>
        <div className='flex-grow'>
          <h3 className='text-lg font-semibold text-gray-800 mb-1 line-clamp-1'>{name}</h3>
          <p className='text-gray-500 text-sm mb-3 line-clamp-2'>{description}</p>
        </div>
        
        {/* Price and button section */}
        <div className='flex items-center justify-between mt-auto'>
          <p className='text-pink-600 font-bold text-lg'>${price.toFixed(2)}</p>
          <Button 
            size="sm" 
            className='bg-pink-500 hover:bg-pink-600 text-white rounded-md px-3 transition-colors duration-200 flex items-center gap-1'
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic could go here

            }}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;