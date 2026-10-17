import { useState } from 'react'
import { useSelector, useDispatch} from "react-redux"
import './App.css'

function Login() {

  const dispatch = useDispatch();
  const { emailOne, setEmailOne } = useState("");
  const { passwordOne, setPasswordOne } = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" value={emailOne} onChange={(e) => dispatch(setEmail(e.target.value))} placeholder="Email Address"></input>
        <label>Password</label>
        <input type="text" value={passwordOne} onChange={(e) => dispatch(setPassword(e.target.value))} placeholder="Password"></input>
        <input type="submit" value="Submit" ></input>
      </form>
    </div>
  )
}

export default Login;
