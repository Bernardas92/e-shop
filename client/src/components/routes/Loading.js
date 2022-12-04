import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGif from '../../images/Loading.gif';

export default function Loading({path = "login"}) {
    const [count, setCount] = useState(2);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount );
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });

        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh"}}>
            <img src={LoadingGif} alt="Loading" style={{ width: "300px" }} />
        </div>
    )
}