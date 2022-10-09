import { Config } from '~~/src/generated/injectables';

type Injected = {
  config: Config;
};

type TokenEndpointResponse = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type UserInfosEndpointResponse = {
  username: string;
  email: string;
  id: string;
};

const ENDPOINTS = {
  TOKEN: 'https://discord.com/api/oauth2/token',
  USER_INFO: 'https://discord.com/api/users/@me'
} as const;

export default ({ config }: Injected) => {
  return {
    getToken(code: string) {
      const searchParams = new URLSearchParams();
      searchParams.append('client_id', config.discordClientId);
      searchParams.append('client_secret', config.discordClientSecret);
      searchParams.append('redirect_uri', config.discordRedirectUri);
      searchParams.append('grant_type', 'authorization_code');
      searchParams.append('scope', 'identify email');
      searchParams.append('code', code);

      return $fetch<TokenEndpointResponse>(ENDPOINTS.TOKEN, {
        method: 'POST',
        body: searchParams
      });
    },
    getUserInfos(accessToken: string) {
      return $fetch<UserInfosEndpointResponse>(ENDPOINTS.USER_INFO, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
    }
  };
};
