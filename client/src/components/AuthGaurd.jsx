import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/* -------- PRIVATE ROUTE -------- */
export function Private() {
  const { currentUser, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

/* -------- PUBLIC ROUTE -------- */
export function Public() {
  const { currentUser, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return currentUser ? <Navigate to="/profile" replace /> : <Outlet />;
}
