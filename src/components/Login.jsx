import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router";
import {
  API_ENDPOINTS,
  API_METHODS,
  BASE_URL,
  MESSAGE_TYPE,
} from "../utils/constant";
import { addBanner, hideBanner } from "../utils/slices/bannerSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      const result = await fetch(BASE_URL + API_ENDPOINTS.LOGIN, {
        method: API_METHODS.POST,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId,
          password,
        }),
      });

      const json = await result.json();
      dispatch(addUser(json.data));
      navigate("/");
    } catch (error) {
      dispatch(
        addBanner({
          message: "Please try again later.",
          messageType: MESSAGE_TYPE.ERROR,
        }),
      );
      console.log(error);
      console.error(error);
    }
  };
  const handleSignIn = () => {
    dispatch(hideBanner());
    signIn();
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm my-[5%]">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign in</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Address</legend>
            <input
              type="email"
              className="input"
              placeholder="Email Address"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Password"
              password={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
