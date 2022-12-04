import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageNotFound from '../../images/NotFound.jpg';

export default function Loading() {
    const [count, setCount] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount );
        }, 1000);
        count === 0 && navigate("/dashboard");

        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh"}}>
            <img src={ImageNotFound} alt="Loading" style={{ width: "600px" }} />
        </div>
    )
}