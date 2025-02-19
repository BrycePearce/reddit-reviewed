import SwipeComment from './SwipeComment';
import SwipeThread from './SwipeThread';
import { usePostsContext } from '../../../context/PostsContext';
import { RedditPostTypes } from '../../../types/reddit/Common';

type SwipeViewProps = {
  swipeViewContainerRef: React.RefObject<HTMLDivElement>;
};

export const SwipeView = ({ swipeViewContainerRef }: SwipeViewProps) => {
  const { randomPost } = usePostsContext();
  const { currentPost, isLoading } = randomPost;

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col gap-4 w-52">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full skeleton shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="w-20 h-4 skeleton"></div>
              <div className="h-4 skeleton w-28"></div>
            </div>
          </div>
          <div className="w-full h-32 skeleton"></div>
        </div>
      </div>
    );
  }

  if (currentPost.kind === RedditPostTypes.Post) {
    return <SwipeThread post={currentPost} />;
  }

  if (currentPost.kind === RedditPostTypes.Comment) {
    return (
      <SwipeComment
        post={currentPost}
        swipeViewContainerRef={swipeViewContainerRef}
      />
    );
  }

  return (
    <div>Boy howdy somethin went wrong I tell ya a somethin went wrong</div>
  );
};
