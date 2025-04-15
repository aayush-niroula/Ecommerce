import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Product{
  id:number;
  imageUrl:string;
  stock:number;
  description:string;
  name:string;
  price: number
}
interface ProductState{
    products:Product[],
    selectedProduct: Product | null
   
}
const initialState:ProductState={
    products:[],
    selectedProduct:null,
}
export const productSlice = createSlice({
   name:'product',
   initialState,
   reducers:{
    setAllProducts:(state,action:PayloadAction<Product[]>)=>{
      state.products = action.payload
    },
    selectProduct:(state,action:PayloadAction<Product>)=>{
       state.selectedProduct =action.payload 
    }
   }

})

export const { setAllProducts,selectProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;