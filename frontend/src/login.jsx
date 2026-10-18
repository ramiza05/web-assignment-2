
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "./userSlice";
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [emailOne, setEmailOne] = useState("");
  const [passwordOne, setPasswordOne] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    const emailLower = emailOne.trim().toLowerCase();

    const userFound = users.find(
      (user) => user.email === emailLower && user.password === passwordOne
    );

    if (userFound) { 
        dispatch(logIn(userFound));
        navigate("/Events");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={emailOne}
          onChange={(e) => setEmailOne(e.target.value)}
          placeholder="Email Address"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
          placeholder="Password"
          required
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
