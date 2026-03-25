import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const user = useSelector((store) => store.user);

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PublicRoutes;
