import React, { Fragment, useRef, useState } from "react";

import classes from "./Expense.module.css";
import { expenseActions } from "../store/Expense-redux";
import { themeActions } from "../store/theme-redux";

import ShowExpense from "./showExpense";
import { useDispatch, useSelector } from "react-redux";

const Expenses = (props) => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.expense.totalAmount);
  const darkMode = useSelector((state) => state.expense.darkMode);
  const [premium, setPremium] = useState(false);
  const [download, setdownload] = useState(false);

  const showUserHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const obj = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

    // axios.post(
    //   "https://react-expense-c9f7d-default-rtdb.firebaseio.com/expenses.json",
    //   obj
    // );

    fetch(
      `https://react-expense-c9f7d-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "POST",
        body: JSON.stringify({
          ...obj,
        }),
      }
    ).then(async (res) => {
      const data = await res.json();
      console.log(data.name);

      dispatch(
        expenseActions.addExpense({
          id: data.name,
          amount: obj.amount,
          description: obj.description,
          category: obj.category,
        })
      );
    });
    if (totalPrice > 10000) {
      console.log("Premium Activated");
      setPremium(true);
    }
  };

  const premiumHandler = () => {
    setPremium(false);
    setdownload(true);
  };
  const darkNormalHandler = () => {
    if (darkMode) {
      dispatch(themeActions.changeTheme("LIGHTMODE"));
    } else dispatch(themeActions.changeTheme("DARKMODE"));
  };

  return (
    <Fragment>
      <h1> Track Your Expenses</h1>
      {download && <h3>premium feature activate</h3>}
      {download && (
        <button onClick={darkNormalHandler}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      )}
      <form className={classes.form} onSubmit={showUserHandler}>
        <label className={classes.list}>Expense Amount</label>
        <input
          type="number"
          id="amount"
          required
          className={classes.label}
          ref={amountInputRef}
        />
        <label for="description" className={classes.list}>
          Expense Description
        </label>
        <input
          type="text"
          id="description"
          required
          className={classes.label}
          ref={descriptionInputRef}
        />
        <label for="category" className={classes.list}>
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
        <h2>total Amount = {totalPrice}</h2>
        {premium && <button onClick={premiumHandler}>Activate premium</button>}
      </div>
    </Fragment>
  );
};

export default Expenses;
