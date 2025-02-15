import { useRandomPost } from '../../../hooks/useRandomPost';

export const ListPosts = () => {
  const { currentPost, isLoading } = useRandomPost();
  //  switch (item.kind) {
  //    case RedditKind.Post: // t3
  //      return <PostCard post={item.data} />;
  //    case RedditKind.Comment: // t1
  //      return <CommentCard comment={item.data} />;
  //    default:
  //      return null; // or fallback
  //  }

  if (isLoading)
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

  return <div>{currentPost.data.link_title}</div>;
};
