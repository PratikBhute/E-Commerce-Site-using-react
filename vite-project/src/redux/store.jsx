import { configureStore } from '@reduxjs/toolkit';
import  cartSlice from "./cardSlice"

export const store = configureStore({
    reducer: {
        cart : cartSlice

    },
    devTools: true
})