import { useEffect } from "react";
import UserCard from "./UserCard";
import { API_ENDPOINTS, API_METHODS, BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);
  const fetchFeeds = async () => {
    const res = await fetch(BASE_URL + API_ENDPOINTS.FEED, {
      method: API_METHODS.GET,
      credentials: "include",
    });
    const json = await res.json();
    console.log(json.data);
    dispatch(addFeed(json.data));
  };
  useEffect(() => {
    if (!feeds) fetchFeeds();
  }, []);
  return (
    <div className="flex justify-center mt-[5%]">
      {feeds && <UserCard user={feeds[0]} />}
    </div>
  );
};

export default Feed;
