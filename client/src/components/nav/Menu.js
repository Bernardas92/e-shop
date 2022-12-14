import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Logo from "../../images/Grey.png";
import useCategory from "../../hooks/useCategory";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink className="nav-link" aria-current="page" to="/">
            <img src={Logo} height={35} alt="Logo" loading="lazy" />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" aria-current="page" to="/shop">
              SHOP
            </NavLink>
            <NavDropdown title="CATEGORIES" id="collasible-nav-dropdown">
              <NavDropdown.Item style={{ backgroundColor: "#ffff" }}>
                <NavLink className="categoriesList" to="/categories">
                  <NavLink
                    className="d-flex flex-direction-column"
                    style={{ color: "#000000" }}
                    to="/categories"
                  >
                    All CATEGORIES
                  </NavLink>
                  {categories?.map((c) => (
                    <NavLink
                      className="d-flex flex-direction-column"
                      style={{ color: "#000000" }}
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </NavLink>
                  ))}
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
            <Search />
          </Nav>
          <Nav>
            <Badge
              count={cart?.length >= 1 ? cart.length : 0}
              offset={[-5, 11]}
              showZero={true}
            >
              <NavLink className="nav-link p-3" aria-current="page" to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
              </NavLink>
            </Badge>
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    REGISTER
                  </NavLink>
                </li>
              </>
            ) : (
              <NavDropdown title="DASHBOARD" id="collasible-nav-dropdown">
                <NavDropdown.Item style={{ backgroundColor: "#ffff" }}>
                  <a
                    className="dropdown-item"
                    style={{ backgroundColor: "#ffff" }}
                  >
                    {auth?.user?.name?.toUpperCase()}
                  </a>
                  <NavLink
                    className="dropdown-item"
                    style={{ color: "#000000", backgroundColor: "#ffff" }}
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    className="dropdown-item"
                    style={{ color: "#000000", backgroundColor: "#ffff" }}
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
