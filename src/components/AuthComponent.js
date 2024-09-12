import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AuthComponent() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      connection: 'Username-Password-Authentication',
      prompt: 'login',
      scope: 'openid profile email',
    });
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleLogin} className='auth-button'>Log In</button>
      ) : (
          <div className='greetpluslogout'> 
            <div>
              <p className="greet">Welcome, {user.name}</p>
            </div>
          <button onClick={handleLogout} className='auth-button'>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default AuthComponent;