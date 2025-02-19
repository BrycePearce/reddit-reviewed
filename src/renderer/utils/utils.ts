import { CLIENT_ID, redditCallbackUrl, redditUrls } from "../clientConstants/constants";

const { oAuth } = redditUrls;

export const loadOauthUrl = () => {
    const state = crypto.randomUUID();
    const redirectUri = encodeURIComponent(redditCallbackUrl);
    const scope = encodeURIComponent('identity history read privatemessages');
    // `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirectUri}&scope=${scope}&duration=permanent`
    return oAuth(CLIENT_ID, state, redirectUri, scope);
}