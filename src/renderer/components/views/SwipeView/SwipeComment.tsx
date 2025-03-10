// eslint-disable-next-line import/no-named-as-default
import DOMPurify from 'dompurify';

import { RedditComment } from '../../../types/reddit/Comment';
import { RedditPostTypes } from '../../../types/reddit/Common';
import UserAvatar from '../../common/UserAvatar';
import { timeAgoFromEpoch } from '../../helpers/timeUtils';
import LinkIcon from '../../icons/LinkIcon';
import { motion } from 'framer-motion';
import { useSettingsContext } from '../../../context/UserSettingsContext';
import { redditUrls } from '../../../clientConstants/constants';
import { useSanitizedHtml } from '../../../hooks/useSanitizedHtml';
import type { OnMotionEvent } from '../../../types/motion/motion';

type SwipeCommentProps = {
  post: {
    data: RedditComment;
    kind: RedditPostTypes.Comment;
  };
  swipeViewContainerRef: React.RefObject<HTMLDivElement>;
  onMotionStart?: ({ event, info }: OnMotionEvent) => void;
  onMotionEnd?: ({ event, info }: OnMotionEvent) => void;
};

const SwipeComment = ({
  post,
  swipeViewContainerRef,
  onMotionEnd,
  onMotionStart,
}: SwipeCommentProps) => {
  const { isSwipeMode } = useSettingsContext();
  const postCreatedDate = new Date(post.data.created_utc * 1000);
  const { postPermalink, userProfile } = redditUrls;
  const sanitizedContent = useSanitizedHtml(post.data.body_html);

  return (
    <>
      <motion.article
        drag={isSwipeMode}
        onDragStart={(event, info) => onMotionStart?.({ event, info })}
        onDragEnd={(event, info) => onMotionEnd?.({ event, info })}
        dragConstraints={swipeViewContainerRef}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.2}
        dragMomentum={false}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          x: '-100%',
          opacity: 0,
          transition: { duration: 0.3 },
        }}
        transition={{
          duration: 0.3,
          type: 'spring',
          damping: 20,
        }}
        {...(isSwipeMode && {
          whileDrag: { scale: 1.02, zIndex: 1 },
          whileTap: { cursor: 'grabbing' },
        })}
        // This ensures the component returns to its original position
        dragSnapToOrigin={true}
        className={`
          grid
          grid-cols-[auto_1fr]
          grid-rows-[auto_auto]
          gap-x-3
          gap-y-1
          ${isSwipeMode ? 'cursor-grab' : ''}`}
      >
        <UserAvatar
          authorFullname={post.data.author_fullname}
          className="w-14 h-14"
        />

        <header className="flex items-center gap-2">
          <a
            aria-label="Open author profile in Reddit"
            className="z-10 font-bold text-base-content link link-secondary hover:link-primary"
            href={userProfile(post.data.author)}
            rel="noopener noreferrer"
            target="_blank"
            title="Open author profile in Reddit"
          >
            {post.data.author}
          </a>
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
              href={postPermalink(post.data.permalink)}
              rel="noopener noreferrer"
              target="_blank"
              title="Open comment in Reddit"
            >
              <LinkIcon className="w-4 h-4" />
            </a>
          </div>
        </header>

        <section className="col-span-1 col-start-2 row-start-2 -mt-5 prose prose-img:rounded prose-img:max-w-full prose-img:my-2">
          {sanitizedContent}
        </section>
      </motion.article>
    </>
  );
};

export default SwipeComment;
