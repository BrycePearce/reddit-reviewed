import { CLIENT_ID, redditCallbackUrl, redditUrls } from "../clientConstants/constants";

const { oAuth } = redditUrls;

export const loadOauthUrl = () => {
    const state = crypto.randomUUID();
    const redirectUri = encodeURIComponent(redditCallbackUrl);
    const scope = encodeURIComponent('identity history read privatemessages save');

    return oAuth(CLIENT_ID, state, redirectUri, scope);
}