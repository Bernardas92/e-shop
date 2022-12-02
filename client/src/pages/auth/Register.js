import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("Bernard");
  const [email, setEmail] = useState("Bernardas@gmail.com");
  const [password, setPassword] = useState("bernard");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/register`, {
      name,
      email,
      password
    });
    console.log(data);
    if(data?.error) {
      toast.error(data.error);
    } else {
      localStorage.setItem("auth", JSON.stringify(data));
      setAuth({...auth, token: data.token, user: data.user });
      toast.success("Registration successful")
      navigate("/dashboard");
    }
    } catch (err) {
      console.log(err)
      toast.error("Registration failed. Try again")
    }
  }

  return (
    <div className="App">
      <Jumbotron title="Register" subTitle="Welcome to React e-shop" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}