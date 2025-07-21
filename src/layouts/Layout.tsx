import { NavLink, Outlet, useNavigate } from "react-router";
import { useLoginContext } from "../context/LoginContext";
import "../styles/Layout.scss";
import "../styles/Home.scss";

const Layout = () => {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar">
        <ul>
          <h1>
            <NavLink to="/"> ToDo App</NavLink>
          </h1>
          {!isLoggedIn && (
            <button
              className="button-login"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
          {isLoggedIn && (
            <button
              className="home-container
              "
              onClick={() => navigate("/new")}
            >
              Add New Task
            </button>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/new">ToDO</NavLink>
              </li>
              <div className="nav-right">
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("loggedUserName");
                    navigate("/");
                  }}
                >
                  <NavLink to="/">Logout</NavLink>
                </button>
              </div>
            </>
          )}
        </ul>
      </nav>
      {!isLoggedIn && (
        <h2 style={{ color: "red", textAlign: "center" }}>
          Please login for ToDo list preview
        </h2>
      )}

      <Outlet />
    </div>
  );
};

export default Layout;
