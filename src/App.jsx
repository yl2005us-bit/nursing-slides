import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Film, Sprout, ArrowRight, Award, Home,
  ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, Eye, 
  CheckCircle2, Target, Zap
} from 'lucide-react';

// --- 共通資訊常量 ---
const ORG_INFO = "主辦單位：中華民國護理師護士公會全國聯合會";
const FACILITATOR_INFO = "Facilitator：奇美醫療財團法人奇美醫院護理部 李穎俐督導";

// --- 通用投影片播放器組件 (SlidePlayer) ---
const SlidePlayer = ({ slides, accentColor, onBack, workshopTitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const themeColors = {
    blue: 'bg-blue-600',
    yellow: 'bg-yellow-500',
    emerald: 'bg-emerald-600'
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowNotes(false);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowNotes(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className={`fixed inset-0 ${slide.bg} transition-colors duration-700 flex flex-col font-sans overflow-hidden text-slate-900 z-50`}>
      {/* 進度條 */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200/20 z-50">
        <div 
          className={`h-full ${themeColors[accentColor]} transition-all duration-300`} 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <header className="px-8 py-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${themeColors[accentColor]}`}></div>
          <span className={`text-sm font-bold tracking-widest uppercase ${slide.bg.includes('900') || slide.bg.includes('black') || slide.bg.includes('emerald-950') ? 'text-slate-400' : 'text-slate-500'}`}>
            {workshopTitle}
          </span>
        </div>
        <div className="text-xs font-bold text-slate-400 border border-slate-200/30 px-3 py-1 rounded-full">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-12 relative overflow-y-auto">
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center text-center">
          {slide.type === "cover" ? (
            <div className="text-center text-white space-y-10 py-12">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">{slide.title}</h1>
              <div className="space-y-4">
                <p className="text-2xl md:text-4xl font-light text-slate-300 tracking-widest">{slide.subtitle}</p>
                <div className={`h-1.5 w-32 ${themeColors[accentColor]} mx-auto mt-16`}></div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 text-slate-400 space-y-2">
                <p className="text-sm font-medium">{ORG_INFO}</p>
                <p className="text-sm font-medium">{FACILITATOR_INFO}</p>
              </div>
            </div>
          ) : (
            <>
              {slide.icon && <div className="mb-6 flex justify-center">{slide.icon}</div>}
              <h2 className={`text-4xl md:text-6xl font-black mb-12 leading-tight ${slide.bg.includes('slate-900') || slide.bg.includes('black') || slide.bg.includes('emerald-950') ? 'text-white' : 'text-slate-800'}`}>
                {slide.title}
              </h2>
              <div className="w-full flex justify-center">{slide.content}</div>
            </>
          )}
        </div>
      </main>

      <footer className="px-8 py-8 flex justify-between items-end relative z-40">
        <div className="flex space-x-4">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 backdrop-blur-sm mr-4"
          >
            <Home size={20} />
            <span className="font-bold text-sm">返回選單</span>
          </button>
          
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-4 rounded-full transition-all ${currentSlide === 0 ? 'opacity-10 text-slate-400' : 'bg-white shadow-2xl text-slate-800 hover:scale-110 active:scale-95'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-4 rounded-full transition-all ${currentSlide === slides.length - 1 ? 'opacity-10 text-slate-400' : 'bg-white shadow-2xl text-slate-800 hover:scale-110 active:scale-95'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center space-x-2 px-6 py-4 rounded-full font-bold transition-all shadow-lg ${showNotes ? (themeColors[accentColor] + ' text-white') : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <MessageCircle size={20} />
            <span className="text-sm">講者備註</span>
          </button>

          {showNotes && (
            <div className="absolute bottom-full right-0 mb-4 w-80 p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-2 fade-in text-left">
              <p className="text-lg leading-relaxed font-medium">{slide.notes}</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

// --- 組件 1：我們與惡的距離 (NursingExperience) ---
const NursingExperience = ({ onBack }) => {
  const slides = [
    { id: 1, title: "我們與惡的距離", subtitle: "那些不友善的護理職場經驗分享", type: "cover", notes: "開場：揭露現實，看見文化產生的起點。", bg: "bg-slate-900" },
    { id: 2, title: "看見問題", icon: <Eye className="text-orange-500 w-16 h-16 mb-4" />, content: (<div className="flex flex-col items-center justify-center space-y-8 text-center"><p className="text-3xl text-slate-400 line-through">不是解決問題</p><p className="text-6xl font-bold text-orange-500 font-sans">而是——看見問題</p></div>), notes: "很多事情如果沒有被看見，就不會被解決。", bg: "bg-slate-50" },
    { id: 3, title: "安全討論原則", icon: <ShieldCheck className="w-16 h-16 text-emerald-500 mb-6" />, content: (<ul className="space-y-6 text-2xl text-left font-medium font-sans"><li className="flex items-center space-x-4"><CheckCircle2 className="text-emerald-500" /><span>不需寫名字</span></li><li className="flex items-center space-x-4"><CheckCircle2 className="text-emerald-500" /><span>不評論他人</span></li><li className="flex items-center space-x-4"><CheckCircle2 className="text-emerald-500" /><span>分享的是經驗，不是對錯</span></li></ul>), notes: "心理安全感是我們分享的基礎。", bg: "bg-white" },
    { id: 4, title: "那就是「文化」", content: (<div className="text-center space-y-8 font-sans"><p className="text-4xl text-slate-500">反覆發生的行為</p><p className="text-8xl font-black text-slate-900 tracking-tighter">「文化」</p></div>), notes: "文化不是口號，是行為的總和。", bg: "bg-slate-100" }
  ];
  return <SlidePlayer slides={slides} accentColor="blue" onBack={onBack} workshopTitle="Nursing Workshop - Part 1" />;
};

// --- 組件 2：新天堂樂園 (NursingAction) ---
const NursingAction = ({ onBack }) => {
  const slides = [
    { id: 1, title: "新天堂樂園", subtitle: "演出你想要的護理職場行動演繹", type: "cover", notes: "行動，是改變文化的唯一途徑。", bg: "bg-black" },
    { id: 2, title: "如果文化要改變", content: (<div className="flex flex-col items-center space-y-8 text-center"><p className="text-3xl text-slate-400 font-sans">不是用看的，不是用說的</p><p className="text-7xl font-black text-yellow-500 animate-pulse font-sans">是用「做的」</p></div>), notes: "文化是行為的累積，需要我們親自示範。", bg: "bg-slate-900" },
    { id: 3, title: "🎬 理想版提醒", icon: <Target className="w-16 h-16 text-red-500 mb-6" />, content: (<div className="text-center space-y-10"><p className="text-4xl text-slate-400 font-sans">理想版不是「完美」</p><p className="text-6xl font-black text-slate-900 border-b-8 border-yellow-400 pb-4 font-sans">而是做得到的一點點改變</p></div>), notes: "透過對比讓理想具象化。", bg: "bg-white" }
  ];
  return <SlidePlayer slides={slides} accentColor="yellow" onBack={onBack} workshopTitle="Nursing Workshop - Part 2" />;
};

// --- 組件 3：種瓜得瓜 (SowingAction) ---
const SowingAction = ({ onBack }) => {
  const slides = [
    { id: 1, title: "種瓜得瓜", subtitle: "要怎麼收穫，先怎麼栽：行動方案", type: "cover", notes: "最後階段：將演繹轉化為明日的行動。", bg: "bg-emerald-950" },
    { id: 2, title: "核心原則：極小化", icon: <Zap className="w-20 h-20 text-amber-500 mb-6" />, content: (<div className="p-12 bg-amber-50 rounded-[3rem] border-4 border-dashed border-amber-200 text-center max-w-2xl font-sans"><p className="text-3xl leading-relaxed text-amber-900 italic font-sans">「如果需要準備一個月，那就太大了。明天就能開始的一句話，才有力量。」</p></div>), notes: "門檻越低，成功的機率越高。", bg: "bg-white" },
    { id: 3, title: "微倡議設計三部曲", content: (<div className="space-y-6 w-full max-w-4xl text-left font-sans"><div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4"><div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div><p className="text-2xl font-bold font-sans">我們要推什麼？</p></div><div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4"><div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div><p className="text-2xl font-bold font-sans">在哪裡由誰開始？</p></div><div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4"><div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div><p className="text-2xl font-bold font-sans">怎麼讓大家一起做？</p></div></div>), notes: "行動方案的具體框架。", bg: "bg-slate-100" }
  ];
  return <SlidePlayer slides={slides} accentColor="emerald" onBack={onBack} workshopTitle="Nursing Workshop - Part 3" />;
};

// --- 主選單畫面 (MainMenu) ---
const MainMenu = ({ onSelect }) => {
  const workshopStages = [
    {
      id: 'experience',
      title: '我們與惡的距離',
      desc: '揭露與看見職場中的不友善經驗，理解文化是如何被傳承的。',
      icon: <ClipboardList size={32} />,
      color: 'blue'
    },
    {
      id: 'action',
      title: '新天堂樂園',
      desc: '透過角色演繹，體驗「做得到」的微小改變，打破既有框架。',
      icon: <Film size={32} />,
      color: 'yellow'
    },
    {
      id: 'sowing',
      title: '種瓜得瓜',
      desc: '將理想轉化為具體的行動計畫與公開倡議，讓改變發生在明天。',
      icon: <Sprout size={32} />,
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto font-sans">
      <div className="max-w-6xl w-full py-12">
        <header className="text-center mb-16 animate-in fade-in duration-1000">
          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Workshop Portal 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
            溝通與文化共創：<br/>推動友善護理職場行動工作坊
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
             透過這三個階段，我們將從「看見問題」開始，演繹理想的職場互動，最後將其落實為可執行的行動方案。
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {workshopStages.map((stage) => {
            const colors = { 
              blue: 'bg-blue-600 text-blue-600', 
              yellow: 'bg-yellow-500 text-yellow-600', 
              emerald: 'bg-emerald-600 text-emerald-600' 
            };
            return (
              <button 
                key={stage.id}
                onClick={() => onSelect(stage.id)}
                className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all text-left border border-slate-100 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform
                  ${colors[stage.color].split(' ')[0]} text-white`}>
                  {stage.icon}
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-3">{stage.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed h-20">{stage.desc}</p>
                
                <div className={`flex items-center font-bold group-hover:translate-x-2 transition-transform ${colors[stage.color].split(' ')[1]}`}>
                  <span className="text-sm font-bold">進入簡報</span> <ArrowRight className="ml-2" size={20} />
                </div>
              </button>
            );
          })}
        </div>

        <footer className="border-t border-slate-200 pt-12 pb-8 animate-in fade-in duration-1000 delay-500">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-slate-400 font-bold uppercase tracking-widest text-xs">
                <Award size={16} /> 
                <span>Organization & Facilitator</span>
              </div>
              <p className="text-slate-600 font-bold">{ORG_INFO}</p>
              <p className="text-slate-500 text-sm font-medium">{FACILITATOR_INFO}</p>
            </div>
            <div className="text-slate-300 text-sm italic font-light text-center">
              Designed for a Nursing-Friendly Workplace 2026
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// --- App 主進入點 ---
const App = () => {
  const [view, setView] = useState('menu');
  const handleBack = () => setView('menu');

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-blue-100">
      {view === 'menu' && <MainMenu onSelect={setView} />}
      {view === 'experience' && <NursingExperience onBack={handleBack} />}
      {view === 'action' && <NursingAction onBack={handleBack} />}
      {view === 'sowing' && <SowingAction onBack={handleBack} />}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-8 { from { transform: translateY(3rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-from-bottom-2 { from { transform: translateY(0.5rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation: var(--anim-name) var(--anim-duration, 700ms) cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { --anim-name: fade-in; }
        .slide-in-from-bottom-8 { --anim-name: slide-in-from-bottom-8; }
        .slide-in-from-bottom-2 { --anim-name: slide-in-from-bottom-2; }
      `}} />
    </div>
  );
};

export default App;