export const CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
export const redditCallbackUrl = import.meta.env.VITE_REDDIT_CALLBACK_URL;

export const queryKeys = {
    userInfo: 'userInfo',
    savedPosts: (userToken?: string) => ['savedPosts', userToken],
    userAvatar: (userId: string) => ['userAvatar', userId] // for user_data_by_account_ids endpoint
}

export const redditUrls = {
    accessTokenUrl: 'https://www.reddit.com/api/v1/access_token',
    apiUrl: 'https://www.reddit.com/api/',
    me: 'https://oauth.reddit.com/api/v1/me',
    oAuth: (CLIENT_ID: string, state: string, redirectUri: string, scope: string) => `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirectUri}&scope=${scope}&duration=permanent`,
    postPermalink: (permalink: string) => `https://reddit.com${permalink}`,
    savedPosts: (username: string, params: URLSearchParams) => `https://oauth.reddit.com/user/${username}/saved?${params}`,
    userDataByAccountIds: (userId: string) => `https://oauth.reddit.com/api/user_data_by_account_ids?ids=${userId}`,
    userProfile: (username: string) => `https://reddit.com/user/${username}`
};