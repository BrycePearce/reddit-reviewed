// eslint-disable-next-line import/no-named-as-default
import DOMPurify from 'dompurify';

import { RedditPostTypes } from '../../../types/reddit/Common';
import { RedditThread } from '../../../types/reddit/Thread';
import UserAvatar from '../../common/UserAvatar';

type SwipeThreadProps = {
  post: {
    data: RedditThread;
    kind: RedditPostTypes.Post;
  };
};

const SwipeThread = ({ post }: SwipeThreadProps) => {
  const sanitizedHtml = DOMPurify.sanitize(post.data.body_html);
  console.log('thread post', post);
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
        className="mx-auto"
      ></section>
    </article>
  );
};

export default SwipeThread;
