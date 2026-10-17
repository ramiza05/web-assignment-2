import { useState } from 'react'
import { useSelector, useDispatch} from "react-redux"
import { setEmail, setName, setPassword, resetPassword } from './userSlice';
import './App.css'
import { useNavigate } from 'react-router-dom';

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nameOne, setNameOne } = useState("");
  const { emailOne, setEmailOne } = useState("");
  const { passwordOne, setPasswordOne } = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/Events");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={nameOne} onChange={(e) => dispatch(setName(e.target.value))} placeholder="Full Name"></input>
        <label>Email</label>
        <input type="text" value={emailOne} onChange={(e) => dispatch(setEmail(e.target.value))} placeholder="Email Address"></input>
        <label>Password</label>
        <input type="text" value={passwordOne} onChange={(e) => dispatch(setPassword(e.target.value))} placeholder="Password"></input>
        <input type="submit" value="Submit" ></input>
      </form>
    </div>
  )
}

export default Register
