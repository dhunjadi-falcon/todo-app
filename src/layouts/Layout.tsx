import { NavLink, Outlet, useNavigate } from "react-router";
import { useLoginContext } from "../context/LoginContext";

const Layout = () => {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        <NavLink to="/"> ToDo App</NavLink>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to={isLoggedIn ? "/todo" : "/login"}>ToDO</NavLink>
          </li>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("loggedUserName");
              navigate("/");
            }}
          >
            <NavLink to="/">Logout</NavLink>
          </button>
        </ul>
      </nav>
      {!isLoggedIn && (
        <h2 style={{ color: "red", textAlign: "center" }}>
          Please login for access to ToDo page
        </h2>
      )}

      <Outlet />
    </div>
  );
};

export default Layout;
