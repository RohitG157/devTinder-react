import React, { useState } from "react";
import UserCard from "./UserCard";
import { API_ENDPOINTS, BASE_URL, MESSAGE } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [toastMsgObj, setToastMsgObj] = useState({ toastMsg: "", toastType: "" });
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);

  const saveProfile = async () => {
    try {
      const res = await fetch(BASE_URL + API_ENDPOINTS.UPDATE_PROFILE, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        }),
      });

      const json = await res.json();
      console.log(json.data);
      dispatch(addUser(json.data));
      setToastMsgObj({toastMsg: MESSAGE.PROFILE_UPDATE, toastType: "success"});
      setTimeout(() => {
        setToastMsgObj({ toastMsg: "", toastType: "" });
      }, 2000);
    } catch (err) {
      console.log(err);
      setToastMsgObj({toastMsg: MESSAGE.PROFILE_UPDATE_ERROR, toastType: "error"});
      setTimeout(() => {
        setToastMsgObj({ toastMsg: "", toastType: "" });
      }, 2000);
    }
  };

  const handleSaveProfile = () => {
    saveProfile();
  };
  return (
    <>
      {toastMsgObj.toastMsg && (
        <div className="toast toast-top toast-center">
          <div className={"alert alert-"+toastMsgObj.toastType+" text-white font-bold"}>
            <span>{toastMsgObj.toastMsg}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-[5%] gap-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
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
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                className="input validator"
                required
                placeholder="Age"
                min="1"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                defaultValue={gender}
                className="select appearance-none"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your bio</legend>
              <textarea
                className="textarea h-24"
                placeholder="Bio"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </fieldset>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-center p-2 mb-2 text-primary rounded-xl border border-primary cursor-default">
            Preview Pane
          </h1>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
