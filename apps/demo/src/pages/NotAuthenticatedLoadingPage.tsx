import { Bullseye } from "@patternfly/react-core";

export default function NotAuthenticatedLoadingPage() {
  return (
    <div style={{ height: "100vh" }}>
      <Bullseye>
        :(
      </Bullseye>
    </div>
  );
}
