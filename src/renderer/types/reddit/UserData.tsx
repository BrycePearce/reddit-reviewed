export type UserData = {
  [userId: string]: UserInfo;
};

export type UserInfo = {
  comment_karma: number;
  created_utc: number;
  link_karma: number;
  name: string;
  profile_color: string;
  profile_img: string;
  profile_over_18: boolean;
};
