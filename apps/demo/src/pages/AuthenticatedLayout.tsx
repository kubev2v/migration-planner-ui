import { useLocation, Navigate, Outlet} from "react-router-dom";
import { getToken } from "#/services/localStorage";

export default function AuthenticatedLayout() {
    const currentUser = getToken();
    const location = useLocation();
  
    return currentUser ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  }
  