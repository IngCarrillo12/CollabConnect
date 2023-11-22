import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userId:'',
    email:'',
    firstName:'',
    lastName:'',
    description:'',
    birthday:{day:'',month:'',year:''},
    photoURL:'',
    instagram:'',
    marca:false,
    nameMarca:'',
} 
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser: (state, action)=>{
            const {userId, birthday, firstName, description, lastName, marca, email, photoURL, instagram, nameMarca} = action.payload
            const {day, month, year} = birthday
            state.userId = userId
            state.firstName = firstName
            state.lastName =lastName
            state.email= email
            state.description = description
            state.birthday.day= day
            state.birthday.month = month
            state.birthday.year = year
            state.marca = marca
            state.photoURL = photoURL
            state.instagram = instagram
            state.nameMarca = nameMarca
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