import {
    Button,
    ListItem,
    ListVariant,
    LoginFooterItem,
    LoginPage,
  } from "@patternfly/react-core";
  import { manager, SSOUrl } from "#/auth/sso";
  import { useLocation } from "react-router-dom";
  
  export default function MLoginPage() {
    const location = useLocation();
    return (
      <LoginPage
        footerListVariants={ListVariant.inline}
        footerListItems={
          <ListItem>
            <LoginFooterItem
              target="_blank"
              rel="noopener noreferrer"
            >
              See the documentation
            </LoginFooterItem>
          </ListItem>
        }
        loginTitle="Log in to your account"
        loginSubtitle="To continue on Assited migration you need to log in using your Red Hat account. Click on the Log in button to be redirected to the Red Hat login page."
      >
        <Button
          variant="danger"
          onClick={() => {
            manager.signinRedirect({ state: location.state }).catch(() => {
              alert(
                  `We are sorry! We can't connect to ${SSOUrl}. Can you try later ?`,
                );
            });
          }}
        >
          Log in using Red Hat SSO
        </Button>
      </LoginPage>
    );
  }
  