import axios from "axios";
import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";

const ShowExpense = () => {
  
  const [check, setcheck] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://react-expense-c9f7d-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((res) => {
        console.log(res.data);
        setcheck(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  console.log("checking check",typeof check);
  const result = Object.values(check);
  console.log("checking result",typeof result);
  return (
    <ul>
      {result.map((item) => (
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
