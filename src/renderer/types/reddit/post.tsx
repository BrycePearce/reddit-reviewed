export type RedditPost = {
  subreddit_id: string;
  approved_at_utc: any;
  author_is_blocked: boolean;
  comment_type: any;
  link_title?: string;
  mod_reason_by: any;
  banned_by: any;
  ups: number;
  num_reports: any;
  author_flair_type: string;
  total_awards_received: number;
  subreddit: string;
  link_author?: string;
  likes?: boolean;
  replies?: string;
  user_reports: any[];
  saved: boolean;
  id: string;
  banned_at_utc: any;
  mod_reason_title: any;
  gilded: number;
  archived: boolean;
  collapsed_reason_code: any;
  no_follow: boolean;
  author: string;
  num_comments: number;
  can_mod_post: boolean;
  send_replies: boolean;
  parent_id?: string;
  score: number;
  author_fullname: string;
  over_18: boolean;
  report_reasons: any;
  removal_reason: any;
  approved_by: any;
  controversiality?: number;
  body?: string;
  edited: any;
  top_awarded_type: any;
  downs: number;
  author_flair_css_class?: string;
  is_submitter?: boolean;
  collapsed?: boolean;
  author_flair_richtext: AuthorFlairRichtext[];
  author_patreon_flair: boolean;
  body_html?: string;
  gildings: Gildings;
  collapsed_reason: any;
  distinguished: any;
  associated_award: any;
  stickied: boolean;
  author_premium: boolean;
  can_gild: boolean;
  link_id?: string;
  unrepliable_reason: any;
  author_flair_text_color?: string;
  score_hidden?: boolean;
  permalink: string;
  subreddit_type: string;
  link_permalink?: string;
  name: string;
  author_flair_template_id?: string;
  subreddit_name_prefixed: string;
  author_flair_text?: string;
  treatment_tags: any[];
  created: number;
  created_utc: number;
  awarders: any[];
  all_awardings: any[];
  locked: boolean;
  author_flair_background_color?: string;
  collapsed_because_crowd_control: any;
  mod_reports: any[];
  quarantine: boolean;
  mod_note: any;
  link_url?: string;
  selftext?: string;
  clicked?: boolean;
  title?: string;
  link_flair_richtext?: LinkFlairRichtext[];
  hidden?: boolean;
  pwls?: number;
  link_flair_css_class?: string;
  thumbnail_height?: number;
  hide_score?: boolean;
  link_flair_text_color?: string;
  upvote_ratio?: number;
  media_embed?: MediaEmbed;
  thumbnail_width?: number;
  is_original_content?: boolean;
  secure_media?: SecureMedia;
  is_reddit_media_domain?: boolean;
  is_meta?: boolean;
  category: any;
  secure_media_embed?: SecureMediaEmbed;
  link_flair_text?: string;
  is_created_from_ads_ui?: boolean;
  thumbnail?: string;
  post_hint?: string;
  content_categories: any;
  is_self?: boolean;
  crosspost_parent_list?: CrosspostParentList[];
  link_flair_type?: string;
  wls?: number;
  removed_by_category: any;
  domain?: string;
  allow_live_comments?: boolean;
  selftext_html: any;
  suggested_sort?: string;
  url_overridden_by_dest?: string;
  view_count: any;
  is_crosspostable?: boolean;
  pinned?: boolean;
  preview?: Preview2;
  media_only?: boolean;
  link_flair_template_id?: string;
  spoiler?: boolean;
  visited?: boolean;
  removed_by: any;
  link_flair_background_color?: string;
  is_robot_indexable?: boolean;
  discussion_type: any;
  contest_mode?: boolean;
  crosspost_parent?: string;
  url?: string;
  subreddit_subscribers?: number;
  num_crossposts?: number;
  media?: Media;
  is_video?: boolean;
};

export type AuthorFlairRichtext = {
  e: string;
  t?: string;
  a?: string;
  u?: string;
};

export type Gildings = {};

export type LinkFlairRichtext = {
  a?: string;
  e: string;
  u?: string;
  t?: string;
};

export type MediaEmbed = {};

export type SecureMedia = {
  reddit_video: RedditVideo;
};

export type RedditVideo = {
  bitrate_kbps: number;
  fallback_url: string;
  has_audio: boolean;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
};

export type SecureMediaEmbed = {};

export type CrosspostParentList = {
  approved_at_utc: any;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: any;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: any[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: any;
  link_flair_css_class: any;
  downs: number;
  thumbnail_height: number;
  top_awarded_type: any;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color: any;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: MediaEmbed2;
  thumbnail_width: number;
  author_flair_template_id: any;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: any;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: any;
  secure_media_embed: SecureMediaEmbed2;
  link_flair_text: any;
  can_mod_post: boolean;
  score: number;
  approved_by: any;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class: any;
  author_flair_richtext: any[];
  gildings: Gildings2;
  post_hint: string;
  content_categories: any;
  is_self: boolean;
  mod_note: any;
  created: number;
  link_flair_type: string;
  wls: any;
  removed_by_category: any;
  banned_by: any;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html: any;
  likes: any;
  suggested_sort: any;
  banned_at_utc: any;
  url_overridden_by_dest: string;
  view_count: any;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: Preview;
  all_awardings: any[];
  awarders: any[];
  media_only: boolean;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: any;
  treatment_tags: any[];
  visited: boolean;
  removed_by: any;
  num_reports: any;
  distinguished: any;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by: any;
  removal_reason: any;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: any;
  author: string;
  discussion_type: any;
  num_comments: number;
  send_replies: boolean;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: any;
  permalink: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: any;
  is_video: boolean;
};

export type Preview2 = {
  images: Image2[];
  enabled: boolean;
};

export interface Image2 {
  source: Source2;
  resolutions: Resolution2[];
  variants: Variants2;
  id: string;
}

export type Source2 = {
  url: string;
  width: number;
  height: number;
};
export type Resolution2 = {
  url: string;
  width: number;
  height: number;
};

export type Variants2 = {};

export type Media = {
  reddit_video: RedditVideo2;
};

export type RedditVideo2 = {
  bitrate_kbps: number;
  fallback_url: string;
  has_audio: boolean;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
};

export interface MediaEmbed2 {}

export interface SecureMediaEmbed2 {}

export interface Gildings2 {}

export interface Preview {
  images: Image[];
  enabled: boolean;
}

export interface Image {
  source: Source;
  resolutions: Resolution[];
  variants: Variants;
  id: string;
}

export interface Source {
  url: string;
  width: number;
  height: number;
}

export interface Resolution {
  url: string;
  width: number;
  height: number;
}

export interface Variants {}
