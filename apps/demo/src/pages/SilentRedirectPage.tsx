import { useEffect } from "react";
import { manager } from "../auth/sso";

export default function SilentRedirectPage() {
  useEffect(() => {
    manager.signinSilentCallback();
  }, []);

  return <></>;
}
