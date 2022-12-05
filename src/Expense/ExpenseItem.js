// import axios from "axios";

// import axios from "axios";
import classes from "./ExpenseItem.module.css";
import { expenseActions } from "../store/Expense-redux";
import { useDispatch, useSelector } from "react-redux";

const ExpenseItem = (props) => {
  console.log("rechendki", props);
  const { amount, description, category, id } = props.item;
  console.log("checking id", id);
  
  const dispatch = useDispatch();

  const DeletDataHandler = (e) => {
    fetch(
      `https://react-expense-c9f7d-default-rtdb.firebaseio.com/expenses.json/${id}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch(expenseActions.removeExpense(id));
  };

  const editHandler = () => {
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    fetch(
      `https://react-expense-c9f7d-default-rtdb.firebaseio.com/expenses.json/${id}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch(expenseActions.removeExpense(id));
  };

  return (
    <li key={Math.random()}>
      <span className={classes.list}>{amount}</span>
      <span className={classes.list}>{description}</span>
      <span className={classes.list}>{category}</span>

      <button className={classes.list} onClick={editHandler}>
        Edit
      </button>
      <button className={classes.list} onClick={DeletDataHandler}>
        Delete
      </button>
    </li>
  );
};

export default ExpenseItem;
