
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';


const Login = () => {
    const [loading,setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
  
    const handleSubmit = async (e) => {
      setLoading(true)
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/login', {
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setLoading(false)
        setEmail('');
        setPassword('');
        navigate('/');
        toast.success('Login successful');
        setUser(response.data.user);
        
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex animate-slide-in">
          {/* Image Section */}
          <div className="hidden md:block w-1/2 relative group overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826"
              alt="Login Illustration"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-4xl font-bold mb-2">Welcome Back</h3>
              <p className="text-lg opacity-90">Continue your security journey</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Secure Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative animate-fade-in-right">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                  required
                />
              </div>

              <div className="relative animate-fade-in-right" style={{ animationDelay: '0.1s' }}>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                  required
                />
              </div>

              <div className="flex items-center justify-between animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded h-5 w-5 border-gray-300 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-cyan-600 hover:text-cyan-800 transition-colors duration-300"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 animate-fade-in-right"
                style={{ animationDelay: '0.3s' }}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  'Unlock Your Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
              <p className="text-gray-600">
                New to Security Hub?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-cyan-600 font-semibold hover:text-cyan-800 transition-colors duration-300"
                >
                  Create Account
                </button>
              </p>
            </div>

            <div className="mt-8 animate-fade-in-right" style={{ animationDelay: '0.5s' }}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center w-full bg-gray-50 py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full bg-gray-50 py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Login