import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/index.types';
import { Product } from '@prisma/client';
import { RootState } from './store';

export interface CartState{
  cartItems:CartItem[]
}

type AddProductType={
  product:Product,
  count:number
}

// Initial state
const initialState:CartState = {
    cartItems:[]
};

// Actual Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to set the authentication status
    addToCart:(state,action:PayloadAction<AddProductType>)=>{
      const item = state.cartItems.find((item)=>item.product.id===action.payload.product.id)
      if(item&&item.quantity==0)return state
      else if(item&&item.quantity>0)item.quantity+=action.payload.count;
      else {
        state.cartItems.push({
          product:action.payload.product,
          quantity:action.payload.count
        })
      }

    },
    decrementQuantity:(state,action:PayloadAction<Product>)=>{
      const item = state.cartItems.find((item)=>item.product.id===action.payload.id)
      if(item){
        item.quantity--;
        if(item.quantity===0){
          state.cartItems=state.cartItems.filter(e=>e.product.id!=action.payload.id)
        }
      }

    },
    incrementQuantity:(state,action:PayloadAction<Product>)=>{
      const item = state.cartItems.find((item)=>item.product.id===action.payload.id)
      if(item)item.quantity++;
        else {
          state.cartItems.push({
            product:action.payload,
            quantity:1
          })
        }

    },
    removeFromCart:(state,action:PayloadAction<Product>)=>{
      const item = state.cartItems.find((item)=>item.product.id===action.payload.id)

      if(item){
        state.cartItems=state.cartItems.filter(e=>e.product.id!=action.payload.id)
      }

    },
    clearCart:(state)=>{
      state.cartItems=[]

    }
  }
});

const cartItems = (state:RootState)=> state.cart.cartItems
export const totalCartItemSelector = createSelector([cartItems],(cartItems)=>
  cartItems.reduce((total:number,curr:CartItem)=>(total+=curr.quantity),0)
);
export const totalPriceSelector = createSelector([cartItems],(cartItems)=>
cartItems.reduce((total:number,curr:CartItem)=>(total+=curr.quantity*curr.product.price),0)
);
export const productQuantitySelector = createSelector([cartItems,(cartItems,productId:string)=>productId],
  (cartItems,productId)=>cartItems.find((e)=>e.product.id===productId)?.quantity
)

export const { addToCart,decrementQuantity,removeFromCart,clearCart,incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
