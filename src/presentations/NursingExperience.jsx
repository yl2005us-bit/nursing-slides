import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, User, ClipboardList, Eye, AlertCircle, Info, BarChart3, HelpCircle } from 'lucide-react';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slides = [
    {
      id: 1,
      title: "我們與惡的距離",
      subtitle: "那些不友善的護理職場經驗",
      type: "cover",
      notes: "今天這一段，我們不先談理想，我們先談現實。",
      bg: "bg-slate-900"
    },
    {
      id: 2,
      title: "今天，我們先做一件事",
      content: (
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <p className="text-3xl text-slate-400 line-through">不是解決問題</p>
          <div className="flex items-center space-x-4">
            <div className="h-1 w-12 bg-orange-500"></div>
            <p className="text-6xl font-bold text-orange-500">看見問題</p>
            <div className="h-1 w-12 bg-orange-500"></div>
          </div>
        </div>
      ),
      notes: "今天不是要找答案，而是要看見那些我們平常沒說出口的事情。",
      bg: "bg-slate-50"
    },
    {
      id: 3,
      title: "這是一個安全的空間",
      icon: <ShieldCheck className="w-16 h-16 text-emerald-500 mb-6" />,
      content: (
        <ul className="space-y-6 text-2xl">
          <li className="flex items-center space-x-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">✔</span>
            <span>不需寫名字</span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">✔</span>
            <span>不評論他人</span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">✔</span>
            <span>分享的是經驗，不是對錯</span>
          </li>
        </ul>
      ),
      notes: "這裡不是評價誰對誰錯，而是讓經驗被看見。",
      bg: "bg-white"
    },
    {
      id: 4,
      title: "破冰任務：三句話認識你",
      icon: <User className="w-12 h-12 text-blue-500 mb-4" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="p-8 bg-blue-50 rounded-2xl border-2 border-blue-100">
            <div className="text-4xl font-bold text-blue-500 mb-4">1</div>
            <h3 className="text-xl font-bold mb-2">我是誰</h3>
            <p className="text-slate-600">單位 ＋ 角色</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-2xl border-2 border-blue-100">
            <div className="text-4xl font-bold text-blue-500 mb-4">2</div>
            <h3 className="text-xl font-bold mb-2">一個詞</h3>
            <p className="text-slate-600">形容職場氛圍</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-2xl border-2 border-blue-100">
            <div className="text-4xl font-bold text-blue-500 mb-4">3</div>
            <h3 className="text-xl font-bold mb-2">一個畫面</h3>
            <p className="text-slate-600">描繪這個詞</p>
          </div>
        </div>
      ),
      notes: "不用講很多，我們先理解彼此看到的世界。",
      bg: "bg-white"
    },
    {
      id: 5,
      title: "剛剛那些詞，其實在說…",
      content: (
        <div className="text-center space-y-8">
          <p className="text-4xl text-slate-500">👉 那就是</p>
          <p className="text-8xl font-black text-slate-900 tracking-tighter">「文化」</p>
        </div>
      ),
      notes: "每個人看到的不同，但其實都在描述同一件事——文化。",
      bg: "bg-slate-100"
    },
    {
      id: 6,
      title: "接下來，我們要更靠近真實",
      icon: <ClipboardList className="w-16 h-16 text-slate-700 mb-6" />,
      content: (
        <div className="text-center">
          <h3 className="text-5xl font-bold text-slate-800">✍️ 請寫下你的經驗</h3>
        </div>
      ),
      notes: "我們要從「感覺」進到「經驗」。",
      bg: "bg-white"
    },
    {
      id: 7,
      title: "請寫下兩種經驗",
      content: (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
          <div className="flex-1 p-10 bg-yellow-200 shadow-xl transform -rotate-2 hover:rotate-0 transition-all rounded-sm min-h-[300px] flex flex-col justify-center">
            <p className="text-2xl font-bold text-yellow-800 leading-relaxed">
              🟡 我曾經被這樣不友善對待…
            </p>
          </div>
          <div className="flex-1 p-10 bg-blue-200 shadow-xl transform rotate-2 hover:rotate-0 transition-all rounded-sm min-h-[300px] flex flex-col justify-center">
            <p className="text-2xl font-bold text-blue-800 leading-relaxed">
              🔵 我曾經聽過最不友善的感受是…
            </p>
          </div>
        </div>
      ),
      notes: "不用寫長句，一句話就好。",
      bg: "bg-slate-50"
    },
    {
      id: 8,
      title: "如果你一時想不到…",
      content: (
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
          {["被責備", "不敢說話", "被忽略", "工作不公平", "情緒壓力", "被排擠", "承擔過多"].map((item, index) => (
            <span key={index} className="px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-xl text-slate-600 shadow-sm">
              {item}
            </span>
          ))}
        </div>
      ),
      notes: "給予一些關鍵字引導思考。",
      bg: "bg-slate-50"
    },
    {
      id: 9,
      title: "👥 小組交流",
      content: (
        <div className="space-y-8 text-3xl">
          <div className="flex items-center space-x-6 p-6 bg-orange-50 rounded-xl border-l-8 border-orange-400">
            <span className="text-4xl">👉</span>
            <p className="font-bold">每人分享一張</p>
          </div>
          <div className="flex items-center space-x-6 p-6 bg-orange-50 rounded-xl border-l-8 border-orange-400">
            <span className="text-4xl">👉</span>
            <p className="font-bold text-orange-600">選一個最有感的</p>
          </div>
        </div>
      ),
      notes: "不用全部講，講一個最有感的就好。",
      bg: "bg-white"
    },
    {
      id: 10,
      title: "請將便利貼貼上",
      content: (
        <div className="grid grid-cols-2 gap-4 w-full h-[400px]">
          <div className="border-4 border-dashed border-slate-300 rounded-3xl flex items-center justify-center bg-slate-50">
            <span className="text-3xl font-bold text-slate-400">左側：我經歷過</span>
          </div>
          <div className="border-4 border-dashed border-slate-300 rounded-3xl flex items-center justify-center bg-slate-50">
            <span className="text-3xl font-bold text-slate-400">右側：我聽過</span>
          </div>
        </div>
      ),
      notes: "引導參與者上台互動。",
      bg: "bg-white"
    },
    {
      id: 11,
      title: "👀 請觀察",
      icon: <Eye className="w-12 h-12 text-slate-700 mb-4" />,
      content: (
        <div className="space-y-8 text-2xl w-full max-w-2xl">
          <div className="flex items-center justify-between border-b pb-4">
            <span>1️⃣ 哪一類最多？</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span>2️⃣ 有沒有重複情境？</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span>3️⃣ 左右兩邊是否很像？</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      ),
      notes: "先觀察，不評論。",
      bg: "bg-white"
    },
    {
      id: 12,
      title: "這些現象，叫什麼？",
      content: (
        <div className="text-center space-y-6">
          <p className="text-5xl font-bold text-slate-800">👉 幫這些行為取一個名字</p>
          <div className="h-1 w-full bg-slate-200"></div>
          <p className="text-slate-500">如果它一直發生，就會變成文化。</p>
        </div>
      ),
      notes: "如果它一直發生，就會變成文化。",
      bg: "bg-white"
    },
    {
      id: 13,
      title: "可能出現的文化",
      content: (
        <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
          {["忍耐文化", "沉默文化", "學長姐文化", "責備文化"].map((culture) => (
            <div key={culture} className="p-8 bg-red-50 text-red-700 rounded-2xl border-2 border-red-100 flex items-center justify-center text-3xl font-bold shadow-sm">
              {culture}
            </div>
          ))}
        </div>
      ),
      notes: "這是一些常見的職場文化病徵。",
      bg: "bg-white"
    },
    {
      id: 14,
      title: "我們剛剛看到的是…",
      content: (
        <div className="space-y-12">
          <div className="flex items-center space-x-6 opacity-50">
            <AlertCircle className="w-10 h-10" />
            <p className="text-4xl">不是個別事件</p>
          </div>
          <div className="flex items-center space-x-6">
            <Info className="w-12 h-12 text-orange-500" />
            <p className="text-6xl font-black text-orange-600">而是會被傳承的文化</p>
          </div>
        </div>
      ),
      notes: "這不是某幾個人的問題，而是一種文化。",
      bg: "bg-slate-50"
    },
    {
      id: 15,
      title: "🤔 值得思考的是",
      icon: <HelpCircle className="w-16 h-16 text-blue-600 mb-6" />,
      content: (
        <div className="space-y-10 text-3xl font-medium max-w-3xl">
          <p className="leading-relaxed border-l-4 border-blue-600 pl-6">
            這些文化是怎麼留下來的？
          </p>
          <p className="leading-relaxed border-l-4 border-blue-600 pl-6 text-blue-600">
            我們能不能讓它在我們這一代停止？
          </p>
        </div>
      ),
      notes: "這是一個反思的起點。",
      bg: "bg-white"
    },
    {
      id: 16,
      title: "接下來，我們換一個角度",
      content: (
        <div className="flex w-full max-w-5xl h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex-1 bg-slate-200 p-12 flex flex-col justify-center items-center text-center">
            <MessageCircle className="w-16 h-16 text-slate-400 mb-4" />
            <h4 className="text-2xl font-bold mb-2">剛剛</h4>
            <p className="text-slate-600">我們用「感覺」理解職場</p>
          </div>
          <div className="flex-1 bg-blue-600 p-12 flex flex-col justify-center items-center text-center text-white">
            <BarChart3 className="w-16 h-16 mb-4" />
            <h4 className="text-2xl font-bold mb-2 text-blue-100">接下來</h4>
            <p className="text-white text-xl">我們用「數據」理解</p>
          </div>
        </div>
      ),
      notes: "當感覺遇到數據，很多事情會變得很清楚。",
      bg: "bg-white"
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
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-300" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Header / Navigation Info */}
      <header className="px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm font-medium tracking-widest text-slate-400 uppercase">Nursing Culture Workshop</span>
        </div>
        <div className="text-sm font-bold text-slate-400">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      {/* Main Slide Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-12 relative">
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
          
          {slide.type === "cover" ? (
            <div className="text-center text-white space-y-8 py-12">
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4 animate-in zoom-in duration-1000">
                {slide.title}
              </h1>
              <p className="text-2xl md:text-3xl font-light text-slate-400 tracking-widest">
                {slide.subtitle}
              </p>
              <div className="h-1 w-24 bg-blue-500 mx-auto mt-12"></div>
            </div>
          ) : (
            <>
              {slide.icon && <div className="mb-4">{slide.icon}</div>}
              <h2 className="text-4xl md:text-5xl font-black mb-12 text-center leading-tight">
                {slide.title}
              </h2>
              <div className="w-full flex justify-center">
                {slide.content}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="px-8 py-8 flex justify-between items-end relative z-40">
        <div className="flex space-x-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-4 rounded-full transition-all ${currentSlide === 0 ? 'text-slate-300' : 'bg-white shadow-lg text-slate-800 hover:scale-110 active:scale-95'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-4 rounded-full transition-all ${currentSlide === slides.length - 1 ? 'text-slate-300' : 'bg-white shadow-lg text-slate-800 hover:scale-110 active:scale-95'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all shadow-md ${showNotes ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <MessageCircle size={20} />
            <span>💬 講者備註</span>
          </button>

          {showNotes && (
            <div className="absolute bottom-full right-0 mb-4 w-72 p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-2 fade-in">
              <div className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-widest">Presenter Notes</div>
              <p className="text-lg leading-relaxed">{slide.notes}</p>
            </div>
          )}
        </div>
      </footer>

      {/* Styles for animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-in { animation: var(--anim-name) var(--anim-duration, 500ms) ease-out forwards; }
        .fade-in { --anim-name: fade-in; }
        .slide-in-from-bottom-4 { --anim-name: slide-in-from-bottom-4; }
        .slide-in-from-bottom-2 { --anim-name: slide-in-from-bottom-2; }
        .zoom-in { --anim-name: zoom-in; }
        @keyframes slide-in-from-bottom-2 { from { transform: translateY(0.5rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />
    </div>
  );
};

export default App;