import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Guide({ userData }) {
  const [guide, setGuide] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let Data = {
      name: e.target[0].value,
      topic: e.target[1].value,
      previousExperience: e.target[2].value,
    };

    try {
      let token = JSON.parse(localStorage.getItem("userData"))?.token || "";
      let response = await axios.post(`http://localhost:5500/api/ai/askQuery/${userData._id}`, Data, {
        headers: { "Authorization": token },
      });
      setGuide(response.data);
    } catch (error) {
      console.error("Error fetching guide:", error);
    } finally {
      setLoading(false);
    }
  }

  const SectionHeader = ({ emoji, title, subtitle }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white flex items-center space-x-2">
        <span>{emoji}</span>
        <span>{title}</span>
      </h2>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`rounded-2xl bg-white/[0.03] border border-white/8 ${className}`}>{children}</div>
  );

  const TagBadge = ({ label, color = "indigo" }) => {
    const colors = {
      indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      red: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${colors[color]}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-[#0a0a0f] text-slate-300 overflow-hidden">
      {/* Sidebar */}
      <Sidebar userId={userData._id} onSelectGuide={setGuide} />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(guide).length === 0 ? (
          /* ─── Generator Form ─── */
          <div className="max-w-2xl mx-auto px-6 py-16">
            {/* Page header */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/8 text-indigo-400 text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>AI-Powered Guide Generator</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Create Your Study Guide</h1>
              <p className="text-slate-500 text-sm">Tell us your goals and we'll generate a personalized roadmap.</p>
            </div>

            {/* Form card */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Study Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Machine Learning, UI/UX Design, React..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Your Current Experience</label>
                  <textarea
                    placeholder="Describe your current knowledge level, what you already know, and your goals..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all duration-200 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating your guide...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>Generate My Personalized Guide</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ─── Guide View ─── */
          <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

            {/* Guide Hero */}
            <div className="rounded-2xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-purple-950/50 p-8">
              <div className="absolute inset-0 pointer-events-none" />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">Your Personalized Guide</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{guide.greetings}</h1>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{guide.prior_knowledge}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center min-w-[90px]">
                    <p className="text-white font-bold text-xl">{guide.prior_knowledge_alignment}<span className="text-slate-500 text-sm font-normal">/10</span></p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Readiness</p>
                  </div>
                  {guide.future && (
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center min-w-[90px]">
                      <p className="text-emerald-400 font-bold text-xl">{guide.future.relevance_score}<span className="text-slate-500 text-sm font-normal">/10</span></p>
                      <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Relevance</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Roadmap */}
            {guide.roadmap?.length > 0 && (
              <section>
                <SectionHeader emoji="🗺️" title="Learning Roadmap" subtitle="Follow this structured path to master your topic" />
                <div className="space-y-4">
                  {guide.roadmap.map((step, idx) => (
                    <div key={idx} className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 hover:bg-white/[0.05] hover:border-white/12 transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                          <span className="text-indigo-400 font-bold text-xs">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-white mb-1.5">{step.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.description}</p>
                          {step.resources?.length > 0 && (
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-2">Resources</p>
                              <div className="flex flex-wrap gap-2">
                                {step.resources.map((r, i) => (
                                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg bg-white/5 border border-white/8 text-slate-400 text-xs">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Future Trends */}
            {guide.future && (
              <section>
                <SectionHeader emoji="🔮" title="Future Outlook" subtitle="Emerging trends and market insights" />
                <Card className="p-6 border-emerald-500/10 bg-emerald-950/10">
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">{guide.future.demand_growth}</p>
                  {guide.future.emerging_trends?.length > 0 && (
                    <>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-3">Emerging Trends</p>
                      <div className="flex flex-wrap gap-2">
                        {guide.future.emerging_trends.map((t, i) => (
                          <TagBadge key={i} label={t} color="green" />
                        ))}
                      </div>
                    </>
                  )}
                </Card>
              </section>
            )}

            {/* Resources Grid */}
            <section>
              <SectionHeader emoji="📚" title="Learning Resources" subtitle="Curated materials to accelerate your journey" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "bestBooks", label: "Recommended Books", emoji: "📖", color: "indigo" },
                  { key: "bestCourses", label: "Top Courses", emoji: "🎓", color: "purple" },
                  { key: "bestYoutubeChannels", label: "YouTube Channels", emoji: "▶️", color: "red" },
                  { key: "bestWebsites", label: "Useful Websites", emoji: "🌐", color: "yellow" },
                ].map(({ key, label, emoji, color }) =>
                  guide[key]?.length > 0 ? (
                    <Card key={key} className="p-5">
                      <p className="text-sm font-semibold text-white mb-4 flex items-center space-x-2">
                        <span>{emoji}</span><span>{label}</span>
                      </p>
                      <ul className="space-y-2">
                        {guide[key].map((item, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm text-slate-400">
                            <span className="text-slate-600 mt-0.5">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ) : null
                )}
              </div>
            </section>

            {/* Projects */}
            {guide.goodProjects?.length > 0 && (
              <section>
                <SectionHeader emoji="💻" title="Hands-on Projects" subtitle="Build your portfolio with these practical projects" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {guide.goodProjects.map((project, idx) => {
                    const diffColor = {
                      Beginner: "green",
                      Intermediate: "yellow",
                      Advanced: "red"
                    }[project.difficulty] || "indigo";
                    return (
                      <Card key={idx} className="p-5 flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-sm font-semibold text-white leading-tight flex-1 mr-2">{project.name}</h3>
                          <TagBadge label={project.difficulty} color={diffColor} />
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4">{project.description}</p>
                        {project.githubExample && (
                          <a
                            href={project.githubExample}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>View on GitHub</span>
                          </a>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Companies */}
            {guide.topCompanies?.length > 0 && (
              <section>
                <SectionHeader emoji="🏢" title="Top Hiring Companies" subtitle="Companies actively seeking professionals in this field" />
                <div className="space-y-4">
                  {guide.topCompanies.map((company, idx) => (
                    <Card key={idx} className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <h3 className="text-base font-semibold text-white">{company.name}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {company.roles?.map((role, i) => <TagBadge key={i} label={role} color="indigo" />)}
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{company.hiringTrends}</p>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Salary */}
            {guide.avgPackages && (
              <section>
                <SectionHeader emoji="💰" title="Salary Insights" subtitle="Average compensation across different regions" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: "india", flag: "🇮🇳", country: "India" },
                    { key: "usa", flag: "🇺🇸", country: "USA" },
                    { key: "europe", flag: "🇪🇺", country: "Europe" },
                  ].map(({ key, flag, country }) =>
                    guide.avgPackages[key] ? (
                      <Card key={key} className="p-6 text-center hover:bg-white/[0.05] transition-all duration-200">
                        <div className="text-3xl mb-3">{flag}</div>
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">{country}</p>
                        <p className="text-white font-bold text-lg">{guide.avgPackages[key]}</p>
                      </Card>
                    ) : null
                  )}
                </div>
              </section>
            )}

            {/* Bottom spacer */}
            <div className="h-8" />
          </div>
        )}
      </div>
    </div>
  );
}