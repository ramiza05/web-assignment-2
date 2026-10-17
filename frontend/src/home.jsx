import { useNavigate } from "react-router-dom"

function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <h1>Welcome!</h1>
        </div>
    )
}

export default Home;