import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/User.interfaces';

export interface IUserState {
 	id: string;
	name: string;
	last: string;
	email: string;
	role: "admin" | "user" | null
}


const initialState:IUserState = {
	id: "",
	name: "",
	last: "",
	email: "",
	role: "user"
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers:{
		addUser: (state, action: PayloadAction<IUser>) => {

			if(!action.payload) return;
			
			const {email,id,last,name,role} = action.payload;

			state.email = email;
			state.id = id;
			state.name = name;
			state.last = last;
			state.role = role;
		},
		removeUser: (state)=> {
			state.email = "";
			state.id = "";
			state.last = "";
			state.role = null;
			state.name = "";
		}
	}
});

export const { addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;