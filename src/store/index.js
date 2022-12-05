import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.redux";
import expenseSlice from "./Expense-redux";
import themeReducer from "./theme-redux";


const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        expense: expenseSlice.reducer,
        theme: themeReducer.reducer,
    } 
    
})

export default store;