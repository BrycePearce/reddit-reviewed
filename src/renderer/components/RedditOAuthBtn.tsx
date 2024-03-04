import RedditIcon from "../icons/RedditIcon";

const RedditAuthButton = () => (
  <button
    className="inline-flex items-center px-4 py-2 bg-[#FF4500] hover:bg-[#cc3700] text-white font-bold rounded-md shadow transition duration-150 ease-in-out"
  >
    Sign in with <RedditIcon className="h-8" />
  </button>
);

export default RedditAuthButton;
