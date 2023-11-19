import { createSlice } from "@reduxjs/toolkit";

const initialState={
    nombre:'',
    email:'',
    photoURL:'',
} 
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser: (state, action)=>{
            const {displayName, email, photoURL} = action.payload
            state.nombre =displayName;
            state.email= email
            state.photoURL = photoURL
        },
        resetUser:(state,action)=>{
            state.email = ''
            state.nombre=''
            state.photoURL=''
        }
    }
})
export const { addUser, resetUser} = userSlice.actions;
export default userSlice.reducer