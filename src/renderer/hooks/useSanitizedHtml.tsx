import DOMPurify from 'dompurify';
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from 'html-react-parser';
import { useMemo } from 'react';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
const KNOWN_IMAGE_HOSTS = ['preview.redd.it', 'i.redd.it', 'i.imgur.com'];
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'b',
    'i',
    'em',
    'strong',
    'a',
    'img',
    'p',
    'br',
    'ul',
    'ol',
    'li',
    'blockquote',
    'pre',
    'code',
    'span',
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'loading'],
};

export const useSanitizedHtml = (html: string) => {
  return useMemo(() => {
    const cleanHtml = DOMPurify.sanitize(html, sanitizeConfig);

    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode.type !== 'tag') {
          return; // Only alter HTML tags, skip text/comment nodes
        }

        const element = domNode as Element;

        // If it's an <a> with an href
        if (element.name === 'a' && element.attribs.href) {
          const href = element.attribs.href;

          // if it's an image link, render it if it's from a trusted host
          const isImageLink =
            IMAGE_EXTENSIONS.some((ext) =>
              href.toLowerCase().endsWith(`.${ext}`)
            ) || KNOWN_IMAGE_HOSTS.some((host) => href.includes(host));

          if (isImageLink) {
            return (
              <img
                alt={element.attribs.title || 'Embedded image'}
                draggable="false"
                loading="lazy"
                src={href}
              />
            );
          }

          // Otherwise, render a normal clickable link
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {domToReact(element.children as DOMNode[], options)}
            </a>
          );
        }

        // if its an image tag, render the image directly, and make it draggable
        if (element.name === 'img' && element.attribs.src) {
          return (
            <img
              alt={element.attribs.alt || ''}
              draggable="false"
              loading="lazy"
              src={element.attribs.src}
            />
          );
        }
      },
    };

    // Parse the cleaned HTML into React elements using our custom rules
    return parse(cleanHtml, options);
  }, [html]);
};
