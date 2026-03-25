import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router";
import {
  API_ENDPOINTS,
  API_METHODS,
  BASE_URL,
  MESSAGE,
  MESSAGE_TYPE,
  STATIC_TEXT,
} from "../utils/constant";
import { addBanner, hideBanner } from "../utils/slices/bannerSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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

      const data = await result.json();
      dispatch(addUser(data));
      navigate("/");
    } catch (error) {
      dispatch(
        addBanner({
          message: MESSAGE.GENERIC,
          messageType: MESSAGE_TYPE.ERROR,
        }),
      );
      console.log(error);
    }
  };

  const signUp = async () => {
    try {
      const result = await fetch(BASE_URL + API_ENDPOINTS.REGISTER, {
        method: API_METHODS.POST,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId,
          password,
          firstName,
          lastName,
        }),
      });

      const json = await result.json();
      dispatch(addUser(json.data));
      navigate("/");
    } catch (error) {
      dispatch(
        addBanner({
          message: MESSAGE.GENERIC,
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

  const handleSignUp = () => {
    signUp();
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm my-[5%]">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? STATIC_TEXT.LOGIN : STATIC_TEXT.REGISTER}
          </h2>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
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
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleSignIn : handleSignUp}
            >
              {isLoginForm ? STATIC_TEXT.LOGIN : STATIC_TEXT.REGISTER}
            </button>
          </div>
          <button
            className="btn btn-ghost btn-primary"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? STATIC_TEXT.REGISTER_CTA : STATIC_TEXT.LOGIN_CTA}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
