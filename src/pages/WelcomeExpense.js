import { Fragment, useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./Welcome.css";

const Welcome = () => {
  console.log("welcomn");
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    localStorage.removeItem("idToken");
    history.replace("/auth");
  };

  const verifyHandler = () => {
    alert("verification email sent to your email");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD5IFGkNB01Wj6dWDO0OCDi3RhyZ2ReLjA",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Data could not be fetched";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Email is verified");
        console.log(data.email);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>Expense Tracker</div>
        <div>
          Your Profile is incomplete
          <NavLink to="/profile">...Complete Now</NavLink>
        </div>
        <button onClick={verifyHandler}>Verify Your Email</button>
        <button onClick={logoutHandler}>Logout</button>
      </header>
      <Link to='expense'>
        <h1>Calculate you expense</h1>
      </Link>
    </Fragment>
  );
};
export default Welcome;
