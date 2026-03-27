import { useDispatch } from "react-redux";
import { api } from "../utils/api";
import { API_ENDPOINTS, BASE_URL, STATUS } from "../utils/constant";
import { removeFeed } from "../utils/slices/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const reviewConnection = async (status, _id) => {
    try {
      const res = await api.post(
        BASE_URL + API_ENDPOINTS.REVIEW_CONNECTION(status, _id),
      );

      const json = res.json();
      dispatch(removeFeed(_id));
    } catch (error) {}
  };
  const handleReviewConnections = (status, _id) => {
    reviewConnection(status, _id);
  };
  if (!user) return <p>Feed is empty. </p>;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-md font-bold capitalize">
          {user?.firstName + " " + user?.lastName}
        </h2>

        <p className="text-gray-600">
          {user.age && (
            <span className="text-xs font-bold">
              {user.age + " years" + (user.gender && ", ")}
            </span>
          )}
          {user.gender && (
            <span className="text-xs font-bold capitalize">{user.gender}</span>
          )}
        </p>

        <p className="text-gray-600">{user.about}</p>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-ghost"
            onClick={() => handleReviewConnections(STATUS.IGNORED, user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleReviewConnections(STATUS.INTERESTED, user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
