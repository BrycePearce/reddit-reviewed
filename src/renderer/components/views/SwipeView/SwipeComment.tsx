import DOMPurify from 'dompurify';
import { RedditComment } from '../../../types/reddit/Comment';
import { RedditPostTypes } from '../../../types/reddit/Common';
import UserAvatar from '../../common/UserAvatar';
import { timeAgoFromEpoch } from '../../helpers/timeUtils';

type SwipeCommentProps = {
  post: {
    data: RedditComment;
    kind: RedditPostTypes.Comment;
  };
};

const SwipeComment = ({ post }: SwipeCommentProps) => {
  const sanitizedHtml = DOMPurify.sanitize(post.data.body_html);
  const postCreatedDate = new Date(post.data.created_utc * 1000);

  return (
    <article
      className="
        grid
        grid-cols-[auto_1fr]
        grid-rows-[auto_auto]
        gap-x-3
        gap-y-1
        prose
      "
    >
      <UserAvatar
        authorFullname={post.data.author_fullname}
        className="w-14 h-14 not-prose"
      />

      <header className="flex items-center gap-2">
        <div className="font-bold text-base-content">{post.data.author}</div>
        <div className="flex gap-2 text-sm">
          <div className="separator" aria-hidden="true">
            •
          </div>
          <time
            dateTime={postCreatedDate.toISOString()}
            title={postCreatedDate.toLocaleString()}
          >
            {timeAgoFromEpoch(post.data.created_utc)}
          </time>
        </div>
      </header>

      <section
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        className="col-span-1 col-start-2 row-start-2 -mt-8"
      />
    </article>
  );
};

export default SwipeComment;
