import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    totalAmount: 0,
    premium: false,
  },
  reducers: {
    addExpense(state, action) {
      state.changed = true;
      const newExpense = action.payload;

      state.expenses.push({
        id: newExpense.id,
        amount: newExpense.amount,
        description: newExpense.description,
        category: newExpense.category,
      });

      state.totalAmount = Number(state.totalAmount) + Number(newExpense.amount);
    },
    removeExpense(state, action) {
      const id = action.payload;
      const existingExpense = state.expenses.find((item) => item.id === id);
      if (existingExpense) {
        state.expenses = state.expenses.filter((item) => item.id !== id);
        state.totalAmount = state.totalAmount - existingExpense.amount;
      }
    },
    activatePremium(state, action) {
      state.changed = true;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
