import { redditUrls } from "../renderer/clientConstants/constants";
import { TokenResponse } from "../types";

const root = redditUrls.apiUrl;
const version = "v1";
const baseUrl = `${root}${version}`;
export const CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;

export const exchangeAuthorizationCodeForToken = async (authorizationCode: string) => {
  try {
    const response = await fetch(`${baseUrl}/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:`).toString('base64')}`,
      },
      body: new URLSearchParams({
        code: authorizationCode,
        grant_type: 'authorization_code',
        redirect_uri: import.meta.env.VITE_REDDIT_CALLBACK_URL,
      }),
    });

    if (!response.ok) {
      throw new Error(`There was a problem fetching your token. Error Status: ${response.status} ${response.statusText}`);
    }

    const tokenResponse: TokenResponse = await response.json();

    return { ...tokenResponse };
  } catch (error) {
    console.error('Failed to exchange authorization code for token:', error);
    throw error;
  }
};
