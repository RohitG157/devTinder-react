export const BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  PROFILE: "/profile/view",
  LOGOUT: "/logout",
  REGISTER: "/signup",
  FEED: "/feed",
  UPDATE_PROFILE: "/profile/edit",
  CONNECTIONS: "/user/connections",
  REVIEW_REQ: (status, _id) => `/request/review/${status}/${_id}`,
};
export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
};
export const MESSAGE_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
};

export const MESSAGE = {
  GENERIC: "Please try again later.",
  PROFILE_UPDATE: "Your changes have been saved  🎉",
  PROFILE_UPDATE_ERROR: "Failed to update profile 	 ❌",
};

export const STATIC_TEXT = {
  LOGIN: "Sign In",
  REGISTER: "Create Account",
  LOGIN_CTA: "Sign In",
  REGISTER_CTA: "Create an account",
};

export const STATUS = {
  REJECTED: "rejected",
  ACCEPTED: "accepted",
};
export const DEFAULT_PHOTO =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
