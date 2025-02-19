// eslint-disable-next-line import/no-named-as-default
import DOMPurify from 'dompurify';

import { RedditComment } from '../../../types/reddit/Comment';
import { RedditPostTypes } from '../../../types/reddit/Common';
import UserAvatar from '../../common/UserAvatar';
import { timeAgoFromEpoch } from '../../helpers/timeUtils';
import LinkIcon from '../../icons/LinkIcon';
import { motion } from 'framer-motion';
import { useSettingsContext } from '../../../context/UserSettingsContext';

type SwipeCommentProps = {
  post: {
    data: RedditComment;
    kind: RedditPostTypes.Comment;
  };
  swipeViewContainerRef: React.RefObject<HTMLDivElement>;
};

const SwipeComment = ({ post, swipeViewContainerRef }: SwipeCommentProps) => {
  const { isSwipeMode } = useSettingsContext();
  const sanitizedHtml = DOMPurify.sanitize(post.data.body_html);
  const postCreatedDate = new Date(post.data.created_utc * 1000);
  return (
    <motion.article
      drag={isSwipeMode}
      dragConstraints={swipeViewContainerRef}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.2}
      dragMomentum={false}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        type: 'spring',
        damping: 20,
        stiffness: 300,
      }}
      {...(isSwipeMode && {
        whileDrag: { scale: 1.02, zIndex: 1 },
        whileTap: { cursor: 'grabbing' },
      })}
      // This ensures the component returns to its original position
      dragSnapToOrigin={true}
      className="
        grid
        grid-cols-[auto_1fr]
        grid-rows-[auto_auto]
        gap-x-3
        gap-y-1
      "
    >
      <UserAvatar
        authorFullname={post.data.author_fullname}
        className="w-14 h-14"
      />

      <header className="flex items-center gap-2">
        <div className="font-bold text-base-content">{post.data.author}</div>
        <div className="flex items-center gap-2 text-sm">
          <div aria-hidden="true" className="separator">
            •
          </div>
          <time
            dateTime={postCreatedDate.toISOString()}
            title={postCreatedDate.toLocaleString()}
          >
            {timeAgoFromEpoch(post.data.created_utc)}
          </time>

          <a
            aria-label="Open comment in Reddit"
            className="z-10 inline-flex items-center link link-secondary hover:link-primary"
            href={`https://reddit.com${post.data.permalink}`}
            rel="noopener noreferrer"
            target="_blank"
            title="Open comment in Reddit"
          >
            <LinkIcon className="w-4 h-4" />
          </a>
        </div>
      </header>

      <section
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        className="col-span-1 col-start-2 row-start-2 -mt-10 prose"
      />
    </motion.article>
  );
};

export default SwipeComment;
