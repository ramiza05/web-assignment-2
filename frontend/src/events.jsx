import { replace, useNavigate} from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { logOut } from "./userSlice";
import { useEffect, useState } from "react";
import Login from "./login.jsx"
import { fetchEvents } from "./ticketmaster.js";

function Events(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const loggingout = () => {
        console.log("Logout button clicked"); // temporary test
        dispatch(logOut());
        navigate("/Login", {replace: true});
    }

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadEvents() {
            try{
                const results = await fetchEvents();
                setEvents(results);
            }
            catch(err){
                setError(err.message || "Event loading has failed!");
            }
            finally{
                setLoading(false);
            }
        }

        loadEvents();
    }, [])

    return(
        <div>
            <h1>Welcome to the Events Page!</h1>
            <h1>Welcome, {currentUser?.name}!</h1>
            <button onClick={loggingout}>Log Out</button>

            <h2>Explore Events</h2>

            {loading && <p>Loading Events . . .</p>}
            {error && <p>{error}</p>}\

            {!loading && !error && events.length===0 && <p>No events found!</p>}
            
        </div>
    )
}

export default Events;