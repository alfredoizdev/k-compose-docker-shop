import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../interfaces/Product.interfaces';

export interface IProductState {
 	products: IProduct[]
}


const initialState:IProductState = {
	products:[]
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers:{
		setListProduct: (state, action: PayloadAction<IProduct[]>) => {

			if(!action.payload) return;

			state.products = action.payload;
		
		}
	}
});

export const { setListProduct} = productSlice.actions;

export default productSlice.reducer;