import { useDispatch, useSelector } from "react-redux";
import {
  API_ENDPOINTS,
  API_METHODS,
  BASE_URL,
  STATUS,
} from "../utils/constant";
import { useEffect } from "react";
import { addRequests, removeRequest } from "../utils/slices/requestSlice";
import { api } from "../utils/api";

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

  const reviewRequest = async (status, _id) => {
    try {
      await api.post(BASE_URL + API_ENDPOINTS.REVIEW_REQ(status, _id));
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleReviewRequest = (status, _id) => {
    reviewRequest(status, _id);
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <p className="text-center mt-5 font-bold text-gray-600">
        No Request Found
      </p>
    );
  return (
    <div className="mt-5 mx-5 border border-gray-300 rounded-lg">
      {requests.length === 0 && (
        <p className="text-center mt-5 font-bold text-gray-600">
          No Request Found
        </p>
      )}
      {requests.length > 0 && (
        <ul className="list bg-base-100 rounded-box shadow-md p-5">
          <li className="px-4 text-lg opacity-60 tracking-wide font-bold mb-5">
            Connection Requests
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
                <button
                  className="btn btn-square btn-ghost mx-4 px-8 py-2 text-error"
                  onClick={() =>
                    handleReviewRequest(STATUS.REJECTED, fromUserId._id)
                  }
                >
                  Reject
                </button>
                <button
                  className="btn btn-square btn-ghost mx-4 px-8 py-2 text-success"
                  onClick={() =>
                    handleReviewRequest(STATUS.ACCEPTED, fromUserId._id)
                  }
                >
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
