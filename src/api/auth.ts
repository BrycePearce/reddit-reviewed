import type { TokenResponse } from "src/types";

const root = "https://www.reddit.com/api/";
const version = "v1";
const baseUrl = `${root}${version}`;

export const exchangeAuthorizationCodeForToken = async (authorizationCode: string) => {
  try {
    const response = await fetch(`${baseUrl}/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`uhNfvEcSB48xRG6f535_vA:`).toString('base64')}`,
      },
      body: new URLSearchParams({
        code: authorizationCode,
        grant_type: 'authorization_code',
        redirect_uri: 'redditSaved://callback',
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
