import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * ==========================================
 * 📂 DATA MANAGEMENT (Method B)
 * ここでデータを管理します。テキストの修正はここだけでOKです。
 * ==========================================
 */
const PORTFOLIO_DATA = {
  profile: {
    name: "Keio Student", // 表示名
    role: "Student Engineer",
    university: "慶應義塾大学 理工学部",
    // 自己紹介文
    bio: "現在は主にPython, JavaScriptなどを用いて開発しています。大学での専攻分野を活かしつつ、モダンなWeb技術とバックエンド開発に興味を持って学習を続けています。",
    email: "contact@example.com",
    github: "https://github.com/yourusername",
  },
  skills: [
    "Python",
    "JavaScript",
    "Java",
    "Git",
    "Linux",
    "Docker"
  ],
  // ターミナルに表示されるコマンドプロンプトの装飾
  prompt: "guest@portfolio:~$",
};

/**
 * ==========================================
 * 🎨 COMPONENTS
 * ==========================================
 */

// シンプルなアイコンSVGコンポーネント
const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const App = () => {
  // マウント時に簡単なフェードイン効果をつけるためのState
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#00ff41] font-mono p-4 sm:p-8 selection:bg-[#00ff41] selection:text-black overflow-x-hidden">
      
      {/* --- Main Container --- */}
      <main className={`max-w-3xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* --- Header / Title --- */}
        <header className="mb-12 border-b-2 border-[#00ff41] pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-2">
            <TerminalIcon />
            {PORTFOLIO_DATA.profile.role}
          </h1>
          <p className="mt-2 text-sm opacity-80">
            Running on React v18.2.0 | System: Online
          </p>
        </header>

        {/* --- Section 1: Profile --- */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-lg font-bold">
            <span className="text-pink-500">{PORTFOLIO_DATA.prompt}</span>
            <span className="text-yellow-300">whoami</span>
          </div>

          <div className="bg-[#161b22] border border-gray-700 p-6 rounded-md shadow-lg relative overflow-hidden group">
            {/* 装飾用: 左上のボタン風デザイン */}
            <div className="absolute top-3 left-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <UserIcon /> {PORTFOLIO_DATA.profile.name}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                @ {PORTFOLIO_DATA.profile.university}
              </p>
              
              <div className="text-base leading-relaxed border-l-4 border-[#00ff41] pl-4 py-1 bg-black/30">
                {PORTFOLIO_DATA.profile.bio}
                <span className="inline-block w-2.5 h-5 ml-1 bg-[#00ff41] animate-pulse align-middle"></span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: Skills --- */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-lg font-bold">
            <span className="text-pink-500">{PORTFOLIO_DATA.prompt}</span>
            <span className="text-yellow-300">ls ./skills</span>
          </div>

          <div className="bg-[#161b22] border border-gray-700 p-6 rounded-md shadow-lg">
             <div className="flex items-center mb-4 text-[#00ff41]">
                <CpuIcon /> 
                <span className="font-bold">Tech Stack</span>
             </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {PORTFOLIO_DATA.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-default"
                >
                  <div className="absolute -inset-0.5 bg-[#00ff41] opacity-20 group-hover:opacity-100 transition duration-300 blur-sm rounded"></div>
                  <div className="relative flex items-center justify-center bg-black border border-[#00ff41] px-4 py-3 rounded text-center hover:bg-[#00ff41] hover:text-black transition-colors duration-300">
                    <span className="font-bold tracking-wider">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-right">
              Total {PORTFOLIO_DATA.skills.length} objects found.
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="text-center text-gray-600 text-sm mt-20 pb-8 border-t border-gray-800 pt-8">
          <p>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All systems operational.</p>
          <p className="mt-1 text-xs">Built with React & Tailwind CSS</p>
        </footer>

      </main>
    </div>
  );
};

export default App;