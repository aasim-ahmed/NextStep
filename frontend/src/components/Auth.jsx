import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Auth({ setIsLoggedIn, setUserData }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("userData");
    if (user) {
      navigate("/profile");
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const Data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      let res = await axios.post("http://localhost:5500/api/auth/login", Data);
      if (res.status === 201) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        setIsLoggedIn(true);
        setUserData(res.data);
        navigate("/profile");
      } else {
        setError(res.data?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const Data = {
      fullName: e.target[0].value,
      avatar: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
    };
    try {
      let res = await axios.post("http://localhost:5500/api/auth/register", Data);
      if (res.status === 201) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        setIsLoggedIn(true);
        setUserData(res.data);
        navigate("/profile");
      } else {
        setError(res.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200";

  return (
    <div className="animated-bg min-h-screen flex items-center justify-center px-6 py-24">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">Next<span className="text-indigo-400">Step</span></span>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-white/5 rounded-xl mb-8">
            <button
              onClick={() => { setActiveTab('signin'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'signin' ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'signup' ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email address</label>
                <input type="email" placeholder="you@example.com" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                <input type="password" placeholder="••••••••" className={inputClass} required />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span>Signing in...</span></>
                ) : (<span>Sign in to your account</span>)}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                <input type="text" placeholder="John Doe" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Avatar URL <span className="text-slate-600">(optional)</span></label>
                <input type="text" placeholder="https://..." className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email address</label>
                <input type="email" placeholder="you@example.com" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                <input type="password" placeholder="••••••••" className={inputClass} required />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span>Creating account...</span></>
                ) : (<span>Create your free account</span>)}
              </button>
            </form>
          )}

          <p className="text-center text-slate-600 text-xs mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
