import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authslice.js';
import jobslice from "./jobSlice.js";
import companySlice from "./companySlice.js";
const store = configureStore({

    reducer: {
       auth:  authSlice,
       job: jobslice,
       companies: companySlice
    },
})

export default store;