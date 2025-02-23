import RedditAuthButton from './RedditOAuthBtn';
import snooLogin from '../../assets/images/snoo-login.png';
import { useAuthListener } from '../../hooks/useAuthListener';

export const AuthenticationPage = () => {
  const { authErrorMsg, isAuthenticating, onSignin } = useAuthListener();

  return (
    <main
      className="flex items-center justify-center w-screen h-screen"
      data-theme="reddit"
    >
      <div className="flex flex-col items-center gap-6 p-12 group">
        <div className="box-border relative overflow-hidden rounded-full w-36 h-36 transition-all duration-300 hover:shadow-[0_0_25px_5px_rgba(255,69,0,0.4)] group-hover:shadow-[0_0_25px_5px_rgba(255,69,0,0.4)]">
          <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-reddit-orange/20 to-orange-500/20 blur-sm" />
          <img
            alt="Reddit Mascot Snoo"
            className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            src={snooLogin}
          />
        </div>
        <RedditAuthButton
          className="w-96"
          isAuthenticating={isAuthenticating}
          onClick={onSignin}
        />
        <div className="h-12 w-96">
          {/* Container for consistent spacing */}
          {authErrorMsg && (
            <div role="alert" className="alert alert-error animate-fade-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-current shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error: {authErrorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AuthenticationPage;
