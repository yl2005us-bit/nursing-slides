import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Film, Sprout, ArrowRight, Award, Home,
  ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, Eye, 
  CheckCircle2, Target, Zap, User, AlertCircle, Info, 
  BarChart3, HelpCircle, Star, Clock, Play, Users, 
  Lightbulb, UserCheck, Hammer, XCircle, Timer, 
  UserPlus, Megaphone, Milestone
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
  const isDarkBg = slide.bg.includes('900') || slide.bg.includes('black') || slide.bg.includes('950');

  return (
    <div className={`fixed inset-0 ${slide.bg} transition-colors duration-700 flex flex-col font-sans overflow-y-auto text-slate-900 z-50`}>
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200/20 z-50">
        <div className={`h-full ${themeColors[accentColor]} transition-all duration-300`} style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
      </div>

      <header className="px-8 py-6 flex justify-between items-center z-10 mt-2">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${themeColors[accentColor]}`}></div>
          <span className={`text-sm font-bold tracking-widest uppercase ${isDarkBg ? 'text-slate-400' : 'text-slate-500'}`}>{workshopTitle}</span>
        </div>
        <div className="text-xs font-bold text-slate-400 border border-slate-200/30 px-3 py-1 rounded-full">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-12 relative">
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
          {slide.type === "cover" ? (
            <div className="text-center text-white space-y-8 py-12">
              {slide.icon && <div className="mb-6 flex justify-center opacity-80">{slide.icon}</div>}
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 animate-in zoom-in duration-1000">
                {slide.title}
              </h1>
              <p className="text-2xl md:text-4xl font-light text-slate-300 tracking-widest">
                {slide.subtitle}
              </p>
              <div className={`h-1.5 w-32 ${themeColors[accentColor]} mx-auto mt-12`}></div>
            </div>
          ) : (
            <>
              {slide.icon && <div className="mb-6 flex justify-center">{slide.icon}</div>}
              <h2 className={`text-4xl md:text-6xl font-black mb-12 text-center leading-tight ${isDarkBg ? 'text-white' : 'text-slate-800'}`}>
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
          <button onClick={onBack} className={`flex items-center space-x-2 px-6 py-4 rounded-full transition-all shadow-lg font-bold text-sm mr-4 ${isDarkBg ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'}`}>
            <Home size={20} />
            <span>返回大廳</span>
          </button>
          <button onClick={prevSlide} disabled={currentSlide === 0} className={`p-4 rounded-full transition-all ${currentSlide === 0 ? 'opacity-20 text-slate-400' : 'bg-white shadow-xl text-slate-800 hover:scale-110 active:scale-95'}`}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className={`p-4 rounded-full transition-all ${currentSlide === slides.length - 1 ? 'opacity-20 text-slate-400' : 'bg-white shadow-xl text-slate-800 hover:scale-110 active:scale-95'}`}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="relative">
          <button onClick={() => setShowNotes(!showNotes)} className={`flex items-center space-x-2 px-6 py-4 rounded-full font-bold transition-all shadow-lg ${showNotes ? `${themeColors[accentColor]} text-white` : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}>
            <MessageCircle size={20} />
            <span className="text-sm">講者備註</span>
          </button>
          {showNotes && (
            <div className="absolute bottom-full right-0 mb-4 w-80 p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-2 fade-in text-left">
              <div className={`text-xs font-bold mb-2 uppercase tracking-widest flex items-center ${accentColor === 'blue' ? 'text-blue-400' : accentColor === 'yellow' ? 'text-yellow-500' : 'text-emerald-500'}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${themeColors[accentColor]}`}></div>
                Presenter Guide
              </div>
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
    { id: 1, title: "我們與惡的距離", subtitle: "那些不友善的護理職場經驗", type: "cover", notes: "今天這一段，我們不先談理想，我們先談現實。", bg: "bg-slate-900" },
    { id: 2, title: "今天，我們先做一件事", content: (<div className="flex flex-col items-center justify-center space-y-8 text-center"><p className="text-3xl text-slate-400 line-through">不是解決問題</p><div className="flex items-center space-x-4"><div className="h-1 w-12 bg-blue-600"></div><p className="text-6xl font-bold text-blue-600">看見問題</p><div className="h-1 w-12 bg-blue-600"></div></div></div>), notes: "今天不是要找答案，而是要看見那些我們平常沒說出口的事情。", bg: "bg-slate-50" },
    { id: 3, title: "這是一個安全的空間", icon: <ShieldCheck className="w-16 h-16 text-emerald-500 mb-6" />, content: (<ul className="space-y-6 text-2xl"><li className="flex items-center space-x-4"><CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" /><span>不需寫名字</span></li><li className="flex items-center space-x-4"><CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" /><span>不評論他人</span></li><li className="flex items-center space-x-4"><CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" /><span>分享的是經驗，不是對錯</span></li></ul>), notes: "這裡不是評價誰對誰錯，而是讓經驗被看見。", bg: "bg-white" },
    { id: 4, title: "破冰任務：三句話認識你", icon: <User className="w-12 h-12 text-blue-500 mb-4" />, content: (<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"><div className="p-8 bg-blue-50 rounded-2xl border-2 border-blue-100"><div className="text-4xl font-bold text-blue-500 mb-4">1</div><h3 className="text-xl font-bold mb-2">我是誰</h3><p className="text-slate-600">單位 ＋ 角色</p></div><div className="p-8 bg-blue-50 rounded-2xl border-2 border-blue-100"><div className="text-4xl font-bold text-blue-500 mb-4">2</div><h3 className="text-xl font-bold mb-2">一個詞</h3><p className="text-slate-600">形容職場氛圍</p></div><div className="p-8 bg-blue-50 rounded-2xl border-2 border-blue-100"><div className="text-4xl font-bold text-blue-500 mb-4">3</div><h3 className="text-xl font-bold mb-2">一個畫面</h3><p className="text-slate-600">描繪這個詞</p></div></div>), notes: "不用講很多，我們先理解彼此看到的世界。", bg: "bg-white" },
    { id: 5, title: "剛剛那些詞，其實在說…", content: (<div className="text-center space-y-8"><p className="text-4xl text-slate-500">👉 那就是</p><p className="text-8xl font-black text-slate-900 tracking-tighter">「文化」</p></div>), notes: "每個人看到的不同，但其實都在描述同一件事——文化。", bg: "bg-slate-100" },
    { id: 6, title: "接下來，我們要更靠近真實", icon: <ClipboardList className="w-16 h-16 text-slate-700 mb-6" />, content: (<div className="text-center"><h3 className="text-5xl font-bold text-slate-800">✍️ 請寫下你的經驗</h3></div>), notes: "我們要從「感覺」進到「經驗」。", bg: "bg-white" },
    { id: 7, title: "請寫下兩種經驗", content: (<div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center"><div className="flex-1 p-10 bg-yellow-200 shadow-xl transform -rotate-2 hover:rotate-0 transition-all rounded-sm min-h-[300px] flex flex-col justify-center"><p className="text-2xl font-bold text-yellow-800 leading-relaxed">🟡 我曾經被這樣不友善對待…</p></div><div className="flex-1 p-10 bg-blue-200 shadow-xl transform rotate-2 hover:rotate-0 transition-all rounded-sm min-h-[300px] flex flex-col justify-center"><p className="text-2xl font-bold text-blue-800 leading-relaxed">🔵 我曾經聽過最不友善的感受是…</p></div></div>), notes: "不用寫長句，一句話就好。", bg: "bg-slate-50" },
    { id: 8, title: "如果你一時想不到…", content: (<div className="flex flex-wrap justify-center gap-4 max-w-4xl">{["被責備", "不敢說話", "被忽略", "工作不公平", "情緒壓力", "被排擠", "承擔過多"].map((item, index) => (<span key={index} className="px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-xl text-slate-600 shadow-sm">{item}</span>))}</div>), notes: "給予一些關鍵字引導思考。", bg: "bg-slate-50" },
    { id: 9, title: "👥 小組交流", content: (<div className="space-y-8 text-3xl"><div className="flex items-center space-x-6 p-6 bg-blue-50 rounded-xl border-l-8 border-blue-400"><span className="text-4xl">👉</span><p className="font-bold">每人分享一張</p></div><div className="flex items-center space-x-6 p-6 bg-blue-50 rounded-xl border-l-8 border-blue-400"><span className="text-4xl">👉</span><p className="font-bold text-blue-600">選一個最有感的</p></div></div>), notes: "不用全部講，講一個最有感的就好。", bg: "bg-white" },
    { id: 10, title: "請將便利貼貼上", content: (<div className="grid grid-cols-2 gap-4 w-full h-[400px]"><div className="border-4 border-dashed border-slate-300 rounded-3xl flex items-center justify-center bg-slate-50"><span className="text-3xl font-bold text-slate-400">左側：我經歷過</span></div><div className="border-4 border-dashed border-slate-300 rounded-3xl flex items-center justify-center bg-slate-50"><span className="text-3xl font-bold text-slate-400">右側：我聽過</span></div></div>), notes: "引導參與者上台互動。", bg: "bg-white" },
    { id: 11, title: "👀 請觀察", icon: <Eye className="w-12 h-12 text-slate-700 mb-4" />, content: (<div className="space-y-8 text-2xl w-full max-w-2xl"><div className="flex items-center justify-between border-b pb-4"><span>1️⃣ 哪一類最多？</span><div className="w-24 h-2 bg-slate-200 rounded-full"></div></div><div className="flex items-center justify-between border-b pb-4"><span>2️⃣ 有沒有重複情境？</span><div className="w-24 h-2 bg-slate-200 rounded-full"></div></div><div className="flex items-center justify-between border-b pb-4"><span>3️⃣ 左右兩邊是否很像？</span><div className="w-24 h-2 bg-slate-200 rounded-full"></div></div></div>), notes: "先觀察，不評論。", bg: "bg-white" },
    { id: 12, title: "這些現象，叫什麼？", content: (<div className="text-center space-y-6"><p className="text-5xl font-bold text-slate-800">👉 幫這些行為取一個名字</p><div className="h-1 w-full bg-slate-200"></div><p className="text-slate-500">如果它一直發生，就會變成文化。</p></div>), notes: "如果它一直發生，就會變成文化。", bg: "bg-white" },
    { id: 13, title: "可能出現的文化", content: (<div className="grid grid-cols-2 gap-6 max-w-4xl w-full">{["忍耐文化", "沉默文化", "學長姐文化", "責備文化"].map((culture) => (<div key={culture} className="p-8 bg-red-50 text-red-700 rounded-2xl border-2 border-red-100 flex items-center justify-center text-3xl font-bold shadow-sm">{culture}</div>))}</div>), notes: "這是一些常見的職場文化病徵。", bg: "bg-white" },
    { id: 14, title: "我們剛剛看到的是…", content: (<div className="space-y-12"><div className="flex items-center space-x-6 opacity-50"><AlertCircle className="w-10 h-10" /><p className="text-4xl">不是個別事件</p></div><div className="flex items-center space-x-6"><Info className="w-12 h-12 text-blue-600" /><p className="text-6xl font-black text-blue-600">而是會被傳承的文化</p></div></div>), notes: "這不是某幾個人的問題，而是一種文化。", bg: "bg-slate-50" },
    { id: 15, title: "🤔 值得思考的是", icon: <HelpCircle className="w-16 h-16 text-blue-600 mb-6" />, content: (<div className="space-y-10 text-3xl font-medium max-w-3xl"><p className="leading-relaxed border-l-4 border-blue-600 pl-6">這些文化是怎麼留下來的？</p><p className="leading-relaxed border-l-4 border-blue-600 pl-6 text-blue-600">我們能不能讓它在我們這一代停止？</p></div>), notes: "這是一個反思的起點。", bg: "bg-white" },
    { id: 16, title: "接下來，我們換一個角度", content: (<div className="flex w-full max-w-5xl h-[400px] rounded-3xl overflow-hidden shadow-2xl"><div className="flex-1 bg-slate-200 p-12 flex flex-col justify-center items-center text-center"><MessageCircle className="w-16 h-16 text-slate-400 mb-4" /><h4 className="text-2xl font-bold mb-2">剛剛</h4><p className="text-slate-600">我們用「感覺」理解職場</p></div><div className="flex-1 bg-blue-600 p-12 flex flex-col justify-center items-center text-center text-white"><BarChart3 className="w-16 h-16 mb-4" /><h4 className="text-2xl font-bold mb-2 text-blue-100">接下來</h4><p className="text-white text-xl">我們用「數據」理解</p></div></div>), notes: "當感覺遇到數據，很多事情會變得很清楚。", bg: "bg-white" }
  ];
  return <SlidePlayer slides={slides} accentColor="blue" onBack={onBack} workshopTitle="Part 1: Nursing Experience" />;
};

// --- 組件 2：新天堂樂園 (NursingAction) ---
const NursingAction = ({ onBack }) => {
  const slides = [
    { id: 1, title: "新天堂樂園", subtitle: "演出你想要的護理職場", type: "cover", icon: <Film className="w-20 h-20 text-yellow-500 mx-auto opacity-80" />, notes: "「但如果我們只停在這裡，是不會改變的」", bg: "bg-black" },
    { id: 2, title: "如果文化要改變", content: (<div className="flex flex-col items-center space-y-8 text-center"><p className="text-3xl text-slate-400">不是用看的，不是用說的</p><div className="flex items-center space-x-6"><div className="h-px w-16 bg-yellow-500"></div><p className="text-7xl font-black text-yellow-500 animate-pulse">是用「做的」</p><div className="h-px w-16 bg-yellow-500"></div></div></div>), notes: "「文化，不是理解之後就會改變。是有人開始做不同的事，才會改變」", bg: "bg-slate-900" },
    { id: 3, title: "接下來，你們要做一件事", icon: <Film className="w-20 h-20 text-yellow-500 mb-6" />, content: (<div className="bg-white/10 p-12 rounded-full border-4 border-dashed border-yellow-500/50"><h3 className="text-6xl font-bold text-white">🎭 演出一個職場情境</h3></div>), notes: "「不是討論，是演出」", bg: "bg-slate-900" },
    { id: 4, title: "每組要做兩件事", content: (<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl"><div className="p-10 bg-slate-800 rounded-3xl border-2 border-slate-700"><h3 className="text-3xl font-bold text-slate-400 mb-6">🎬 第一段：現況版</h3><p className="text-2xl text-slate-300">👉 現在常發生的情境</p></div><div className="p-10 bg-yellow-500 rounded-3xl shadow-2xl"><h3 className="text-3xl font-bold text-slate-900 mb-6">🎬 第二段：理想版</h3><p className="text-2xl text-slate-900 font-bold">👉 你希望的樣子</p></div></div>), notes: "對比現況與理想，讓改變被看見。", bg: "bg-slate-900" },
    { id: 5, title: "請選一個情境", content: (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl text-xl">{["新人犯錯被指正", "忙碌時同事需要幫忙", "交班溝通不良", "被病人情緒影響", "同事之間出現衝突"].map((sc, i) => (<div key={i} className="p-6 bg-white shadow-md rounded-xl border-l-4 border-yellow-500 flex items-center">{sc}</div>))}<div className="p-6 bg-slate-100 rounded-xl border-l-4 border-slate-300 flex items-center italic text-slate-400">自選最有感的情境...</div></div>), notes: "「選一個你們最有感、最常發生的」", bg: "bg-slate-50" },
    { id: 6, title: "🎬 第一段：現況版", content: (<div className="space-y-8 text-3xl text-center"><p className="p-6 bg-red-50 text-red-700 rounded-2xl">👉 語氣怎麼樣？</p><p className="p-6 bg-red-50 text-red-700 rounded-2xl">👉 會說什麼話？</p><p className="p-6 bg-red-50 text-red-700 rounded-2xl">👉 氣氛如何？</p></div>), notes: "呈現最真實、甚至有點不友善的當下。", bg: "bg-white" },
    { id: 7, title: "🎬 第二段：理想版", icon: <Star className="w-12 h-12 text-yellow-500 mb-4" />, content: (<div className="space-y-8 text-3xl text-center font-bold"><p className="p-6 bg-emerald-50 text-emerald-700 rounded-2xl">👉 誰做了不同的事？</p><p className="p-6 bg-emerald-50 text-emerald-700 rounded-2xl">👉 說了什麼話？</p><p className="p-6 bg-emerald-50 text-emerald-700 rounded-2xl">👉 有什麼支持行為？</p></div>), notes: "核心在於「不同」的行為產生的連鎖反應。", bg: "bg-white" },
    { id: 8, title: "重要提醒", icon: <Target className="w-16 h-16 text-red-500 mb-6" />, content: (<div className="text-center space-y-10"><p className="text-4xl text-slate-400">理想版不是完美</p><p className="text-6xl font-black text-slate-900 border-b-8 border-yellow-400 pb-4">是「可以做到的一點點改變」</p></div>), notes: "「不要演很理想，要演『做得到』」", bg: "bg-white" },
    { id: 9, title: "⏱ 時間安排", icon: <Clock className="w-12 h-12 text-blue-500 mb-4" />, content: (<div className="flex space-x-12"><div className="text-center"><div className="text-6xl font-black text-blue-600 mb-2">10</div><div className="text-xl text-slate-500">設計分鐘</div></div><div className="h-16 w-px bg-slate-300 self-center"></div><div className="text-center"><div className="text-6xl font-black text-blue-600 mb-2">N</div><div className="text-xl text-slate-500">演出分鐘 / 組</div></div></div>), notes: "控制節奏，重點在於演出的張力。", bg: "bg-white" },
    { id: 10, title: "👀 請觀察", content: (<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-2xl"><div className="p-10 bg-slate-50 rounded-3xl border-2 border-slate-100 flex items-center space-x-6"><span className="text-4xl">1️⃣</span><span>哪一句話讓你感覺不一樣？</span></div><div className="p-10 bg-slate-50 rounded-3xl border-2 border-slate-100 flex items-center space-x-6"><span className="text-4xl">2️⃣</span><span>哪一個行為最關鍵？</span></div></div>), notes: "給予台下觀眾明確的觀察任務。", bg: "bg-white" },
    { id: 11, title: "開始演出", content: (<div className="flex flex-col items-center"><Play className="w-32 h-32 text-red-600 animate-pulse mb-8" /><h3 className="text-5xl font-bold text-slate-800">👉 Show Time！</h3></div>), notes: "隨機抽籤或指定小組上台。", bg: "bg-white" },
    { id: 12, title: "你剛剛看到什麼？", icon: <Users className="w-12 h-12 text-blue-500 mb-4" />, content: (<div className="space-y-12 text-3xl font-bold text-center"><p className="text-blue-600">👉 哪一個改變最有感？</p><div className="h-px w-24 bg-slate-300 mx-auto"></div><p className="text-slate-400">為什麼？</p></div>), notes: "引導回饋，發掘微小改變帶來的巨大心理差異。", bg: "bg-white" },
    { id: 13, title: "剛剛的差別是什麼？", content: (<div className="space-y-12 text-center"><div className="flex items-center justify-center space-x-6 opacity-30"><p className="text-4xl line-through">不是制度改變</p></div><div className="flex flex-col items-center"><Lightbulb className="w-16 h-16 text-yellow-500 mb-4" /><p className="text-7xl font-black text-slate-900 underline decoration-yellow-400">是「行為」改變</p></div></div>), notes: "「文化的差別，來自於行為的差別」", bg: "bg-slate-50" },
    { id: 14, title: "誰最有影響力？", icon: <UserCheck className="w-16 h-16 text-slate-800 mb-6" />, content: (<div className="bg-slate-900 p-12 rounded-3xl text-white text-center"><h3 className="text-5xl font-bold text-yellow-500 mb-6">👉 很多時候，是主管</h3><p className="text-2xl text-slate-400">一句話、一個反應，就會影響整個文化</p></div>), notes: "「一句話、一個反應，就會影響整個文化」", bg: "bg-white" },
    { id: 15, title: "文化是什麼？", content: (<div className="space-y-8 text-4xl font-bold text-slate-800 max-w-2xl"><div className="flex items-center space-x-6"><span className="text-blue-500">●</span><p>是每天怎麼說話</p></div><div className="flex items-center space-x-6"><span className="text-blue-500">●</span><p>是壓力來時怎麼做</p></div></div>), notes: "文化不再抽象，而是具體的動作。", bg: "bg-white" },
    { id: 16, title: "那接下來的問題是…", content: (<div className="text-center space-y-10"><p className="text-5xl font-bold text-slate-700">我們怎麼讓這些行為真的發生？</p><div className="flex items-center justify-center space-x-4 text-blue-600 animate-bounce"><span className="text-2xl font-bold">前往下一堂：行動方案</span><ArrowRight /></div></div>), notes: "「接下來，我們要把這些變成行動」", bg: "bg-blue-50" }
  ];
  return <SlidePlayer slides={slides} accentColor="yellow" onBack={onBack} workshopTitle="Part 2: New Cinema Paradiso" />;
};

// --- 組件 3：種瓜得瓜 (SowingAction) ---
const SowingAction = ({ onBack }) => {
  const slides = [
    { id: 1, title: "種瓜得瓜", subtitle: "要怎麼收穫，先怎麼栽", type: "cover", icon: <Hammer className="w-20 h-20 text-emerald-400 mx-auto opacity-80" />, notes: "「但如果只停在這裡，改變還不會發生」", bg: "bg-emerald-950" },
    { id: 2, title: "剛剛我們做了一件很重要的事", icon: <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />, content: (<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"><div className="p-10 bg-white shadow-xl rounded-3xl border-t-8 border-emerald-500"><p className="text-3xl font-bold text-slate-700">👉 我們看見了不同的做法</p></div><div className="p-10 bg-white shadow-xl rounded-3xl border-t-8 border-emerald-500"><p className="text-3xl font-bold text-slate-700">👉 我們演出了理想的樣子</p></div></div>), notes: "「但如果只停在這裡，改變還不會發生」", bg: "bg-slate-50" },
    { id: 3, title: "接下來，我們要更往前一步", icon: <Milestone className="w-16 h-16 text-amber-600 mb-6" />, content: (<div className="text-center space-y-8"><p className="text-4xl text-slate-500">把「演出」變成</p><div className="inline-block px-12 py-6 bg-amber-500 text-white rounded-full text-7xl font-black shadow-2xl animate-bounce">「行動」</div></div>), notes: "「我們要讓剛剛那些好的行為，真的在職場發生」", bg: "bg-white" },
    { id: 4, title: "今天不做大計畫", content: (<div className="space-y-8 text-4xl text-slate-400 font-medium text-center"><p className="line-through">不求完美</p><p className="line-through">不求完整</p><div className="h-px w-24 bg-slate-200 mx-auto"></div><p className="text-6xl font-black text-emerald-600">只做一件事</p></div>), notes: "「聚焦在最核心、最有感的那一件事上。」", bg: "bg-white" },
    { id: 5, title: "⭐ 小到可以明天開始", icon: <Zap className="w-20 h-20 text-amber-500 mb-6" />, content: (<div className="p-12 bg-amber-50 rounded-[3rem] border-4 border-dashed border-amber-200 text-center max-w-2xl"><p className="text-3xl leading-relaxed text-amber-900 italic">「如果需要準備一個月，那就太大了」</p></div>), notes: "改變必須具備即時性，讓大家感受到「原來這麼簡單」。", bg: "bg-white" },
    { id: 6, title: "你們的任務", content: (<div className="space-y-8 text-3xl font-bold"><div className="flex items-center space-x-6 p-8 bg-white shadow-lg rounded-2xl border-l-8 border-emerald-600"><span className="text-emerald-600">Step 1</span><p>從剛剛的演出中</p></div><div className="flex items-center space-x-6 p-8 bg-emerald-600 text-white shadow-lg rounded-2xl"><span className="text-emerald-200">Step 2</span><p>選出一個最值得保留的行為</p></div></div>), notes: "「不是文化，是一句話或一個行為」", bg: "bg-slate-50" },
    { id: 7, title: "什麼叫「行動」？", content: (<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">{["「我先幫你這個」", "「我們一起看一下」", "「你還好嗎？」"].map((text, i) => (<div key={i} className="p-8 bg-white border-2 border-emerald-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-center text-2xl font-bold text-emerald-800">{text}</div>))}</div>), notes: "這些是具體可執行的最小單位。", bg: "bg-emerald-50" },
    { id: 8, title: "請避免 vs. 改成", content: (<div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl"><div className="flex-1 p-10 bg-red-50 rounded-3xl border-2 border-red-100"><h3 className="text-red-600 text-2xl font-bold mb-6 flex items-center"><XCircle className="mr-2" /> ❌ 避免抽象</h3><ul className="space-y-4 text-xl text-red-400 font-medium"><li>提升文化</li><li>建立制度</li><li>改善環境</li></ul></div><div className="flex-1 p-10 bg-emerald-50 rounded-3xl border-2 border-emerald-100"><h3 className="text-emerald-600 text-2xl font-bold mb-6 flex items-center"><CheckCircle2 className="mr-2" /> ✅ 改成具體</h3><ul className="space-y-4 text-xl text-emerald-800 font-bold"><li>一句話</li><li>一個動作</li></ul></div></div>), notes: "具體化是行動成功的關鍵。", bg: "bg-white" },
    { id: 9, title: "請完成三件事", content: (<div className="space-y-6 w-full max-w-4xl"><div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4"><div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div><div><p className="text-slate-500 font-bold mb-1">我們要推什麼？</p><p className="text-2xl font-bold">我們要推的行動是：______</p></div></div><div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4"><div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div><div><p className="text-slate-500 font-bold mb-1">什麼時候做？誰做？</p><p className="text-2xl font-bold">在______情境，由______開始</p></div></div><div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start space-x-4"><div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div><div><p className="text-slate-500 font-bold mb-1">怎麼讓大家一起做？</p><p className="text-2xl font-bold">我們會用______方式推動</p></div></div></div>), notes: "這是微倡議的核心設計框架。", bg: "bg-slate-100" },
    { id: 10, title: "⏱ 小組時間 (20分鐘)", icon: <Timer className="w-16 h-16 text-emerald-600 mb-6" />, content: (<div className="grid grid-cols-3 gap-8 text-center text-2xl font-bold"><div className="p-8 bg-white rounded-2xl shadow-md">討論</div><div className="p-8 bg-white rounded-2xl shadow-md">寫下來</div><div className="p-8 bg-white rounded-2xl shadow-md">準備分享</div></div>), notes: "給予小組充分時間進行具體規劃。", bg: "bg-white" },
    { id: 11, title: "現在，我們再往前一步", content: (<div className="text-center space-y-8"><div className="p-10 bg-emerald-900 text-white rounded-[3rem] shadow-2xl"><h3 className="text-5xl font-black mb-6 flex items-center justify-center"><UserPlus className="mr-4 text-emerald-400" /> 讓別人願意加入</h3><p className="text-2xl text-emerald-200">單打獨鬥很累，群體行動才是文化</p></div></div>), notes: "行動後的下一步是倡議。", bg: "bg-white" },
    { id: 12, title: "請完成這三句話", icon: <Megaphone className="w-16 h-16 text-amber-500 mb-6" />, content: (<div className="space-y-6 text-3xl font-medium w-full max-w-3xl"><p className="p-6 bg-amber-50 rounded-xl border-l-8 border-amber-400">👉 在我們的職場中，常常發生______</p><p className="p-6 bg-amber-50 rounded-xl border-l-8 border-amber-400">👉 所以我們決定從______開始</p><p className="p-6 bg-amber-50 rounded-xl border-l-8 border-amber-400 font-bold text-amber-900 underline">👉 我們邀請大家一起______</p></div>), notes: "這是「肥皂箱演講」的腳本模版。", bg: "bg-white" },
    { id: 13, title: "舉個例子", content: (<div className="p-10 bg-slate-900 text-white rounded-3xl shadow-xl max-w-4xl w-full"><div className="space-y-6 text-2xl"><p className="text-slate-400">👉 常發生新人不敢發問</p><p className="text-emerald-400 font-bold">👉 我們決定從主管主動詢問開始</p><p className="text-white text-3xl font-black italic underline decoration-emerald-500">👉 我們邀請大家讓新人敢開口</p></div></div>), notes: "範例可以幫助學員理解具體程度。", bg: "bg-white" },
    { id: 14, title: "這不是報告", content: (<div className="flex flex-col md:flex-row gap-12 items-center"><div className="text-center space-y-4"><div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-5xl">📄</div><p className="text-slate-400 line-through text-2xl">報告</p></div><ArrowRight className="text-slate-300 w-12 h-12 hidden md:block" /><div className="text-center space-y-4"><div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-5xl animate-pulse">🤝</div><p className="text-emerald-600 font-bold text-3xl">邀請與行動</p></div></div>), notes: "心態的轉變會決定表達的感染力。", bg: "bg-white" },
    { id: 15, title: "今天你們做了一件很重要的事", icon: <Sprout className="w-20 h-20 text-emerald-600 mb-6" />, content: (<div className="text-center space-y-10"><h3 className="text-6xl font-black text-slate-800">找到一個可以開始的地方</h3><div className="p-8 bg-slate-100 rounded-2xl text-2xl italic text-slate-500 max-w-2xl mx-auto">「文化不會因為大家同意而改變，而是因為有人開始做」</div></div>), notes: "最後的信心建立，肯定小組的產出。", bg: "bg-white" },
    { id: 16, title: "接下來", content: (<div className="text-center space-y-12"><div className="space-y-4"><p className="text-4xl text-slate-400">讓更多人願意跟你一起做</p><h2 className="text-8xl font-black text-emerald-950 tracking-tighter">🎤 我的肥皂箱</h2></div><div className="inline-flex items-center space-x-4 px-10 py-5 bg-emerald-600 text-white rounded-full font-bold text-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"><span>開始發表</span><Megaphone /></div></div>), notes: "「你們等一下要做的，就是讓別人願意加入」", bg: "bg-emerald-50" }
  ];
  return <SlidePlayer slides={slides} accentColor="emerald" onBack={onBack} workshopTitle="Part 3: Seedlings of Change" />;
};

// --- 主選單畫面組件 (MainMenu) ---
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

// --- App 主程式進入點 ---
const App = () => {
  const [view, setView] = useState('menu');

  const handleBack = () => setView('menu');

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-blue-100">
      {/* 根據 view 的狀態來決定顯示大廳，還是顯示那 16 頁的簡報 */}
      {view === 'menu' && <MainMenu onSelect={setView} />}
      {view === 'experience' && <NursingExperience onBack={handleBack} />}
      {view === 'action' && <NursingAction onBack={handleBack} />}
      {view === 'sowing' && <SowingAction onBack={handleBack} />}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { --anim-name: fade-in; }
      `}} />
    </div>
  );
};

export default App;