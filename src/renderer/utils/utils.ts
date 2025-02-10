import { CLIENT_ID, redditCallbackUrl } from "../clientConstants/constants";

export const loadOauthUrl = () => {
    const state = crypto.randomUUID();
    const redirectUri = encodeURIComponent(redditCallbackUrl);
    const scope = encodeURIComponent('identity history');
    return `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirectUri}&scope=${scope}&duration=permanent`
}