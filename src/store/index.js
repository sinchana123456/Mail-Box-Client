import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";

const store = configureStore({
    reducer: {
        authentication: authReducer,
    }
})

export default store;