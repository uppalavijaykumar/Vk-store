import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './Account.css';

function Account() {
  const navigate = useNavigate();
  const { registerUser, loginUser, loginWithGoogle } = useStore();

  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [regError, setRegError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setRegError('');
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setLoginError('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.fullName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!registerForm.email.trim() || !registerForm.email.includes('@')) {
      setRegError('Please enter a valid email address.');
      return;
    }
    if (registerForm.password.length < 4) {
      setRegError('Password must be at least 4 characters.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    registerUser({
      fullName: registerForm.fullName,
      email: registerForm.email
    });
    navigate('/dashboard');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email.trim()) {
      setLoginError('Please enter your email.');
      return;
    }
    if (!loginForm.password) {
      setLoginError('Please enter your password.');
      return;
    }

    loginUser(loginForm.email, loginForm.password);
    navigate('/dashboard');
  };

  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      loginWithGoogle();
      setGoogleLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-card">
          <div className="account-grid">
            {/* Left Column - Create Account */}
            <div className="account-col account-col-register">
              <h2 className="account-heading">Create Account</h2>
              <p className="account-subheading">
                Join VK Store for exclusive deals and order tracking.
              </p>

              {regError && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.85rem' }}>
                  ⚠️ {regError}
                </div>
              )}

              <form className="account-form" onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">
                    Full Name *
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="reg-name"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={registerForm.fullName}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">
                    Email Address *
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="reg-email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">
                    Password *
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="reg-password"
                    name="password"
                    required
                    placeholder="Create a password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-confirm">
                    Confirm Password *
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="reg-confirm"
                    name="confirmPassword"
                    required
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                  />
                </div>

                <button type="submit" className="account-submit">
                  ✨ Create Account
                </button>
              </form>

              <div className="account-divider">
                <div className="account-divider-line"></div>
                <span className="account-divider-text">— or —</span>
                <div className="account-divider-line"></div>
              </div>

              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleAuth}
                disabled={googleLoading}
              >
                <svg className="google-svg" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                {googleLoading ? 'Connecting Google...' : 'Continue with Google'}
              </button>
            </div>

            {/* Right Column - Login */}
            <div className="account-col account-col-login">
              <h2 className="account-heading">Login</h2>
              <p className="account-subheading">
                Welcome back! Sign in to your account.
              </p>

              {loginError && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.85rem' }}>
                  ⚠️ {loginError}
                </div>
              )}

              <form className="account-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">
                    Email Address *
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="login-email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">
                    Password *
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="login-password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="forgot-password-row">
                  <button type="button" className="forgot-password-link" onClick={() => alert('Password reset link sent to your email!')}>
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="account-submit">
                  🔑 Login
                </button>
              </form>

              <div className="account-divider">
                <div className="account-divider-line"></div>
                <span className="account-divider-text">— or —</span>
                <div className="account-divider-line"></div>
              </div>

              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleAuth}
                disabled={googleLoading}
              >
                <svg className="google-svg" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                {googleLoading ? 'Connecting Google...' : 'Continue with Google'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
