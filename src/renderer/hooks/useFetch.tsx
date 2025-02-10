import ky from 'ky';

import { useAuth } from '../context/AuthContext';

import type { Options } from 'ky';
import type { TokenResponse } from 'src/types';

export const useKyApi = () => {
  const { authState, setAuthState } = useAuth();
  const refreshAuthToken = async () => {
    try {
      const refreshedTokens: TokenResponse = await ky
        .post('https://www.reddit.com/api/v1/access_token', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Basic Auth header. Client ID and Client Secret should be part of your environment variables or config
            Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
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
        // Update other parts of authState as necessary
        refresh_token: refreshedTokens.refresh_token || authState.refresh_token, // Some APIs might not return a new refresh token
      });

      return refreshedTokens.access_token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error; // Consider how you want to handle failures here. You might want to clear authState and redirect to login.
    }
  };

  const fetchData = async (url: string, options: Options = {}) => {
    try {
      return await ky(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${authState.access_token}`,
        },
      }).json();
    } catch (error) {
      if (error.response?.status === 401) {
        // Token expired, try to refresh it
        const newAccessToken = await refreshAuthToken();
        // Retry the request with the new token
        return await ky(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        }).json();
      } else {
        console.error('API call failed:', error);
        throw error;
      }
    }
  };

  return { fetchData };
};
