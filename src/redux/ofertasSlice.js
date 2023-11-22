import { createSlice } from "@reduxjs/toolkit";

const initialState=[]

export const ofertasSlice = createSlice({
    name:'ofertas',
    initialState,
    reducers:{
        addOferta:(state, action)=>{
            state.push(action.payload)
        },
        resetOferta:(state,action)=>{
            return []
        }
    }
})
export const { addOferta, resetOferta} = ofertasSlice.actions
export default ofertasSlice.reducer