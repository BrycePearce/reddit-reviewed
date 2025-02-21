import type { PanInfo } from 'framer-motion';

export type OnMotionEvent = {
  event: MouseEvent | TouchEvent | PointerEvent;
  info: PanInfo;
};
