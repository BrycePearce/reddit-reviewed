import type { RedditPost } from './post';

export type Root = {
  kind: 'Listing';
  data: ResponseMetadata;
};

export type ResponseMetadata = {
  after: string;
  before: any;
  children: Children[];
  dist: number;
  geo_filter: string;
  modhash: any;
};

export type Children = {
  kind: string;
  data: RedditPost[];
};
