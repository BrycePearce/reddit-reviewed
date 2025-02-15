import type { RedditComment } from './Comment';
import type { RedditThread } from './Thread';

export enum RedditPostTypes {
  Comment = 't1',
  User = 't2',
  Post = 't3', // I could rename this to RedditInteractionTypes, but post is more clear so I'll deal with the double post name weirdness
  Message = 't4',
  Subreddit = 't5',
  Award = 't6',
}

export type RedditPostResponse = {
  kind: 'Listing';
  data: ResponseMetadata;
};

export type ResponseMetadata = {
  after: string | null; // next page of data
  before: string | null; // previous
  children: Post[]; // interactions (threads/comments)
  dist: number;
  geo_filter: string;
  modhash: string;
};

export type Post =
  | {
      kind: RedditPostTypes.Post;
      data: RedditThread;
    }
  | {
      kind: RedditPostTypes.Comment;
      data: RedditComment;
    };
