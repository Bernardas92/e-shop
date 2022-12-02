import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";

export default function Home() {
  const [auth, setAuth] = useAuth();
  return (
    <div className="App">
      <Jumbotron title="Hello world" subTitle="Welcome to React e-shop" />
    </div>
  );
}
