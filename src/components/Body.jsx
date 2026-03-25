import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ErrorBanner from "./common/ErrorBanner";
import { useDispatch, useSelector } from "react-redux";
import {
  API_ENDPOINTS,
  API_METHODS,
  BASE_URL,
  MESSAGE,
  MESSAGE_TYPE,
} from "../utils/constant";
import { addUser } from "../utils/slices/userSlice";
import { addBanner } from "../utils/slices/bannerSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const banner = useSelector((store) => store.banner);
  const user = useSelector((store) => store.user);
  const fetchUserProfile = async () => {
    try {
      const res = await fetch(BASE_URL + API_ENDPOINTS.PROFILE, {
        method: API_METHODS.GET,
        credentials: "include",
      });
      const json = await res.json();
      dispatch(addUser(json.data));
    } catch (error) {
      dispatch(
        addBanner({
          message: MESSAGE.GENERIC,
          messageType: MESSAGE_TYPE.ERROR,
        }),
      );
    }
  };
  useEffect(() => {
    if (!user) fetchUserProfile();
  }, []);
  return (
    <div>
      <NavBar />
      {banner.message && (
        <div className="flex justify-center">
          <ErrorBanner message={banner.message} type={banner.messageType} />
        </div>
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
