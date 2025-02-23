// todo: review this whole file for improvements, seems hack
import { useRef, useState } from 'react';
import SwipeComment from './SwipeComment';
import SwipeThread from './SwipeThread';
import { usePostsContext } from '../../../context/PostsContext';
import { RedditPostTypes } from '../../../types/reddit/Common';
import snooLogin from '../../../assets/images/snoo-login.png';
import { AnimatePresence, motion } from 'framer-motion';
import { isInsideZone } from '../../helpers/zoneCalculations';
import { useUnsavePost } from '../../../hooks/queries/useUnsavePost';
import type { OnMotionEvent } from '../../../types/motion/motion';

const SwipeViewSkeleton = () => (
  <div className="flex flex-col gap-4 w-52">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full skeleton shrink-0" />
      <div className="flex flex-col gap-4">
        <div className="w-20 h-4 skeleton" />
        <div className="h-4 skeleton w-28" />
      </div>
    </div>
    <div className="w-full h-32 skeleton" />
  </div>
);

export const SwipeView = () => {
  const swipeViewContainerRef = useRef<HTMLDivElement>(null);
  const { randomPost } = usePostsContext();
  const [isSwipeMotionActive, setIsSwipeMotionActive] = useState(false);
  const leftDropZoneRef = useRef<HTMLDivElement>(null);
  const rightDropZoneRef = useRef<HTMLDivElement>(null);
  const { mutate: unsavePost } = useUnsavePost();
  const [isDismissing, setIsDismissing] = useState(false);

  const { currentPost, isLoading, randomizePost } = randomPost;

  const handlePostDrop = async ({ info }: OnMotionEvent) => {
    setIsSwipeMotionActive(false);

    const { x, y } = info.point;
    const leftZoneRect = leftDropZoneRef.current?.getBoundingClientRect();
    const rightZoneRect = rightDropZoneRef.current?.getBoundingClientRect();

    // Check if pointer is inside left zone
    if (leftZoneRect && isInsideZone(x, y, leftZoneRect, 0.25)) {
      setIsDismissing(true);

      console.log('Dropped in LEFT zone!');

      // todo: use onAnimationComplete for motion elements or something instad of timeout to load new post
      await new Promise((resolve) => setTimeout(resolve, 300));

      unsavePost(
        { postName: currentPost.data.name },
        {
          onSuccess: () => {
            setIsDismissing(false);
            randomizePost();
          },
        }
      );
      return;
    }

    if (rightZoneRect && isInsideZone(x, y, rightZoneRect, 0.15)) {
      console.log('Dropped in RIGHT zone!');
      return;
    }
  };

  const renderPostView = () => {
    if (isLoading) {
      return <SwipeViewSkeleton />;
    }

    if (!currentPost) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 w-52">
          <div className="box-border relative overflow-hidden rounded-full w-36 h-36 transition-all duration-300 hover:shadow-[0_0_25px_5px_rgba(255,69,0,0.4)] group-hover:shadow-[0_0_25px_5px_rgba(255,69,0,0.4)]">
            <div>
              <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-reddit-orange/20 to-orange-500/20 blur-sm" />
              <img
                alt="Reddit Mascot Snoo"
                className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                src={snooLogin}
              />
            </div>
          </div>
          <span className="text-xl font-bold">No saved posts found.</span>
        </div>
      );
    }
    return (
      <AnimatePresence mode="wait">
        {currentPost && !isDismissing && (
          <>
            {currentPost.kind === RedditPostTypes.Post ? (
              <SwipeThread key={currentPost.data.id} post={currentPost} />
            ) : (
              <SwipeComment
                key={currentPost.data.id}
                post={currentPost}
                swipeViewContainerRef={swipeViewContainerRef}
                onMotionStart={() => setIsSwipeMotionActive(true)}
                onMotionEnd={(motionState) => handlePostDrop(motionState)}
              />
            )}
          </>
        )}
      </AnimatePresence>
    );
  };

  return (
    <main
      className="relative flex items-center justify-center flex-1 p-6 overflow-hidden"
      ref={swipeViewContainerRef}
    >
      <AnimatePresence>
        {isSwipeMotionActive && (
          <>
            {/* Left Drop Zone */}
            <motion.aside
              ref={leftDropZoneRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-label="Left Drop Zone"
              className="absolute top-0 left-0 flex items-center w-1/3 h-full pointer-events-none bg-gradient-to-r from-red-600/15 via-red-600/5 to-transparent"
            >
              <span className="pl-8 text-4xl font-bold text-red-600/40">
                Unsave
              </span>
            </motion.aside>

            {/* Right Drop Zone */}
            <motion.aside
              ref={rightDropZoneRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-label="Right Drop Zone"
              className="absolute top-0 right-0 flex items-center justify-end w-1/3 h-full pointer-events-none bg-gradient-to-l from-green-600/15 via-green-600/5 to-transparent"
            >
              <span className="pr-8 text-4xl font-bold text-green-600/40">
                Keep
              </span>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {renderPostView()}
    </main>
  );
};
