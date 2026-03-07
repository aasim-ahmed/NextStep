import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Sidebar({ userId, onSelectGuide }) {
  let [loading, setLoading] = useState(true);
  let [previousGuides, setPreviousGuides] = useState([]);

  useEffect(() => {
    async function getPreviousGuides() {
      try {
        let token = JSON.parse(localStorage.getItem("userData"))?.token || "";
        let res = await axios.get(`http://localhost:5500/api/user/previousChats/${userId}`, {
          headers: { "Authorization": token }
        });
        setPreviousGuides(res.data);
      } catch (err) {
        console.error("Failed to load guides:", err);
      } finally {
        setLoading(false);
      }
    }
    getPreviousGuides();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-screen w-80 flex-shrink-0 flex flex-col bg-[#0c0c16] border-r border-white/5">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center space-x-2.5 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white">Next<span className="text-indigo-400">Step</span></span>
        </div>
        <button
          onClick={() => onSelectGuide({})}
          className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>New Guide</span>
        </button>
      </div>

      {/* Guides list */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 px-2 mb-3">Previous Guides</p>

        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-white/3 animate-pulse" />
            ))}
          </div>
        ) : previousGuides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-slate-500 text-xs font-medium">No guides yet</p>
            <p className="text-slate-600 text-xs mt-1">Start creating your first study guide!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {previousGuides.map((guide) => (
              <button
                key={guide._id}
                onClick={() => onSelectGuide(guide)}
                className="w-full text-left px-3 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/8 transition-all duration-200 group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-300 truncate group-hover:text-white transition-colors leading-tight">
                      {guide.greetings?.replace(/^Hi\s+\w+,?\s*/i, '').split('!')[0] || guide.greetings}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{formatDate(guide.createdAt)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer count */}
      <div className="p-4 border-t border-white/5">
        <p className="text-xs text-slate-600 text-center">{previousGuides.length} guide{previousGuides.length !== 1 ? 's' : ''} created</p>
      </div>
    </div>
  );
}