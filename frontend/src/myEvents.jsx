import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelRegistration } from "./registrationSlice";

function MyEvents(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);
    const registrations = useSelector((state) => state.registrations);

    const myEvents = Array.isArray(registrations)? registrations.filter((registration) => registration.userId === currentUser?.id):[];

    function handleCancel(eventId){
        const confirmed = window.confirm("Are you sure you wish to cancel this event registration?");

        if (confirmed){
            dispatch(cancelRegistration({userId: currentUser?.id, eventId: eventId, } ));

        }
    }

    if (!currentUser){
        return(<div>
            <h1>My Events</h1>
                <p>Please log in to view your registered events.</p>
                <button onClick={() => navigate("/Login")}>Log In</button>
        </div>);
    }

    return(
        <div>
            <h1>My Events</h1>
            <p>Events you have registered for.</p>

            {myEvents.length === 0 ? (
                <div>
                    <h2>No registered events yet!</h2>
                    <p>
                        Explore events and register for the ones you want to attend.
                    </p>
                    <button onClick={() => navigate("/Events")}>Explore Events</button>
                </div>) : (
                <div className="event-grid">
                    {myEvents.map((registration) => (
                        <div key={registration.eventId}>
                        
                            {registration.image && ( <img src={registration.image} alt={registration.eventName}/> )}

                            <h2>{registration.eventName}</h2>

                            <p> <strong>Date:</strong>{" "} {registration.eventDate || "To be announced"}</p>

                            <p><strong>Time:</strong>{" "}{registration.eventTime || "To be announced"}</p>

                            <p><strong>Venue:</strong>{" "}{registration.venue || "To be announced"}</p>

                            <p><strong>Location:</strong>{" "} {registration.location || "To be announced"}</p>

                            <p><strong>Category:</strong>{" "}{registration.category || "Not specified"}</p>

                            <button onClick={() => navigate(`/Events/${registration.eventId}`)}> View Details</button>
                            <button onClick={() =>handleCancel(registration.eventId)} > Cancel Registration </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyEvents;