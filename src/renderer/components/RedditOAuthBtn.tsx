import { useEffect, useState } from "react";

import { CLIENT_ID, redditCallbackUrl } from "../clientConstants/constants";
import RedditIcon from "../icons/RedditIcon";

const RedditAuthButton = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authWindow, setAuthWindow] = useState<Window>();

  const onSignin = () => {
    setIsAuthenticating(true);

    const redirectUri = encodeURIComponent(redditCallbackUrl);
    const state = crypto.randomUUID();
    const scope = encodeURIComponent("identity history");
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirectUri}&scope=${scope}&duration=permanent`;

    const newAuthWindow = window.open(authUrl, "_blank") ?? undefined;
    setAuthWindow(newAuthWindow);
  };

  useEffect(() => {
    // check if the auth window is closed by the user
    const interval = setInterval(() => {
      if (authWindow && authWindow.closed) {
        setIsAuthenticating(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      // close auth window if it's still open
      if (authWindow && !authWindow.closed) {
        authWindow.close();
      }
    };
  }, [authWindow]);

  return (
    <button
      onClick={onSignin}
      disabled={isAuthenticating}
      className="inline-flex items-center px-4 py-2 bg-[#FF4500] hover:bg-[#cc3700] text-white font-bold rounded-md shadow transition duration-150 ease-in-out"
    >
      {isAuthenticating ? "Signing in..." : "Sign in with"}
      <RedditIcon className="h-8" />
    </button>
  );
};

export default RedditAuthButton;
