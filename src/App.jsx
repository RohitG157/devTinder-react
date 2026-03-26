import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import store from "./utils/store";
import Feed from "./components/Feed";
import AuthLayout from "./components/layouts/AuthLayout";
import PublicRoutes from "./components/layouts/PublicRoutes";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/*** Used As an guest middleware */}
              <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
              {/*** Used As an auth middleware */}
              <Route element={<AuthLayout />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
