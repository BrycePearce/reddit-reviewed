// eslint-disable-next-line import/no-named-as-default
import DOMPurify from 'dompurify';

import { RedditComment } from '../../../types/reddit/Comment';
import { RedditPostTypes } from '../../../types/reddit/Common';
import UserAvatar from '../../common/UserAvatar';

type SwipeCommentProps = {
  post: {
    data: RedditComment;
    kind: RedditPostTypes.Comment;
  };
};

const SwipeComment = ({ post }: SwipeCommentProps) => {
  const sanitizedHtml = DOMPurify.sanitize(post.data.body_html);
  console.log('comment post', post);
  return (
    <article className="prose">
      <header className="flex">
        <UserAvatar
          authorFullname={post.data.author_fullname}
          className="w-14 h-14"
        />
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        className="mx-auto mt-8"
      ></section>
    </article>
  );
};

export default SwipeComment;
