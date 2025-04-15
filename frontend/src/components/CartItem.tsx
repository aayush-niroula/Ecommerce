import React from 'react'
import { useDispatch } from 'react-redux'
import { CartItemType } from '../redux/cartSlice'

interface CartItemProps {
  cartItem: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  // const dispatch = useDispatch<AppDispatch>()
  
  if (!cartItem || !cartItem.product) {
    return null;
  }
  
  return (
    <div className="flex flex-col sm:flex-row justify-between border-b border-gray-200 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={cartItem.product.imageUrl} 
            alt={cartItem.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-4 sm:mt-0 sm:ml-6">
          <h3 className="font-bold text-lg text-gray-800">{cartItem.product.name}</h3>
          <div className="flex items-center mt-2 space-x-6">
            <p className="text-indigo-700 font-semibold">{cartItem.product.price !==undefined?`$${cartItem.product.price.toFixed(2)}`: 'N/A'}</p>
            <div className="flex items-center border border-gray-300 rounded">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
              <span className="px-3 py-1 text-gray-800">{cartItem.quantity}</span>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col mt-4 sm:mt-0 sm:items-end">
        <p className="font-semibold text-gray-800">
          ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
        </p>
        <button className="mt-2 text-red-500 hover:text-red-700 font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem