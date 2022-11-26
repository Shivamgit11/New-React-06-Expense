import { useRef } from "react";
import { Link } from "react-router-dom";

const Forgot = () => {
    const emailsInputRef = useRef();
  const resetPasswordHandler = (event) => {
    event.preventDefault();

    const enteredEmails = emailsInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD5IFGkNB01Wj6dWDO0OCDi3RhyZ2ReLjA",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmails,
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
            let errorMessage = "Password reset not successful";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Reset link has been sent to you email");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h1>Helping Foundation</h1>
      <form onSubmit={resetPasswordHandler}>
        <label>Entered the email which you have registered</label>
        <input placeholder="please enter your email" ref={emailsInputRef} />
        <button>Send Link</button>
        <h4>
          Already a user<Link to="/auth">Login?</Link>
        </h4>
      </form>
    </div>
  );
};

export default Forgot;
