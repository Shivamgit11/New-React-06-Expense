import { Fragment, useContext, useRef } from "react";
import AuthContext from "../store/auth-context";

import classes from "./Profile.module.css";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const nameInputref = useRef();
  const profileInuputRef = useRef();

  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5IFGkNB01Wj6dWDO0OCDi3RhyZ2ReLjA",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        //...
        return res.json();
      } else {
        //...
        return res.json().then((data) => {
          // show an error modal
          let eroorMessage = "Unable to fetch please add name and url";
          // if (data && data.error && data.error.message) {
          //   eroorMessage = data.error.message;
          // }

          throw new Error(eroorMessage);
        });
      }
    })
    .then((data) => {
      authCtx.login(data.idToken);
    })
    .catch((err) => {
      alert(err.message);
    });

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputref.current.value;
    const enteredProfile = profileInuputRef.current.value;

    //fetching
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5IFGkNB01Wj6dWDO0OCDi3RhyZ2ReLjA",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredName,
          photoUrl: enteredProfile,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          //...
          return res.json();
        } else {
          //...
          return res.json().then((data) => {
            // show an error modal
            let eroorMessage = "Some issue";
            // if (data && data.error && data.error.message) {
            //   eroorMessage = data.error.message;
            // }

            throw new Error(eroorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        console.log("update workin")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <span>Winners Never Quite, Quitters Never Win </span>
        <span className={classes.span}>
          Your Profile is 64% complete, A complete Pfile has a heigher chanc to
          land a job
        </span>
      </div>

      <section className={classes.form}>
        <h1>contact Details</h1>
        <form onSubmit={submitHandler}>
          <label>Your Full Name</label>
          <input type="text" ref={nameInputref} required />
          <label>Profile Photo Url</label>
          <input type="url" ref={profileInuputRef} />
          <button className={classes.btn1}>Update</button>
        </form>
      </section>
    </Fragment>
  );
};

export default Profile;
