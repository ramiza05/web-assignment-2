import { useState } from 'react'
import { useSelector, useDispatch} from "react-redux"
import { setEmail, setName, setPassword, resetPassword } from './userSlice';
import './App.css'

function Register() {

  const dispatch = useDispatch();
  const { nameOne, setNameOne } = useState("");
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
        <label>Name</label>
        <input type="text" value={nameOne} onChange={(e) => dispatchEvent(setName(e.target.value))} placeholder="Full Name"></input>
        <label>Email</label>
        <input type="text" value={emailOne} onChange={(e) => dispatchEvent(setEmail(e.target.value))} placeholder="Email Address"></input>
        <label>Password</label>
        <input type="text" value={passwordOne} onChange={(e) => dispatchEvent(setPassword(e.target.value))} placeholder="Password"></input>
        <input type="submit" value="Submit" ></input>
      </form>
    </div>
  )
}

export default Register
