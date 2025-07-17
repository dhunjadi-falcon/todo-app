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
          <li onClick={() => navigate(isLoggedIn ? "/todo" : "/login")}>
            ToDo
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
      <Outlet />
    </div>
  );
};

export default Layout;
