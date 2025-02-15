import { RedditPostTypes } from '../../../types/reddit/Common';
import { RedditThread } from '../../../types/reddit/Thread';

type SwipeThreadProps = {
  post: {
    data: RedditThread;
    kind: RedditPostTypes.Post;
  };
};

const SwipeThread = ({ post }: SwipeThreadProps) => {
  return (
    <div>
      <h1>{post.data.body}</h1>
      <div>{post.kind}</div>
    </div>
  );
};

export default SwipeThread;
