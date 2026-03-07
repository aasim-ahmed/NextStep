import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="animated-bg min-h-screen text-slate-300">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>AI-Powered Learning Paths</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
            Learn Anything.{" "}
            <span className="gradient-text">Faster.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Get personalized roadmaps, curated resources, and career insights — tailored to
            your experience and goals. Built with AI, designed for your success.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth"
              className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300"
            >
              <span>Start for Free</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 font-semibold text-base hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <span>See how it works</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            {[
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "100% Personalized" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Instant Generation" },
              { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", label: "Always Free" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to level up</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Stop wasting hours searching for the right resources. Get your complete learning plan in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z",
                title: "Structured Roadmaps",
                desc: "Step-by-step learning paths tailored to your experience level and goals.",
                color: "indigo",
                gradient: "from-indigo-600 to-blue-600",
              },
              {
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                title: "Curated Resources",
                desc: "Handpicked books, courses, and materials vetted by industry experts.",
                color: "purple",
                gradient: "from-purple-600 to-pink-600",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Career Insights",
                desc: "Salary trends, top companies, and emerging opportunities in your field.",
                color: "emerald",
                gradient: "from-emerald-600 to-teal-600",
              },
            ].map(({ icon, title, desc, gradient }) => (
              <div key={title} className="group p-8 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] hover:border-white/12 transition-all duration-300 cursor-default">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Three steps to your roadmap</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Get up and running in under a minute
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Tell Us Your Goals", desc: "Share what you want to learn and your current experience level." },
              { num: "02", title: "Get Your Roadmap", desc: "Receive a customized learning path with resources and timelines." },
              { num: "03", title: "Start Learning", desc: "Follow your guide and track progress towards your goals." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="relative text-center">
                <div className="text-7xl font-black text-white/[0.04] mb-4 leading-none">{num}</div>
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10">
                  <span className="text-indigo-400 font-bold text-sm">{parseInt(num)}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Loved by learners</h2>
            <p className="text-slate-400 text-lg">Join thousands who've achieved their goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Web Developer",
                initial: "S",
                color: "from-indigo-500 to-blue-500",
                quote: "Next Step helped me transition from marketing to web development. The roadmap was perfect for my skill level!",
              },
              {
                name: "Mike Johnson",
                role: "Data Scientist",
                initial: "M",
                color: "from-purple-500 to-pink-500",
                quote: "The curated resources saved me months of research. I landed my dream job in data science!",
              },
              {
                name: "Anna Rodriguez",
                role: "UX Designer",
                initial: "A",
                color: "from-emerald-500 to-teal-500",
                quote: "Amazing platform! The step-by-step approach made learning UX design much less overwhelming.",
              },
            ].map(({ name, role, initial, color, quote }) => (
              <div key={name} className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col">
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">"{quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-semibold text-sm`}>
                    {initial}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{name}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-purple-950/60">
            {/* CTA glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 pointer-events-none" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Ready to start your{" "}
                <span className="gradient-text">learning journey?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of learners already achieving their goals with Next Step — for free.
              </p>
              <Link
                to="/auth"
                className="group inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-base hover:bg-slate-100 shadow-2xl transition-all duration-200"
              >
                <span>Create Your First Guide</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-base font-bold text-white">Next<span className="text-indigo-400">Step</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Empowering learners worldwide with personalized AI-powered study guides and career insights.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2.5">
                {["Features", "Pricing", "API"].map(link => (
                  <li key={link}><a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
              <ul className="space-y-2.5">
                {["Help Center", "Contact", "Privacy"].map(link => (
                  <li key={link}><a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
            <p>© 2026 NextStep By Aasim Ahmed. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}