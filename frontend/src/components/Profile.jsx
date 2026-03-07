import React from "react";

export default function Profile({ userData, setIsLoggedIn, setUserData }) {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center px-6 py-24">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Header gradient band */}
          <div className="h-24 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
          </div>

          <div className="px-8 pb-8 -mt-12">
            {/* Avatar */}
            <div className="mb-5">
              {userData?.avatar && userData.avatar.startsWith('http') ? (
                <img
                  src={userData.avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-2xl border-4 border-[#0a0a0f] object-cover shadow-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="w-20 h-20 rounded-2xl border-4 border-[#0a0a0f] bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-2xl font-bold text-white shadow-xl"
                style={{ display: (userData?.avatar && userData.avatar.startsWith('http')) ? 'none' : 'flex' }}
              >
                {userData?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>

            {/* User info */}
            <h1 className="text-xl font-bold text-white mb-1">{userData?.fullName || 'User'}</h1>
            <p className="text-slate-500 text-sm mb-6">{userData?.email || ''}</p>

            {/* Stats row */}
            <div className="flex divide-x divide-white/5 mb-8 rounded-xl bg-white/[0.03] border border-white/8 overflow-hidden">
              <div className="flex-1 px-4 py-3 text-center">
                <p className="text-white font-bold text-lg">{userData?.chats?.length ?? 0}</p>
                <p className="text-slate-500 text-xs mt-0.5">Guides</p>
              </div>
              <div className="flex-1 px-4 py-3 text-center">
                <p className="text-white font-bold text-lg">–</p>
                <p className="text-slate-500 text-xs mt-0.5">Topics</p>
              </div>
              <div className="flex-1 px-4 py-3 text-center">
                <p className="text-white font-bold text-lg">–</p>
                <p className="text-slate-500 text-xs mt-0.5">Days</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                id="LogOut"
                onClick={() => {
                  localStorage.removeItem("userData");
                  setIsLoggedIn(false);
                  setUserData({});
                }}
                className="w-full py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
