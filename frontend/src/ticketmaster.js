const API_URL = "https://app.ticketmaster.com/discovery/v2";

export async function fetchEvents({
    keyword= "",
    category="",
    page = 0
}={}) 
{
    const apiKey = import.meta.env.TICKETMASTER_API_KEY;

    if(!apiKey){
        throw new Error("Ticket Master API key is missing!");
    }

    
    const params = new URLSearchParams({
        apikey: apiKey,
        size: "20",
        sort: "date,asc",
        page: String(page)
    });

    if (keyword.trim()){
        params.set("keyword", keyword.trim());
    }

    if (category){
        params.set("classificiationName", category);
    }

    const respone = await fetch(
        `${API_URL}/events.json?${params.toString()}`
    );

    if (!respone.ok){
        throw new Error(`API error!: ${response.status}`);
        
    }
    const data = await response.json();
    return data._embedded?.events ?? [];
}
