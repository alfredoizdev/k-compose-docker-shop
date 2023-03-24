import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction, current } from '@reduxjs/toolkit';
import { IProduct } from '../../../interfaces/Product.interfaces';

export interface ICartState {
  cart: IProduct[]
}


const initialState:ICartState = {
	cart:[]
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers:{
		setCartList: (state, action: PayloadAction<IProduct[]>) => {
			if(!action.payload) return;

			state.cart = action.payload;
			
		},
		addToCart: (state, action: PayloadAction<IProduct>) => {
	
			const currentCart = current(state.cart);
			
			let find = currentCart.some((item) => item.id === action.payload.id);
			
			if(!find) state.cart.unshift(action.payload);

		},
		removeFromCart: (state, action: PayloadAction<IProduct>) => {
			
			state.cart.splice(state.cart.findIndex((item) => item.id === action.payload.id), 1);
			localStorage.setItem('cart',JSON.stringify(state.cart));
		}
	}
});

export const { addToCart, removeFromCart,setCartList} = cartSlice.actions;

export default cartSlice.reducer;