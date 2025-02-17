type IconProps = {
  className?: string;
  color?: string;
};

const LinkIcon = ({ className, color = 'currentColor' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LinkIcon;
