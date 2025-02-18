export const CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
export const redditCallbackUrl = import.meta.env.VITE_REDDIT_CALLBACK_URL;

export const queryKeys = {
    userInfo: 'userInfo',
    savedPosts: (userToken?: string) => ['savedPosts', userToken],
    userAvatar: (userId: string) => ['userAvatar', userId] // for user_data_by_account_ids endpoint
}