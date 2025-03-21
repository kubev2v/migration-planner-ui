import React from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

declare global {
  interface Window {
    ocmConfig?: {
      configData?: {
        apiGateway?: string;
      };
    };
  }
}

const getBaseUrl = (): string =>
  window.ocmConfig?.configData?.apiGateway || 'https://api.openshift.com';

export type AccountsAccessToken = {
  auths: {
    [domain: string]: {
      auth: string;
      email?: string;
    };
  };
};

export type OCMErrorResponse = {
  kind: string;
  id: string;
  href: string;
  code: string;
  reason?: string;
};

export function objectIsAccessToken(
  obj: AccountsAccessToken | OCMErrorResponse
): obj is AccountsAccessToken {
  return 'auths' in obj;
}

// Hook para obtener el token de acceso
export function useAccountsAccessToken(): {
  accessToken: string | undefined;
} {
  const [accessToken, setAccessToken] = React.useState<string | undefined>(undefined);
  const { auth } = useChrome();

  React.useEffect(() => {
    async function getToken(): Promise<void> {
      try {
        const bearerToken = await auth.getToken(); // Get Bearer Token
        if (bearerToken) {
          const result = await fetchAccessToken(bearerToken);
          if (objectIsAccessToken(result)) {
            // If response is ok, get the token
            const firstDomain = Object.keys(result.auths)[0];
            setAccessToken(result.auths[firstDomain].auth);
          }
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
        setAccessToken('test token');
      }
    }

    getToken();
  }, [auth]);

  return { accessToken };
}

// Function to get the token from OpenShift API
async function fetchAccessToken(bearerToken: string): Promise<AccountsAccessToken | OCMErrorResponse> {
  const response = await fetch(`${getBaseUrl()}/api/accounts_mgmt/v1/access_token`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return response.json() as Promise<AccountsAccessToken | OCMErrorResponse>;
}
