import { configureStore } from "@reduxjs/toolkit";
import { noteSlice } from "./NoteSlice";
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
    reducer:{
        [noteSlice.reducerPath]:noteSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteSlice.middleware),
})

setupListeners(store.dispatch)

