import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Play, Film, Users, Target, Clock, Eye, Lightbulb, UserCheck, Star, ArrowRight } from 'lucide-react';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slides = [
    {
      id: 1,
      title: "新天堂樂園",
      subtitle: "演出你想要的護理職場",
      type: "cover",
      notes: "「但如果我們只停在這裡，是不會改變的」",
      bg: "bg-black"
    },
    {
      id: 2,
      title: "如果文化要改變",
      content: (
        <div className="flex flex-col items-center space-y-8 text-center">
          <p className="text-3xl text-slate-400">不是用看的，不是用說的</p>
          <div className="flex items-center space-x-6">
            <div className="h-px w-16 bg-yellow-500"></div>
            <p className="text-7xl font-black text-yellow-500 animate-pulse">是用「做的」</p>
            <div className="h-px w-16 bg-yellow-500"></div>
          </div>
        </div>
      ),
      notes: "「文化，不是理解之後就會改變。是有人開始做不同的事，才會改變」",
      bg: "bg-slate-900"
    },
    {
      id: 3,
      title: "接下來，你們要做一件事",
      icon: <Film className="w-20 h-20 text-yellow-500 mb-6" />,
      content: (
        <div className="bg-white/10 p-12 rounded-full border-4 border-dashed border-yellow-500/50">
          <h3 className="text-6xl font-bold text-white">🎭 演出一個職場情境</h3>
        </div>
      ),
      notes: "「不是討論，是演出」",
      bg: "bg-slate-900"
    },
    {
      id: 4,
      title: "每組要做兩件事",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="p-10 bg-slate-800 rounded-3xl border-2 border-slate-700">
            <h3 className="text-3xl font-bold text-slate-400 mb-6">🎬 第一段：現況版</h3>
            <p className="text-2xl text-slate-300">👉 現在常發生的情境</p>
          </div>
          <div className="p-10 bg-yellow-500 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">🎬 第二段：理想版</h3>
            <p className="text-2xl text-slate-900 font-bold">👉 你希望的樣子</p>
          </div>
        </div>
      ),
      notes: "對比現況與理想，讓改變被看見。",
      bg: "bg-slate-900"
    },
    {
      id: 5,
      title: "請選一個情境",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl text-xl">
          {[
            "新人犯錯被指正", "忙碌時同事需要幫忙", "交班溝通不良", 
            "被病人情緒影響", "同事之間出現衝突"
          ].map((sc, i) => (
            <div key={i} className="p-6 bg-white shadow-md rounded-xl border-l-4 border-yellow-500 flex items-center">
              {sc}
            </div>
          ))}
          <div className="p-6 bg-slate-100 rounded-xl border-l-4 border-slate-300 flex items-center italic text-slate-400">
            自選最有感的情境...
          </div>
        </div>
      ),
      notes: "「選一個你們最有感、最常發生的」",
      bg: "bg-slate-50"
    },
    {
      id: 6,
      title: "🎬 第一段：現況版",
      content: (
        <div className="space-y-8 text-3xl text-center">
          <p className="p-6 bg-red-50 text-red-700 rounded-2xl">👉 語氣怎麼樣？</p>
          <p className="p-6 bg-red-50 text-red-700 rounded-2xl">👉 會說什麼話？</p>
          <p className="p-6 bg-red-50 text-red-700 rounded-2xl">👉 氣氛如何？</p>
        </div>
      ),
      notes: "呈現最真實、甚至有點不友善的當下。",
      bg: "bg-white"
    },
    {
      id: 7,
      title: "🎬 第二段：理想版",
      icon: <Star className="w-12 h-12 text-yellow-500 mb-4" />,
      content: (
        <div className="space-y-8 text-3xl text-center font-bold">
          <p className="p-6 bg-emerald-50 text-emerald-700 rounded-2xl">👉 誰做了不同的事？</p>
          <p className="p-6 bg-emerald-50 text-emerald-700 rounded-2xl">👉 說了什麼話？</p>
          <p className="p-6 bg-emerald-50 text-emerald-700 rounded-2xl">👉 有什麼支持行為？</p>
        </div>
      ),
      notes: "核心在於「不同」的行為產生的連鎖反應。",
      bg: "bg-white"
    },
    {
      id: 8,
      title: "重要提醒",
      icon: <Target className="w-16 h-16 text-red-500 mb-6" />,
      content: (
        <div className="text-center space-y-10">
          <p className="text-4xl text-slate-400">理想版不是完美</p>
          <p className="text-6xl font-black text-slate-900 border-b-8 border-yellow-400 pb-4">
            是「可以做到的一點點改變」
          </p>
        </div>
      ),
      notes: "「不要演很理想，要演『做得到』」",
      bg: "bg-white"
    },
    {
      id: 9,
      title: "⏱ 時間安排",
      icon: <Clock className="w-12 h-12 text-blue-500 mb-4" />,
      content: (
        <div className="flex space-x-12">
          <div className="text-center">
            <div className="text-6xl font-black text-blue-600 mb-2">10</div>
            <div className="text-xl text-slate-500">設計分鐘</div>
          </div>
          <div className="h-16 w-px bg-slate-300 self-center"></div>
          <div className="text-center">
            <div className="text-6xl font-black text-blue-600 mb-2">N</div>
            <div className="text-xl text-slate-500">演出分鐘 / 組</div>
          </div>
        </div>
      ),
      notes: "控制節奏，重點在於演出的張力。",
      bg: "bg-white"
    },
    {
      id: 10,
      title: "👀 請觀察",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-2xl">
          <div className="p-10 bg-slate-50 rounded-3xl border-2 border-slate-100 flex items-center space-x-6">
            <span className="text-4xl">1️⃣</span>
            <span>哪一句話讓你感覺不一樣？</span>
          </div>
          <div className="p-10 bg-slate-50 rounded-3xl border-2 border-slate-100 flex items-center space-x-6">
            <span className="text-4xl">2️⃣</span>
            <span>哪一個行為最關鍵？</span>
          </div>
        </div>
      ),
      notes: "給予台下觀眾明確的觀察任務。",
      bg: "bg-white"
    },
    {
      id: 11,
      title: "開始演出",
      content: (
        <div className="flex flex-col items-center">
          <Play className="w-32 h-32 text-red-600 animate-pulse mb-8" />
          <h3 className="text-5xl font-bold text-slate-800">👉 Show Time！</h3>
        </div>
      ),
      notes: "隨機抽籤或指定小組上台。",
      bg: "bg-white"
    },
    {
      id: 12,
      title: "你剛剛看到什麼？",
      icon: <Users className="w-12 h-12 text-blue-500 mb-4" />,
      content: (
        <div className="space-y-12 text-3xl font-bold text-center">
          <p className="text-blue-600">👉 哪一個改變最有感？</p>
          <div className="h-px w-24 bg-slate-300 mx-auto"></div>
          <p className="text-slate-400">為什麼？</p>
        </div>
      ),
      notes: "引導回饋，發掘微小改變帶來的巨大心理差異。",
      bg: "bg-white"
    },
    {
      id: 13,
      title: "剛剛的差別是什麼？",
      content: (
        <div className="space-y-12 text-center">
          <div className="flex items-center justify-center space-x-6 opacity-30">
            <p className="text-4xl line-through">不是制度改變</p>
          </div>
          <div className="flex flex-col items-center">
            <Lightbulb className="w-16 h-16 text-yellow-500 mb-4" />
            <p className="text-7xl font-black text-slate-900 underline decoration-yellow-400">是「行為」改變</p>
          </div>
        </div>
      ),
      notes: "「文化的差別，來自於行為的差別」",
      bg: "bg-slate-50"
    },
    {
      id: 14,
      title: "誰最有影響力？",
      icon: <UserCheck className="w-16 h-16 text-slate-800 mb-6" />,
      content: (
        <div className="bg-slate-900 p-12 rounded-3xl text-white text-center">
          <h3 className="text-5xl font-bold text-yellow-500 mb-6">👉 很多時候，是主管</h3>
          <p className="text-2xl text-slate-400">一句話、一個反應，就會影響整個文化</p>
        </div>
      ),
      notes: "「一句話、一個反應，就會影響整個文化」",
      bg: "bg-white"
    },
    {
      id: 15,
      title: "文化是什麼？",
      content: (
        <div className="space-y-8 text-4xl font-bold text-slate-800 max-w-2xl">
          <div className="flex items-center space-x-6">
            <span className="text-blue-500">●</span>
            <p>是每天怎麼說話</p>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-blue-500">●</span>
            <p>是壓力來時怎麼做</p>
          </div>
        </div>
      ),
      notes: "文化不再抽象，而是具體的動作。",
      bg: "bg-white"
    },
    {
      id: 16,
      title: "那接下來的問題是…",
      content: (
        <div className="text-center space-y-10">
          <p className="text-5xl font-bold text-slate-700">我們怎麼讓這些行為真的發生？</p>
          <div className="flex items-center justify-center space-x-4 text-blue-600 animate-bounce">
            <span className="text-2xl font-bold">前往下一堂：行動方案</span>
            <ArrowRight />
          </div>
        </div>
      ),
      notes: "「接下來，我們要把這些變成行動」",
      bg: "bg-blue-50"
    }
  ];

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
    <div className={`min-h-screen ${slide.bg} transition-colors duration-500 flex flex-col font-sans overflow-hidden text-slate-900`}>
      {/* Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/20 z-50">
        <div 
          className="h-full bg-yellow-500 transition-all duration-300" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <header className="px-8 py-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">Part 2: New Cinema Paradiso</span>
        </div>
        <div className="px-3 py-1 bg-white/10 backdrop-blur rounded text-xs font-bold text-slate-400 border border-white/20">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-12 relative">
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
          
          {slide.type === "cover" ? (
            <div className="text-center text-white space-y-8 py-12">
              <Film className="w-20 h-20 text-yellow-500 mx-auto mb-6 opacity-80" />
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4">
                {slide.title}
              </h1>
              <p className="text-2xl md:text-4xl font-light text-slate-400 tracking-widest">
                {slide.subtitle}
              </p>
              <div className="h-1 w-24 bg-yellow-500 mx-auto mt-12"></div>
            </div>
          ) : (
            <>
              {slide.icon && <div className="mb-4">{slide.icon}</div>}
              <h2 className={`text-4xl md:text-6xl font-black mb-16 text-center leading-tight ${slide.bg === 'bg-slate-900' ? 'text-white' : 'text-slate-900'}`}>
                {slide.title}
              </h2>
              <div className="w-full flex justify-center">
                {slide.content}
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="px-8 py-8 flex justify-between items-end relative z-40">
        <div className="flex space-x-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-4 rounded-full transition-all ${currentSlide === 0 ? 'opacity-20 text-slate-400' : 'bg-white shadow-xl text-slate-800 hover:scale-110 active:scale-95'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-4 rounded-full transition-all ${currentSlide === slides.length - 1 ? 'opacity-20 text-slate-400' : 'bg-white shadow-xl text-slate-800 hover:scale-110 active:scale-95'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all shadow-md ${showNotes ? 'bg-yellow-500 text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <MessageCircle size={20} />
            <span>💬 講者備註</span>
          </button>

          {showNotes && (
            <div className="absolute bottom-full right-0 mb-4 w-80 p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-2 fade-in">
              <div className="text-xs font-bold text-yellow-500 mb-2 uppercase tracking-widest flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                Presenter Guide
              </div>
              <p className="text-lg leading-relaxed font-medium">{slide.notes}</p>
            </div>
          )}
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { transform: translateY(2rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-from-bottom-2 { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation: var(--anim-name) var(--anim-duration, 600ms) cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { --anim-name: fade-in; }
        .slide-in-from-bottom-4 { --anim-name: slide-in-from-bottom-4; }
        .slide-in-from-bottom-2 { --anim-name: slide-in-from-bottom-2; }
      `}} />
    </div>
  );
};

export default App;