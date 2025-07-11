import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OAuthProvider } from 'appwrite';
import { account, createOAuthSession } from '../appwrite';

// Helper functions
//const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login via Appwrite session
        //const session = await createSession(email, password);
        const user = await account.get();

        localStorage.setItem('user', JSON.stringify(user));
        window.dispatchEvent(new Event('userDataChanged'));
        navigate('/feature');
      } else {
        // Signup via your Express backend and MongoDB
        if (!email || !password || !name) {
          setError('Please fill in all required fields.');
          return;
        }

        if (password.length < 8) {
          setError('Password must be at least 8 characters long.');
          return;
        }

        const response = await fetch('https://zarva-redefinedtravelsafety-ne2y.onrender.com/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, phone }),
        });

        if (!response.ok) {
          const res = await response.json();
          throw new Error(res.message || 'Failed to sign up.');
        }

        const savedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(savedUser));
        window.dispatchEvent(new Event('userDataChanged'));

        navigate('/feature');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.message?.includes('User already exists')) {
        setError('User already exists. Please login.');
        setIsLogin(true);
      } else if (error.message?.includes('401')) {
        setError('Invalid email or password.');
      } else {
        setError(error.message || 'Unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleOAuthLogin = async (provider: OAuthProvider) => {
    try {
      setError('');
      setIsLoading(true);
      await createOAuthSession(provider);
    } catch (error: any) {
      console.error(`OAuth login error:`, error);
      setError(`Failed to login with OAuth: ${error.message}`);
      setIsLoading(false);
    }
  };


  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-transparent"
      style={{
       backgroundImage: "url('/bg.jpg')"
     }}
    >
      {/* Login Card */}
      <div className="w-96 bg-[#e1ded2] backdrop-blur-sm rounded-2xl p-8 mx-4 border border-[#bcb291]"
           style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 1)' }}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isLogin ? 'Login' : 'Sign up'}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
               style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)' }}>
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          
          {/* Name Field - Only for Sign Up */}
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-800 rounded-lg placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-shadow duration-200"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 1)' }}
              />
            </div>
          )}

          {/* Phone Field - Only for Sign Up */}
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-800 rounded-lg placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition-shadow duration-200"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 1)' }}
              />
            </div>
          )}

          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
             src="/message.png"
             alt="mail"
            className="w-5 h-5"
             />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-800 rounded-lg placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-shadow duration-200"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 1)' }}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-800 rounded-lg placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-shadow duration-200"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 1)' }}
            />
          </div>

          {/* Forgot Password - Only for Login */}
          {isLogin && (
            <div className="text-right">
              <button type="button" 
                      className="text-blue-600 hover:text-blue-700 text-sm transition-all duration-200 px-2 py-1 rounded mx-auto block">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-1/2 py-3 px-4 rounded-full font-medium text-sm text-black transition-all duration-200 mx-auto block ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'hover:opacity-90 active:scale-95'
            }`}
            style={{ 
              backgroundColor: isLoading ? undefined : '#bcb291',
              boxShadow: isLoading ? '0 4px 12px rgba(0, 0, 0, 1)' : '0 6px 16px rgba(0, 0, 0, 1)'
            }}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </div>

        {/* Toggle Login/Signup */}
        <div className="text-center mt-6 ">
          <span className="text-gray-800 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
              setName('');
              setPhone('');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            disabled={isLoading}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>

        {/* OAuth Section */}
        <>
          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-4 border-[#bcb291]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#e1ded2] text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleOAuthLogin(OAuthProvider.Google)}
              disabled={isLoading}
              className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full transition-all duration-200"
            >
               <img
                     src="/google.png"
                     alt="Google"
                    className="w-5 h-5"
                />
            </button>
            
            <button
              onClick={() => handleOAuthLogin(OAuthProvider.Apple)}
              disabled={isLoading}
              className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full transition-all duration-200"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
            
            <button
              onClick={() => handleOAuthLogin(OAuthProvider.Facebook)}
              disabled={isLoading}
              className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full transition-all duration-200"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
            >
              <span className="text-black font-bold text-lg">f</span>
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default LoginPage;