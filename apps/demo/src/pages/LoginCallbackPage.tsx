import NotAuthenticatedLoadingPage from "./NotAuthenticatedLoadingPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "#/store";
import { setJWT } from "#/services/localStorage";
import { manager } from "#/auth/sso";

interface LocationState {
  from: {
    pathname: string;
  };
}

export default function LoginRedirectPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    manager
      .signinRedirectCallback()
      .then((user) => {
        if (user?.id_token) {
          setJWT(user.id_token);
          const { from } = (user.state as LocationState) || {
            from: { pathname: "/" },
          };
          navigate(from);
        } else {
            alert("Something went wrong, contact a assisted-migration administrator")
        }
      })
      .catch((error) => {
          alert("Something went wrong, check your connectivity or contact a assisted-migration administrator");
        console.error(error);
      });
  }, [navigate, dispatch]);

  return <NotAuthenticatedLoadingPage />;
}
