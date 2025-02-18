import { AuthenticationPage } from './AuthenticationPage';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../hooks/queries/useUser';

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthenticationWrapper: React.FC<AuthWrapperProps> = ({
  children,
}) => {
  const { isAuthenticated, isAuthInitializing } = useAuth();
  const { isLoading, isError, error } = useUser();

  if (isAuthInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthenticationPage />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-spinner" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-error">
        {error?.message ?? 'Authentication Failed'}
      </div>
    );
  }

  return <>{children}</>;
};
