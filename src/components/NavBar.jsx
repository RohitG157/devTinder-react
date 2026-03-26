import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  API_ENDPOINTS,
  API_METHODS,
  BASE_URL,
  DEFAULT_PHOTO,
} from "../utils/constant";
import { removeUser } from "../utils/slices/userSlice";
import { removeFeed } from "../utils/slices/feedSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const logOut = async () => {
    try {
      await fetch(BASE_URL + API_ENDPOINTS.LOGOUT, {
        method: API_METHODS.POST,
        credentials: "include",
      });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogOut = () => {
    logOut();
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <p className="capitalize text-gray-500 font-semibold">Welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl || DEFAULT_PHOTO}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
							<li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <p onClick={handleLogOut}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
