import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userId:'',
    email:'',
    nombre:'',
    birthday:{day:'',month:'',year:''},
    photoURL:'',
    marca:false,
} 
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser: (state, action)=>{
            const {userId, birthday, firstName, lastName, marca, email, photoURL} = action.payload
            const {day, month, year} = birthday
            state.userId = userId
            state.nombre = firstName+' '+lastName;
            state.email= email
            state.birthday.day= day
            state.birthday.month = month
            state.birthday.year = year
            state.marca = marca
            state.photoURL = photoURL
        },
        resetUser:(state,action)=>{
            state.email = ''
            state.nombre=''
            state.photoURL=''
            state.birthday={day:'',month:'',year:''},
            state.marca = false,
            state.userId = ''
        }
    }
})
export const { addUser, resetUser} = userSlice.actions;
export default userSlice.reducer