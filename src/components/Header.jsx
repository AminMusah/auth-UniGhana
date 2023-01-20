import { useState, useContext } from "react";
import TimeLineIcon from "remixicon-react/TimeLineIcon";
import Menu2LineIcon from "remixicon-react/Menu2LineIcon";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  let { isAuth,setIsAuth } = useContext(UserContext);

  const [openMenu, setOpenMenu] = useState(false);

  const menuOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuth(false)
    localStorage.removeItem("isAuth", isAuth);

    window.location.replace("/login");
  };

  return (
    <header className="absolute top-0 w-full z-4">
      <div className="flex bg-blue justify-between text-green px-4 w-full">
        <div className="flex items-center justify-between py-5 w-full">
          <Link to="/dashboard" className="font-bold">
            <h3>UniGhana</h3>
          </Link>

          <nav
            className={`sm:flex transition-all duration-1000 ${
              openMenu ? "flex items-center" : " hidden"
            }`}
          >
            <ul className="fixed sm:static top-16 h-full w-8/12 sm:top-0 right-0 flex flex-between items-start flex-col sm:flex-row sm:w-1/3 text-green p-6 z-10 transform transition-all duration-1000 bg-blue">
             
              {isAuth ? (
                <div className="sm:flex">
                
                  <li>
                    <Link to="/dashboard" className="text-green sm:ml-7" onClick={ () => setOpenMenu(!openMenu)
}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button className="text-green sm:ml-7" onClick={handleLogout}>
                      logout
                    </button>
                  </li>
                </div>
              ) : (
                <div className="sm:flex">
                         <li>
                <Link to="/" className="text-green sm:ml-7">
                  Home
                </Link>
              </li>
                  <li>
                    
                    <Link to="/register" className="text-green sm:ml-7">
                      Register
                    </Link>
                  </li>

                  <li>
                    <Link to="/login" className="text-green sm:ml-7">
                      Login
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </nav>

          <button className="nav-open-btn sm:hidden" onClick={menuOpen}>
            <Menu2LineIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
