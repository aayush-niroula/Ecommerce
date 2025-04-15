import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import CartItem from "./CartItem"
import { fetchCartItems } from "../redux/cartSlice"

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items) || [] // Default to empty array if undefined
  console.log("Cart_Items",cartItems);
  
  const userId = 1
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    console.log('Fetching the items');
    
    dispatch(fetchCartItems(userId))
  }, [dispatch, userId])

  useEffect(()=>{
console.log("Cart items updated",cartItems);

  },[cartItems])
  
  const total = cartItems.reduce((acc, item) => {
    if (item && item.product && item.product.price && item.quantity) {
      return acc + item.product.price * item.quantity
    }
    return acc
  }, 0)
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-indigo-700">Your Cart</h2>
      
      <div className="space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            // Ensure item and item.product are defined before trying to access them
            if (item && item.product) {
              return (
                <CartItem
                  key={`${item.id}-${item.product.id}`}
                  cartItem={item}
                />
              )
            }
            return null // If item is undefined or missing product, don't render it
          })
        ) : (
          <div className="py-16 text-center">
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center text-xl font-semibold mb-4">
            <span className="text-gray-700">Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-2xl font-bold text-indigo-700">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart