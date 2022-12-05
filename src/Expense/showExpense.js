// import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";

const ShowExpense = (props) => {
  const checkExpense = useSelector((state) => state.expense.expenses);
  // console.log("Checking props", props);

  // const [check, setcheck] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://react-expense-c9f7d-default-rtdb.firebaseio.com/expenses.json"
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setcheck(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // console.log("checking check", typeof check);
  // console.log(check);
  // const result = Object.values(check);
  // console.log("checking result", typeof result);

  // if (result == null) {
  //   return <h1>Please add your expense</h1>;
  // }
  return (
    <ul>
      {checkExpense.map((item) => (
        <ExpenseItem
          item={{
            id: item.id,

            amount: item.amount,
            description: item.description,
            category: item.category,
          }}
        />
      ))}
    </ul>
  );
};

export default ShowExpense;
