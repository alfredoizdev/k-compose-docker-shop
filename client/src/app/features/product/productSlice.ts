import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../interfaces/Product.interfaces';




export interface IProductState {
 	products: IProduct[]
}


const initialState:IProductState = {
	products: [],
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers:{
		setListProduct: (state, action: PayloadAction<IProduct[]>) => {
			if(!action.payload) return;

			state.products = action.payload;
		},

		setProduct: (state, action: PayloadAction<IProduct>) => {
			if(!action.payload) return;

			state.products.push(action.payload)
		},

		removeProduct: (state, action: PayloadAction<IProduct>) => {
			//state.products.filter((item) => item.id === action.payload.id);
			state.products.splice(state.products.findIndex((item) => item.id === action.payload.id), 1);

		}
	}
});


export const { setListProduct, setProduct,removeProduct} = productSlice.actions;

export default productSlice.reducer;