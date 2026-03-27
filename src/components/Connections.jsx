import { useEffect } from "react";
import {
  API_ENDPOINTS,
  API_METHODS,
  BASE_URL,
  DEFAULT_PHOTO,
} from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    const res = await fetch(BASE_URL + API_ENDPOINTS.CONNECTIONS, {
      method: API_METHODS.GET,
      credentials: "include",
    });
    const json = await res.json();
    dispatch(addConnections(json.data));
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  return (
    <div className="m-5 border border-gray-300 rounded-lg">
      {connections.length === 0 && (
        <p className="text-center mt-5 font-bold text-gray-600">
          No Connection Found
        </p>
      )}
      {connections.length > 0 && (
        <ul className="list bg-base-100 rounded-box shadow-md p-5">
          <li className="px-4 text-lg opacity-60 tracking-wide font-bold">
            Connections
          </li>

          {connections.map((connection) => (
            <li
              key={connection._id}
              className="grid grid-cols-12 border-b border-b-gray-300 py-5 mb-5"
            >
              <div className="col-span-1 m-2 p-2">
                <img
                  className="size-14 rounded-full"
                  src={connection.photoUrl || DEFAULT_PHOTO}
                />
              </div>
              <div className="col-span-8">
                <div className="capitalize font-bold mb-2 text-primary">
                  {connection.firstName} {connection.lastName}
                </div>
                <div className="text-xs capitalize font-semibold opacity-60 mb-1">
                  {connection.age + ", " + connection.gender}
                </div>
                <p className="text-xs">{connection.about}</p>
              </div>
              {/* <div className="col-span-3 text-center">
                <button className="btn btn-square btn-ghost mx-4 px-8 py-2 text-error">
                  Reject
                </button>
                <button className="btn btn-square btn-ghost mx-4 px-8 py-2 text-success">
                  Accept
                </button>
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Connections;
