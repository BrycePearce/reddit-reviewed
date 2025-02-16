export type RedditThread = {
  all_awardings: any[];
  allow_live_comments?: boolean;
  approved_at_utc: any;
  approved_by: any;
  archived: boolean;
  associated_award: any;
  author: string;
  author_flair_background_color?: string;
  author_flair_css_class?: string;
  author_flair_richtext: AuthorFlairRichtext[];
  author_flair_template_id?: string;
  author_flair_text?: string;
  author_flair_text_color?: string;
  author_flair_type: string;
  author_fullname: string;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  awarders: any[];
  banned_at_utc: any;
  banned_by: any;
  body?: string;
  body_html?: string;
  can_gild: boolean;
  can_mod_post: boolean;
  category: any;
  clicked?: boolean;
  collapsed?: boolean;
  collapsed_because_crowd_control: any;
  collapsed_reason: any;
  collapsed_reason_code: any;
  comment_type: any;
  content_categories: any;
  contest_mode?: boolean;
  controversiality?: number;
  created: number;
  created_utc: number;
  crosspost_parent?: string;
  crosspost_parent_list?: CrosspostParentList[];
  discussion_type: any;
  distinguished: any;
  domain?: string;
  downs: number;
  edited: any;
  gilded: number;
  gildings: Gildings;
  hidden?: boolean;
  hide_score?: boolean;
  id: string;
  is_created_from_ads_ui?: boolean;
  is_crosspostable?: boolean;
  is_meta?: boolean;
  is_original_content?: boolean;
  is_reddit_media_domain?: boolean;
  is_robot_indexable?: boolean;
  is_self?: boolean;
  is_submitter?: boolean;
  is_video?: boolean;
  likes?: boolean;
  link_author?: string;
  link_flair_background_color?: string;
  link_flair_css_class?: string;
  link_flair_richtext?: LinkFlairRichtext[];
  link_flair_template_id?: string;
  link_flair_text?: string;
  link_flair_text_color?: string;
  link_flair_type?: string;
  link_id?: string;
  link_permalink?: string;
  link_title?: string;
  link_url?: string;
  locked: boolean;
  media?: Media;
  media_embed?: MediaEmbed;
  media_only?: boolean;
  mod_note: any;
  mod_reason_by: any;
  mod_reason_title: any;
  mod_reports: any[];
  name: string;
  no_follow: boolean;
  num_comments: number;
  num_crossposts?: number;
  num_reports: any;
  over_18: boolean;
  parent_id?: string;
  permalink: string;
  pinned?: boolean;
  post_hint?: string;
  preview?: Preview2;
  pwls?: number;
  quarantine: boolean;
  removal_reason: any;
  removed_by: any;
  removed_by_category: any;
  replies?: string;
  report_reasons: any;
  saved: boolean;
  score: number;
  score_hidden?: boolean;
  secure_media?: SecureMedia;
  secure_media_embed?: SecureMediaEmbed;
  selftext?: string;
  selftext_html: any;
  send_replies: boolean;
  spoiler?: boolean;
  stickied: boolean;
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit_subscribers?: number;
  subreddit_type: string;
  suggested_sort?: string;
  thumbnail?: string;
  thumbnail_height?: number;
  thumbnail_width?: number;
  title?: string;
  top_awarded_type: any;
  total_awards_received: number;
  treatment_tags: any[];
  unrepliable_reason: any;
  ups: number;
  upvote_ratio?: number;
  url?: string;
  url_overridden_by_dest?: string;
  user_reports: any[];
  view_count: any;
  visited?: boolean;
  wls?: number;
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
