import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Sprout, Hammer, Zap, CheckCircle2, XCircle, PencilLine, Timer, Lightbulb, Megaphone, Milestone, Quote, ArrowRight, UserPlus } from 'lucide-react';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slides = [
    {
      id: 1,
      title: "種瓜得瓜",
      subtitle: "要怎麼收穫，先怎麼栽",
      type: "cover",
      notes: "「但如果只停在這裡，改變還不會發生」",
      bg: "bg-emerald-950"
    },
    {
      id: 2,
      title: "剛剛我們做了一件很重要的事",
      icon: <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="p-10 bg-white shadow-xl rounded-3xl border-t-8 border-emerald-500">
            <p className="text-3xl font-bold text-slate-700">👉 我們看見了不同的做法</p>
          </div>
          <div className="p-10 bg-white shadow-xl rounded-3xl border-t-8 border-emerald-500">
            <p className="text-3xl font-bold text-slate-700">👉 我們演出了理想的樣子</p>
          </div>
        </div>
      ),
      notes: "「但如果只停在這裡，改變還不會發生」",
      bg: "bg-slate-50"
    },
    {
      id: 3,
      title: "接下來，我們要更往前一步",
      icon: <Milestone className="w-16 h-16 text-amber-600 mb-6" />,
      content: (
        <div className="text-center space-y-8">
          <p className="text-4xl text-slate-500">把「演出」變成</p>
          <div className="inline-block px-12 py-6 bg-amber-500 text-white rounded-full text-7xl font-black shadow-2xl animate-bounce">
            「行動」
          </div>
        </div>
      ),
      notes: "「我們要讓剛剛那些好的行為，真的在職場發生」",
      bg: "bg-white"
    },
    {
      id: 4,
      title: "今天不做大計畫",
      content: (
        <div className="space-y-8 text-4xl text-slate-400 font-medium text-center">
          <p className="line-through">不求完美</p>
          <p className="line-through">不求完整</p>
          <div className="h-px w-24 bg-slate-200 mx-auto"></div>
          <p className="text-6xl font-black text-emerald-600">只做一件事</p>
        </div>
      ),
      notes: "「聚焦在最核心、最有感的那一件事上。」",
      bg: "bg-white"
    },
    {
      id: 5,
      title: "⭐ 小到可以明天開始",
      icon: <Zap className="w-20 h-20 text-amber-500 mb-6" />,
      content: (
        <div className="p-12 bg-amber-50 rounded-[3rem] border-4 border-dashed border-amber-200 text-center max-w-2xl">
          <p className="text-3xl leading-relaxed text-amber-900 italic">
            「如果需要準備一個月，那就太大了」
          </p>
        </div>
      ),
      notes: "改變必須具備即時性，讓大家感受到「原來這麼簡單」。",
      bg: "bg-white"
    },
    {
      id: 6,
      title: "你們的任務",
      content: (
        <div className="space-y-8 text-3xl font-bold">
          <div className="flex items-center space-x-6 p-8 bg-white shadow-lg rounded-2xl border-l-8 border-emerald-600">
            <span className="text-emerald-600">Step 1</span>
            <p>從剛剛的演出中</p>
          </div>
          <div className="flex items-center space-x-6 p-8 bg-emerald-600 text-white shadow-lg rounded-2xl">
            <span className="text-emerald-200">Step 2</span>
            <p>選出一個最值得保留的行為</p>
          </div>
        </div>
      ),
      notes: "「不是文化，是一句話或一個行為」",
      bg: "bg-slate-50"
    },
    {
      id: 7,
      title: "什麼叫「行動」？",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {["「我先幫你這個」", "「我們一起看一下」", "「你還好嗎？」"].map((text, i) => (
            <div key={i} className="p-8 bg-white border-2 border-emerald-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-center text-2xl font-bold text-emerald-800">
              {text}
            </div>
          ))}
        </div>
      ),
      notes: "這些是具體可執行的最小單位。",
      bg: "bg-emerald-50"
    },
    {
      id: 8,
      title: "請避免 vs. 改成",
      content: (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
          <div className="flex-1 p-10 bg-red-50 rounded-3xl border-2 border-red-100">
            <h3 className="text-red-600 text-2xl font-bold mb-6 flex items-center">
              <XCircle className="mr-2" /> ❌ 避免抽象
            </h3>
            <ul className="space-y-4 text-xl text-red-400 font-medium">
              <li>提升文化</li>
              <li>建立制度</li>
              <li>改善環境</li>
            </ul>
          </div>
          <div className="flex-1 p-10 bg-emerald-50 rounded-3xl border-2 border-emerald-100">
            <h3 className="text-emerald-600 text-2xl font-bold mb-6 flex items-center">
              <CheckCircle2 className="mr-2" /> ✅ 改成具體
            </h3>
            <ul className="space-y-4 text-xl text-emerald-800 font-bold">
              <li>一句話</li>
              <li>一個動作</li>
            </ul>
          </div>
        </div>
      ),
      notes: "具體化是行動成功的關鍵。",
      bg: "bg-white"
    },
    {
      id: 9,
      title: "請完成三件事",
      content: (
        <div className="space-y-6 w-full max-w-4xl">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4">
            <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <p className="text-slate-500 font-bold mb-1">我們要推什麼？</p>
              <p className="text-2xl font-bold">我們要推的行動是：______</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4">
            <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <p className="text-slate-500 font-bold mb-1">什麼時候做？誰做？</p>
              <p className="text-2xl font-bold">在______情境，由______開始</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4">
            <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <p className="text-slate-500 font-bold mb-1">怎麼讓大家一起做？</p>
              <p className="text-2xl font-bold">我們會用______方式推動</p>
            </div>
          </div>
        </div>
      ),
      notes: "這是微倡議的核心設計框架。",
      bg: "bg-slate-100"
    },
    {
      id: 10,
      title: "⏱ 小組時間",
      icon: <Timer className="w-16 h-16 text-emerald-600 mb-6" />,
      content: (
        <div className="grid grid-cols-3 gap-8 text-center text-2xl font-bold">
          <div className="p-8 bg-white rounded-2xl shadow-md">討論</div>
          <div className="p-8 bg-white rounded-2xl shadow-md">寫下來</div>
          <div className="p-8 bg-white rounded-2xl shadow-md">準備分享</div>
        </div>
      ),
      notes: "給予小組充分時間進行具體規劃。",
      bg: "bg-white"
    },
    {
      id: 11,
      title: "現在，我們再往前一步",
      content: (
        <div className="text-center space-y-8">
          <div className="p-10 bg-emerald-900 text-white rounded-[3rem] shadow-2xl">
            <h3 className="text-5xl font-black mb-6 flex items-center justify-center">
              <UserPlus className="mr-4 text-emerald-400" /> 讓別人願意加入
            </h3>
            <p className="text-2xl text-emerald-200">單打獨鬥很累，群體行動才是文化</p>
          </div>
        </div>
      ),
      notes: "行動後的下一步是倡議。",
      bg: "bg-white"
    },
    {
      id: 12,
      title: "請完成這三句話",
      icon: <Megaphone className="w-16 h-16 text-amber-500 mb-6" />,
      content: (
        <div className="space-y-6 text-3xl font-medium w-full max-w-3xl">
          <p className="p-6 bg-amber-50 rounded-xl border-l-8 border-amber-400">👉 在我們的職場中，常常發生______</p>
          <p className="p-6 bg-amber-50 rounded-xl border-l-8 border-amber-400">👉 所以我們決定從______開始</p>
          <p className="p-6 bg-amber-50 rounded-xl border-l-8 border-amber-400 font-bold text-amber-900 underline">👉 我們邀請大家一起______</p>
        </div>
      ),
      notes: "這是「肥皂箱演講」的腳本模版。",
      bg: "bg-white"
    },
    {
      id: 13,
      title: "舉個例子",
      content: (
        <div className="p-10 bg-slate-900 text-white rounded-3xl shadow-xl max-w-4xl w-full">
          <div className="space-y-6 text-2xl">
            <p className="text-slate-400">👉 常發生新人不敢發問</p>
            <p className="text-emerald-400 font-bold">👉 我們決定從主管主動詢問開始</p>
            <p className="text-white text-3xl font-black italic underline decoration-emerald-500">👉 我們邀請大家讓新人敢開口</p>
          </div>
        </div>
      ),
      notes: "範例可以幫助學員理解具體程度。",
      bg: "bg-white"
    },
    {
      id: 14,
      title: "這不是報告",
      content: (
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-5xl">📄</div>
            <p className="text-slate-400 line-through text-2xl">報告</p>
          </div>
          <ArrowRight className="text-slate-300 w-12 h-12 hidden md:block" />
          <div className="text-center space-y-4">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-5xl animate-pulse">🤝</div>
            <p className="text-emerald-600 font-bold text-3xl">邀請與行動</p>
          </div>
        </div>
      ),
      notes: "心態的轉變會決定表達的感染力。",
      bg: "bg-white"
    },
    {
      id: 15,
      title: "今天你們做了一件很重要的事",
      icon: <Sprout className="w-20 h-20 text-emerald-600 mb-6" />,
      content: (
        <div className="text-center space-y-10">
          <h3 className="text-6xl font-black text-slate-800">找到一個可以開始的地方</h3>
          <div className="p-8 bg-slate-100 rounded-2xl text-2xl italic text-slate-500 max-w-2xl mx-auto">
            「文化不會因為大家同意而改變，而是因為有人開始做」
          </div>
        </div>
      ),
      notes: "最後的信心建立，肯定小組的產出。",
      bg: "bg-white"
    },
    {
      id: 16,
      title: "接下來",
      content: (
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <p className="text-4xl text-slate-400">讓更多人願意跟你一起做</p>
            <h2 className="text-8xl font-black text-emerald-950 tracking-tighter">🎤 我的肥皂箱</h2>
          </div>
          <div className="inline-flex items-center space-x-4 px-10 py-5 bg-emerald-600 text-white rounded-full font-bold text-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span>開始發表</span>
            <Megaphone />
          </div>
        </div>
      ),
      notes: "「你們等一下要做的，就是讓別人願意加入」",
      bg: "bg-emerald-50"
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
    <div className={`min-h-screen ${slide.bg} transition-colors duration-700 flex flex-col font-sans overflow-hidden text-slate-900`}>
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200/20 z-50">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <header className="px-8 py-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">Part 3: Seedlings of Change</span>
        </div>
        <div className="text-xs font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-12 relative">
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center">
          
          {slide.type === "cover" ? (
            <div className="text-center text-white space-y-10 py-12">
              <Hammer className="w-20 h-20 text-emerald-400 mx-auto opacity-80" />
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter">
                {slide.title}
              </h1>
              <div className="space-y-4">
                <p className="text-3xl md:text-4xl font-light text-emerald-200 tracking-widest">
                  {slide.subtitle}
                </p>
                <p className="text-xl text-emerald-500 font-bold uppercase tracking-[0.3em]">50 Min Action Workshop</p>
              </div>
              <div className="h-1.5 w-32 bg-emerald-500 mx-auto mt-16"></div>
            </div>
          ) : (
            <>
              {slide.icon && <div className="mb-6">{slide.icon}</div>}
              <h2 className={`text-4xl md:text-6xl font-black mb-16 text-center leading-tight ${slide.bg === 'bg-emerald-950' ? 'text-white' : 'text-slate-800'}`}>
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
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all shadow-lg ${showNotes ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <MessageCircle size={20} />
            <span>💬 講者備註</span>
          </button>

          {showNotes && (
            <div className="absolute bottom-full right-0 mb-4 w-80 p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-2 fade-in">
              <div className="text-xs font-bold text-emerald-500 mb-2 uppercase tracking-widest flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Presenter Guide
              </div>
              <p className="text-lg leading-relaxed font-medium">{slide.notes}</p>
            </div>
          )}
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-8 { from { transform: translateY(3rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-from-bottom-2 { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation: var(--anim-name) var(--anim-duration, 700ms) cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { --anim-name: fade-in; }
        .slide-in-from-bottom-8 { --anim-name: slide-in-from-bottom-8; }
        .slide-in-from-bottom-2 { --anim-name: slide-in-from-bottom-2; }
      `}} />
    </div>
  );
};

export default App;