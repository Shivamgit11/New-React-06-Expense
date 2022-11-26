import { useContext } from "react";
import { Redirect } from "react-router-dom";
import ExpenseFirstUI from "../Expense/Expenses";

import AuthContext from "../store/auth-context";


const Private = () => {
  console.log("private");
  const authCtx = useContext(AuthContext);

  const checkLoggedIN = authCtx.isLoggedIn;
  console.log(checkLoggedIN);

  return (
    <div>
      {/* {checkLoggedIN && <Redirect to='/auth' />}

      {checkLoggedIN && <Redirect to='/expense' />} */}
      {checkLoggedIN ? <ExpenseFirstUI /> : <Redirect to="/auth" />}
    </div>
  );
};

export default Private;
