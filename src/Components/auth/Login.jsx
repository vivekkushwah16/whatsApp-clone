import React from "react";
import "./login.scss";
import { Button } from "@material-ui/core";
import logo from "/assets/whatsapp.png";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../../Store/StateProvider";
import { actionType } from "../../Store/Reducer";
function Login() {
  // const[state,dispatch]=useStateValue()
  const [{ user }, dispatch] = useStateValue();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="app logo" />
        <div className="login__container__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
