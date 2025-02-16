export const CLIENT_ID = 'uhNfvEcSB48xRG6f535_vA'
export const redditCallbackUrl = "redditSaved://callback"

export const queryKeys = {
    userInfo: 'userInfo',
    savedPosts: (userToken?: string) => ['savedPosts', userToken],
    userAvatar: (userId: string) => ['userAvatar', userId] // for user_data_by_account_ids endpoint
}