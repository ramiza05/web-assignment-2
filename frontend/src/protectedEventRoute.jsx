import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedEventRoute({children})
{
    const currentUser = useSelector((state) => state.user.currentUser);

    if (!currentUser){
        return <Navigate to="/Login"></Navigate>
    }

    return children;
}

export default ProtectedEventRoute;