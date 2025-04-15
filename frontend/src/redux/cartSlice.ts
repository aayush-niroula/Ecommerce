import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Product type
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Cart item structure
export interface CartItemType {
  id: number;
  product: Product;
  userId: number;
  quantity: number;
}

// Thunk payloads
interface AddToCartPayload {
  userId: number;
  productId: number;
  quantity: number;
}

interface RemoveCartPayload {
  userId: number;
  productId: number;
}

// Cart state
interface CartState {
  items: CartItemType[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Async Thunks

export const addToCart = createAsyncThunk<CartItemType, AddToCartPayload>(
  "cart/addToCart",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/cart/${userId}/${productId}`,
        { quantity },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data
       
      
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);

export const fetchCartItems = createAsyncThunk<CartItemType[], number>(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/cart/${userId}`);
      return response.data.cartItem;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart items");
    }
  }
);

export const removeCartItem = createAsyncThunk<RemoveCartPayload, RemoveCartPayload>(
  "cart/removeCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/cart/${userId}/${productId}`);
      return { userId, productId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

// Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existing = state.items.find(
          (i) => i.product.id === newItem.product.id
        );
        if (existing) {
          const updatedItems = state.items.map(item =>
            item.product.id === newItem.product.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
        );
        state.items = updatedItems;
        } else {
          state.items.push(newItem);
        }
      })

      // Fetch cart
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove from cart
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) =>
            item.userId !== action.payload.userId ||
            item.product.id !== action.payload.productId
        );
      });
  },
});

export default cartSlice.reducer;
