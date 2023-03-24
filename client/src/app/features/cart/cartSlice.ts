import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct } from '../../../interfaces/Cart.interfaces';

export interface ICartState {
  cart: ICartProduct[]
}


const initialState:ICartState = {
	cart:[]
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers:{

	}
});

export default cartSlice.reducer;