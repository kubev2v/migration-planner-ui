import { UserManager } from "oidc-client-ts";

export const SSOUrl = process.env.REACT_APP_SSO_URL || "https://sso.redhat.com";
const SSORealm = process.env.REACT_APP_SSO_REALM || "redhat-external";
const SSOClientId = process.env.REACT_APP_SSO_CLIENT_ID || "6e36b417-c881-419e-9a33-392b670ae792"
const SSOScope = (process.env.REACT_APP_SSO_SCOPE || "openid,id.username,id.sub,id.organization,id.email,id.company_name ")
  .split(",")
  .join(" ");

const origin = window.location.origin;
const settings = {
  authority: `${SSOUrl}/auth/realms/${SSORealm}`,
  client_id: SSOClientId,
  redirect_uri: `${origin}/login_callback`,
  post_logout_redirect_uri: `${origin}/login`,
  silent_redirect_uri: `${origin}/silent_redirect`,
  response_type: "code",
  automaticSilentRenew: true,
  scope: SSOScope,
};

export const manager = new UserManager(settings);
