import { useState } from 'react'
import { useSelector, useDispatch} from "react-redux"
import { registerUser } from './userSlice';
import './App.css'
import { useNavigate } from 'react-router-dom';

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);

  const  [nameOne, setNameOne]  = useState("");
  const  [emailOne, setEmailOne]  = useState("");
  const  [passwordOne, setPasswordOne]  = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // check if user exists with that email

    const emailLower = emailOne.trim().toLowerCase();

    const emailExists = users.some(
        (user) => user.email == emailLower
    );

    if (emailExists){
        alert("This email already exists!");
        return;
    }
    dispatch(registerUser({id: crypto.randomUUID(), name: nameOne.trim(), email: emailLower, password: passwordOne }));
    alert("Registration successful! Please proceed to Login!");
    navigate("/Login", {replace: true});
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={nameOne} onChange={(e) => (setNameOne(e.target.value))} placeholder="Full Name"></input>
        <label>Email</label>
        <input type="text" value={emailOne} onChange={(e) => (setEmailOne(e.target.value))} placeholder="Email Address"></input>
        <label>Password</label>
        <input type="text" value={passwordOne} onChange={(e) => (setPasswordOne(e.target.value))} placeholder="Password"></input>
        <input type="submit" value="Register" ></input>
      </form>
    </div>
  )
}

export default Register
