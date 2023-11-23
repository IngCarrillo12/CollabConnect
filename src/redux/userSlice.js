import { createSlice } from "@reduxjs/toolkit";

const initialState={} 
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser: (state, action)=>{
            return action.payload
        },
        resetUser:(state,action)=>{
            return {}
        }
    }
})
export const { addUser, resetUser} = userSlice.actions;
export default userSlice.reducer