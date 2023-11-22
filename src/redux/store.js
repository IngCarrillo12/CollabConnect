import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ofertasReducer from './ofertasSlice'
export const store = configureStore({
    reducer:{
        user: userReducer,
        ofertas: ofertasReducer,
    },
    
})

