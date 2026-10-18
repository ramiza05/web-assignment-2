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

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKeyword(keyword.trim()); 
    };

    const loggingout = () => {
        console.log("Logout button clicked"); // temporary test
        dispatch(logOut());
        navigate("/Login", {replace: true});
    }

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        async function loadEvents() {
            setLoading(true);
            setError("");

        try {
            const results = await fetchEvents({
            keyword: searchKeyword,
            category
            });

            setEvents(results);
        } catch (err) {
            setError(err.message || "Failed to load events.");
        } finally {
            setLoading(false);
        }
    }

    loadEvents();
    }, [searchKeyword, category])

    
    return(
        <div>
            <h1>Welcome to the Events Page!</h1>
            <h1>Welcome, {currentUser.name}!</h1>
            <button onClick={loggingout}>Log Out</button>

            <h2>Explore Events</h2>

            {loading && <p>Loading Events . . .</p>}
            {error && <p>{error}</p>}\

            {!loading && !error && events.length===0 && <p>No events found!</p>}

            <form onSubmit={handleSearch}>
                <input type="search" placeholder="Search artists, teams, or events..." value={keyword} onChange={(event) => setKeyword(event.target.value)}/>
                <button type="submit">Search</button>
                <button type="button" onClick={() => { setKeyword(""); setSearchKeyword(""); setCategory("");}}>Clear filters</button>
            </form>

            <label htmlFor="category">Category: </label>
            <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="">All categories</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Arts & Theatre">Arts & Theatre</option>
                <option value="Film">Film</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>
            {events.map((event)=> (
            <div key={event.id} onClick={() => navigate(`/Events/${event.id}`)} style={{ cursor: "pointer" }}>
                
                    <article key={event.id}>
                        {event.images?.[0] && (<img src={event.images[0].url} alt={event.name}></img>)}

                        <h3>{event.name}</h3>
                        <p>
                            {event.dates?.start.localDate || "Date TO BE ANNOUNCED"}
                            {event.dates?.start.localTime && ` at ${event.dates.start.localTime}`}
                        </p>

                        <p>
                            {events._embedded?.venues?.[0]?.name || "Venue TO BE ANNOUNCED"}
                        </p>
                        <p>
                            {events._embedded?.venues?.[0].city?.name || ""}
                        </p>
                        <p>
                            {events.classifications?.[0]?.segment?.name || ""}
                        </p>
                    </article>
                
            </div>))}
        </div>
    )
}

export default Events;