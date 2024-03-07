import { useEffect } from "react";
import RedditIcon from "../icons/RedditIcon";
import { CLIENT_ID } from "../constants/constants";

const RedditAuthButton = () => {
  const onSignin = () => {
    const REDIRECT_URI = encodeURIComponent("redditSaved://callback");
    const STATE = crypto.randomUUID();
    const SCOPE = encodeURIComponent("identity history");

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${STATE}&redirect_uri=${REDIRECT_URI}&duration=temporary&scope=${SCOPE}`;
    window.open(authUrl, "_blank");
  };

  useEffect(() => {
    const handleOauth = (value: string) => {
      console.log("OAuth:", value);
    };

    // listen for oauth events
    window.electronAPI.onOauth(handleOauth);

    return () => {
      window.electronAPI.clearOauthListeners();
    };
  }, []);

  return (
    <button
      onClick={onSignin}
      className="inline-flex items-center px-4 py-2 bg-[#FF4500] hover:bg-[#cc3700] text-white font-bold rounded-md shadow transition duration-150 ease-in-out"
    >
      Sign in with <RedditIcon className="h-8" />
    </button>
  );
};

export default RedditAuthButton;
