import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import store from "./utils/store";
import Feed from "./components/Feed";
import AuthLayout from "./components/layouts/AuthLayout";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              {/*** Used As an middleware */}
              <Route element={<AuthLayout />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
