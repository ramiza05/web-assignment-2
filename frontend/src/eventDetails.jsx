import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerEvent } from "./registrationSlice";
import { current } from "@reduxjs/toolkit";

const API_URL = "https://app.ticketmaster.com/discovery/v2";

function EventDetails(){
    const {eventId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const currentUser = useSelector((state) => state.user.currentUser);
    const registrations = useSelector((state)=>state.registrations);


    useEffect(() =>{
        async function loadEvent(){
            setLoading(true);
            setError("");

            try{
                const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

                const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${encodeURIComponent(apiKey)}`
                );

                if(!response.ok){
                    throw new Error(`API Error! ${response.status}`);
                }

                const data = await response.json();
                setEvent(data);
            }
            finally{
                setLoading(false);
            }
        }
        loadEvent();
    }, [eventId]);

    if (loading){
        return<p>Loading Event Details...</p>
    }
    if (error){
        setError("Could not load event details. Please try again.");
        console.error(error);

    }
    if (!event){
        return <p>Event not found!</p>;
    }

    const venue = event._embedded?.venues?.[0];
    const date = event.dates?.start?.localDate;
    const time = event.dates?.start?.localTime;
    const category = event.classifications?.[0]?.segment?.name;
    const isRegistered = Array.isArray(registrations) &&
    registrations.some(
        (registration) =>
            registration.userId === currentUser?.id &&
            registration.eventId === event.id
    );

    function handleRegistration(){
        if (!currentUser){
            setMessage("Please Log in to register for an event!");
            return;
        }

        if (isRegistered){
            setMessage("Event Already Registered!");
            return;
        }

        dispatch((registerEvent({userId: currentUser.id, eventId:event.id, eventName: event.name, eventDate: date || "", eventTime: time || "", venue: venue?.name || "VENUE TO BE ANNOUNCED", location: [venue?.city?.name, venue?.state?.name, venue?.country?.name].filter(Boolean).join(", "), category: category || "No category specified!", image: event.images?.[0].url || "", eventUrl: event.url || "", registeredAt: new Date().toISOString()})))

        setMessage("Successfully registered for this event!");
    }

    return (
        <div>
            <button onClick={()=>navigate(-1)}>Back</button>

            <h1>{event.name}</h1>
            {event.images?.[0] && (<img src={event.images[0].url} alt={event.name}/>)}

            <h2>Event Registration</h2>
            {currentUser? (<button onClick={handleRegistration} disabled={isRegistered}>{isRegistered? "Already Registered" : "Register for Event"}</button>) :
            (<button onClick={() => navigate("/Login")}>Login to Register</button>)}

            {message && <p role="status">{message}</p>}

            <p><strong>Date:</strong> {date || "To be announced"}</p>
            <p><strong>Time:</strong> {time || "To be announced"}</p>
            <p><strong>Venue:</strong> {venue?.name || "To be announced"}</p>

            <p>
                <strong>Location:</strong>{" "}
                {[venue?.city?.name, venue?.state?.name, venue?.country?.name].filter(Boolean).join(", ") || "TO BE ANNOUNCED"}
            </p>
            <p>
                <strong>Category: </strong>
                {category || "Not Specified"}
            </p>
             {event.info && <p>{event.info}</p>}
             {event.pleaseNote && <p>{event.pleaseNote}</p>}
             
             {event.url && (
                <p>
                    <a href={event.url} target="_blank" rel="noreferrer">
                        View on Ticketmaster
                    </a>
                </p>
            )}
        </div>
    )
}

export default EventDetails;