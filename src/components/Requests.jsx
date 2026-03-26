import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS, API_METHODS, BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { addRequests } from "../utils/slices/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    const res = await fetch(BASE_URL + API_ENDPOINTS.CONNECTIONS, {
      method: API_METHODS.GET,
      credentials: "include",
    });
    const json = await res.json();
    dispatch(addRequests(json.data));
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  return (
    <div className="mt-5">
      {requests.length === 0 && (
        <p className="text-center mt-5 font-bold text-gray-600">
          No Request Found
        </p>
      )}
      {requests.length > 0 && (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="px-4 text-xs opacity-60 tracking-wide font-bold">
            Requests
          </li>

          {requests.map(({ fromUserId }) => (
            <li
              key={fromUserId._id}
              className="grid grid-cols-12 border-b border-b-gray-300 py-5 mb-5"
            >
              <div className="col-span-1 m-2 p-2">
                <img
                  className="size-14 rounded-full"
                  src={fromUserId.photoUrl || DEFAULT_PHOTO}
                />
              </div>
              <div className="col-span-8">
                <div className="capitalize font-bold mb-2 text-primary">
                  {fromUserId.firstName} {fromUserId.lastName}
                </div>
                <div className="text-xs capitalize font-semibold opacity-60 mb-1">
                  {fromUserId.age + ", " + fromUserId.gender}
                </div>
                <p className="text-xs">{fromUserId.about}</p>
              </div>
              <div className="col-span-3 text-center">
                <button className="btn btn-square btn-ghost mx-4 px-8 py-2 text-error">
                  Reject
                </button>
                <button className="btn btn-square btn-ghost mx-4 px-8 py-2 text-success">
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requests;
