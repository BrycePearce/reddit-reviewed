import { RedditComment } from '../../../types/reddit/Comment';
import { RedditPostTypes } from '../../../types/reddit/Common';

type SwipeCommentProps = {
  post: {
    data: RedditComment;
    kind: RedditPostTypes.Comment;
  };
};

const SwipeComment = ({ post }: SwipeCommentProps) => {
  return (
    <div>
      <h1>{post.data.body}</h1>
      <div>{post.kind}</div>
    </div>
  );
};

export default SwipeComment;
