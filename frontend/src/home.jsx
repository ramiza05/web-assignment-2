import { useNavigate } from "react-router-dom"

function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <h1>Welcome to the Events Page!</h1>
        </div>
    )
}

export default Home;