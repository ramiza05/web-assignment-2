import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://app.ticketmaster.com/discovery/v2";

function EventDetails(){
    const {eventId} = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        async function loadEvent(){
            setLoading(true);
            setError("");

            try{
                const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
                const response = await fetch(`${API_URL}/events/${eventId}.json?apiKey=${encodeURIComponent(apiKey)}`);

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
        return alert({error});
    }
    if (!event){
        return <p>Event not found!</p>;
    }

    const venue = event._embedded?.venues?.[0];
    const date = event.dates?.start?.localDate;
    const time = event.dates?.start?.localTime;
    const category = event.classifications?.[0]?.segment?.name;


    return (
        <div>
            <button onClick={()=>navigate(-1)}>Back to Events</button>

            <h1>{event.name}</h1>
            {event.images?.[0] && (<img src={event.images[0].url} alt={event.name}/>)}

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
