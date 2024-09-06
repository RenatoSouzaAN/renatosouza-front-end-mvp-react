import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthComponent = ({ user, login, logout }) => {
  return (
    <div className="auth-container">
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout} className="auth-button">Logout</button>
        </div>
      ) : (
        <button onClick={login} className="auth-button">Login</button>
      )}
    </div>
  );
};

export default AuthComponent;

/*
function AuthComponent() {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          localStorage.setItem('access_token', token);
          console.log('Token stored in localStorage');
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default AuthComponent;
*/