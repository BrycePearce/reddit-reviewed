import ky from 'ky';

import { useAuth } from '../context/AuthContext';

import type { Options } from 'ky';
import type { TokenResponse } from 'src/types';

// wraps ky with Reddit auth token refresh
export const useAuthFetch = () => {
  const { authState, setAuthState, logout } = useAuth();

  const refreshAuthToken = async () => {
    try {
      const refreshedTokens: TokenResponse = await ky
        .post('https://www.reddit.com/api/v1/access_token', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString('base64')}`,
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: authState.refresh_token,
          }).toString(),
        })
        .json();

      setAuthState({
        ...authState,
        access_token: refreshedTokens.access_token,
        refresh_token: refreshedTokens.refresh_token || authState.refresh_token,
      });

      return refreshedTokens.access_token;
    } catch (error) {
      console.error('Failed to refresh token. Logging out.\n\n', error);
      logout();
      throw error;
    }
  };

  const authenticatedFetch = async <T = unknown,>(
    url: string,
    options: Options = {}
  ): Promise<T> => {
    try {
      return await ky(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${authState.access_token}`,
        },
      }).json<T>();
    } catch (error: any) {
      // If the request is unauthorized (401), try refreshing the token
      if (error?.response?.status === 401) {
        const newAccessToken = await refreshAuthToken();
        return await ky(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        }).json<T>();
      }
      throw error;
    }
  };

  return { authenticatedFetch };
};
