# 🛠️ 為什麼會看到原始碼？該如何解決？

當您使用 `window.open('https://github.com/.../NursingExperience.jsx')` 時，瀏覽器會直接前往 GitHub 的原始碼倉庫，所以您看到的是程式碼本身，而不是被渲染出來的簡報畫面。

要讓簡報順利「播放」，我們必須讓 `App.jsx` 負責統籌，把那三個檔案當作「組件」匯入進來，透過按鈕點擊來切換畫面。當您執行 `npm run deploy` 時，Vite 就會把這些檔案全部打包成一個能順利互動的網頁。

### 🚀 最終修復步驟

請打開您 GitHub 上或本地端 VS Code 裡的 **`src/App.jsx`** 檔案，將裡面的所有內容刪除，並**完整貼上**以下這段程式碼：

```
import React, { useState } from 'react';
import { 
  ClipboardList, Film, Sprout, ArrowRight, Award, Home
} from 'lucide-react';

// 1. 匯入您的三個實體簡報檔案
import NursingExperience from './presentations/NursingExperience';
import NursingAction from './presentations/NursingAction';
import SowingAction from './presentations/SowingAction';

const ORG_INFO = "主辦單位：中華民國護理師護士公會全國聯合會";
const FACILITATOR_INFO = "Facilitator：奇美醫療財團法人奇美醫院護理部 李穎俐督導";

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
                /* 2. 將連結改回狀態切換，這樣才會在同一個網頁內渲染簡報 */
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

const App = () => {
  const [view, setView] = useState('menu');
  const handleBack = () => setView('menu');

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-blue-100">
      {/* 3. 根據目前的 view 狀態，決定要渲染哪一個組件 */}
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
```

### ✅ 後續動作

在 GitHub 上儲存上述 `App.jsx` 的更改，或是在您的電腦上執行：

```
git add .
git commit -m "改回內部組件渲染模式"
git push origin main
npm run deploy
```

等待 1~2 分鐘後重新整理您的線上網頁，點擊卡片時，就會直接在同一個網頁流暢地開啟播放簡報了！