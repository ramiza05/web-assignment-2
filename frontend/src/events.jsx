import { replace, useNavigate} from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { logOut } from "./userSlice";
import Login from "./login.jsx"

function Events(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const loggingout = () => {
        console.log("Logout button clicked"); // temporary test
        dispatch(logOut());
        navigate("/Login", {replace: true});
    }
    return(
        <div>
            <h1>Welcome to the Events Page!</h1>
            <button onClick={loggingout}>Log Out</button>
        </div>
    )
}

export default Events;