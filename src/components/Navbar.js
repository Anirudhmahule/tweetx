import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState(getActiveTab(location.pathname));

  function getActiveTab(pathname) {
    if (pathname === "/") return "feed";
    return pathname.substring(1);
  }

  const handleActive = (tab) => {
    setActive(tab);
  };

  return (
    <div className="h-16 w-full flex flex-row bg-white shadow-gray-200 shadow-md">
      <Link to="/" className="text-2xl font-bold text-primary py-4 px-16">
        TweetX
      </Link>
      <nav>
        <ul className="flex flex-row absolute top-4 right-80 text-xl font-bold gap-x-10">
          <li>
            <Link
              to="/"
              className={`${
                active === "feed" ? "text-primary" : "text-gray-300"
              }`}
              onClick={() => handleActive("feed")}
            >
              Feed
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`py-6 ${
                active === "users" ? "text-primary" : "text-gray-300"
              }`}
              onClick={() => handleActive("users")}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`${
                active === "profile" ? "text-primary" : "text-gray-300"
              }`}
              onClick={() => handleActive("profile")}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
