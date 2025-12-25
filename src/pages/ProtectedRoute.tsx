import { Navigate } from "react-router";
import { useLoginContext } from "../context/LoginContext";
import type { JSX } from "react";

type Props = { children: JSX.Element };

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useLoginContext();
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
