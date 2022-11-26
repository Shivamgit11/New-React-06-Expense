import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Forgot from "./pages/forgot";
import Private from "./pages/PrivateRoute";
import Profile from "./pages/profile";
import Welcome from "./pages/WelcomeExpense";
import AuthContext from "./store/auth-context";
import ExpenseFirstUI from "./Expense/Expenses";

function App() {
  const authCtx = useContext(AuthContext);

  

  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn);

  return (
    // {!isLoggedIn && (<AuthPage />) }
    <main>
      <Switch>
        <Route path="/" exact>
          <Private />
        </Route>

        <Route path="/expense" exact>
          <ExpenseFirstUI />
        </Route>

        <Route path="/auth">
          <AuthPage />
        </Route>

        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/forgot-password">
          <Forgot />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
