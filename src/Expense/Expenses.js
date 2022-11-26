import React, { Fragment, useRef } from "react";

import classes from "./Expense.modul.css";
import axios from "axios";
import ShowExpense from "./showExpense";

const Expenses = (props) => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const showUserHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const obj = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    }
    

    axios.post(
      "https://react-expense-c9f7d-default-rtdb.firebaseio.com/expenses.json",
      obj
    );
  };

  return (
    <Fragment>
      <h1> Track Your Expenses</h1>
      <form className={classes.form} onSubmit={showUserHandler}>
        <label className={classes.label}>Expense Amount</label>
        <input
          type="number"
          id="amount"
          required
          className={classes.label}
          ref={amountInputRef}
        />
        <label for="description" className={classes.label}>
          Expense Description
        </label>
        <input
          type="text"
          id="description"
          required
          className={classes.label}
          ref={descriptionInputRef}
        />
        <label for="category" className={classes.label}>
          Choose Category
        </label>
        <select
          name="category"
          id="category"
          className={classes.label}
          ref={categoryInputRef}
        >
          <option value="investment">Investment</option>
          <option value="food">Food</option>
          <option value="grocery">Grocery</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <button id="submit">Add expense </button>
      </form>
      <hr></hr>
      <h1> Your Expenses for the month</h1>
      <div className={classes.list}>
        <span className={classes.list}>Your Amount </span>
        <span className={classes.list}>Description </span>
        <span className={classes.list}>Category </span>
      </div>
      <div className={classes.list}>
        <ShowExpense />
      </div>
    </Fragment>
  );
};

export default Expenses;
