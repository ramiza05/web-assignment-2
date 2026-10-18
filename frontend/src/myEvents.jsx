import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelRegistration } from "./registrationSlice";

function MyEvents(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);
    const registrations = useSelector((state) => state.registrations);
    
    const myEvents = Array.isArray(registrations)? registrations.filter((registration) => registration.userId === currentUser?.id):[];
    const today = new Date();
    const todayString = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
    const upcomingEvents = myEvents.filter((registration) => !registration.eventDate || registration.eventDate >= todayString);
    const pastEvents = myEvents.filter((registration) => registration.eventDate && registration.eventDate < todayString);


    function handleCancel(eventId){
        const confirmed = window.confirm("Are you sure you wish to cancel this event registration?");

        if (confirmed){
            dispatch(cancelRegistration({userId: currentUser?.id, eventId: eventId, } ));

        }
    }


    function renderEventCard(registration) {
        return (
            <div key={registration.eventId}>
                {registration.image && ( <img src={registration.image} alt={registration.eventName}/>)}

                <h3>{registration.eventName}</h3>
                <p><strong>Date:</strong>{" "} {registration.eventDate || "To be announced"}</p>
                <p><strong>Time:</strong>{" "}{registration.eventTime || "To be announced"}</p>
                <p><strong>Venue:</strong>{" "}{registration.venue || "To be announced"}</p>
                <p><strong>Location:</strong>{" "} {registration.location || "To be announced"}</p>
                <p><strong>Category:</strong>{" "} {registration.category || "Not specified"}</p>
                <button onClick={() =>navigate(`/Events/${registration.eventId}`)}>View Details</button>
                <button onClick={() => handleCancel(registration.eventId)}>Cancel Registration</button>
            </div>
        );
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
            <button onClick={()=>navigate(-1)}>Back</button>
            <h1>My Events</h1>
            <p>Events you have registered for.</p>

        
            {myEvents.length === 0 ? (
                <div>
                    <h2>No registered events yet!</h2>
                    <p>Explore events and register for the ones you want to attend.</p>
                    <button onClick={() => navigate("/Events")}>Explore Events</button>
                </div>) : (
                <>
                    <div>
                        <h2>Upcoming Events ({upcomingEvents.length})</h2>

                        {upcomingEvents.length === 0 ? ( <p>You have no upcoming events.</p>
                        ) : (
                            <div className="event-grid">{upcomingEvents.map(renderEventCard)}</div>
                        )}
                    </div>

                    <div>
                        <h2>Past Events ({pastEvents.length})</h2>

                        {pastEvents.length === 0 ? (<p>You have no past events.</p>
                        ) : (
                            <div className="event-grid">{pastEvents.map(renderEventCard)}
                            </div>
                        )}
                    </div>
                </>
            )}

        </div>
    );
}

export default MyEvents;