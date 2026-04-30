import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, Mic, Play, Download, Loader2, Sparkles, 
  Smartphone, Monitor, Clapperboard, Settings2, Check
} from 'lucide-react';

// Firebase Config (Mock Ready as requested)
const firebaseConfig = {
  apiKey: "AIzaSyDbZ4T8264CDQ5LSoH_4L0luB5VKQbiqkU",
  authDomain: "batrisi-latest-app.firebaseapp.com",
  databaseURL: "https://batrisi-latest-app-default-rtdb.firebaseio.com",
  projectId: "batrisi-latest-app",
  storageBucket: "batrisi-latest-app.firebasestorage.app",
  messagingSenderId: "175592360155",
  appId: "1:175592360155:web:ba95f9aba4558fda9d64fe",
  measurementId: "G-5N91PLG8LB"
};

const STYLES = ['Viral', 'Motivation', 'Romantic', 'Dark'];
const FORMATS = [
  { id: '9:16', label: 'Reel', icon: <Smartphone size={16} /> },
  { id: '16:9', label: 'Short', icon: <Monitor size={16} /> }
];

export default function App() {
  const [script, setScript] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Viral');
  const [format, setFormat] = useState('9:16');
  const [status, setStatus] = useState('idle'); // idle, generating, success
  const [videoUrl, setVideoUrl] = useState(null);
  
  const videoRef = useRef(null);

  const handleGenerate = async () => {
    if (!script.trim()) return;
    
    setStatus('generating');
    setVideoUrl(null);

    try {
      // MOCK API CALL: POST /api/generate
      /*
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script, style: selectedStyle, format })
      });
      const data = await response.json();
      */

      // Simulated Network Delay
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      // Simulated Response
      setVideoUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      setStatus('success');
    } catch (error) {
      console.error('Error generating video:', error);
      setStatus('idle');
    }
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `Keto_Reel_${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
      
      {/* Top Navigation */}
      <header className="h-16 border-b border-gray-200/60 bg-white/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Clapperboard className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Keto<span className="text-[#B91C1C]">.ai</span>
          </h1>
        </div>
        <div className="text-sm font-medium text-gray-500 hidden sm:block">
          Your AI Motion Designer
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Felix`} alt="Avatar" />
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 p-4 lg:p-8 flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left Panel: Controls (Inputs) */}
        <section className="w-full lg:w-[420px] flex flex-col gap-6 shrink-0">
          
          <div className="bg-white p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-1">Create Reel</h2>
              <p className="text-sm text-gray-500">Transform your script into a viral video</p>
            </div>

            {/* Format Toggle */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block flex items-center gap-2">
                <Settings2 size={14} /> Aspect Ratio
              </label>
              <div className="flex p-1 bg-gray-100/80 rounded-xl relative">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                      format === f.id ? 'text-black' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {f.icon} {f.label}
                    {format === f.id && (
                      <motion.div
                        layoutId="active-format"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selector */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                Visual Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between
                      ${selectedStyle === style 
                        ? 'bg-red-50 border-red-200 text-[#B91C1C]' 
                        : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {style}
                    {selectedStyle === style && <Check size={16} className="text-[#B91C1C]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Script Input */}
            <div className="mb-8">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                Your Script
              </label>
              <div className="relative rounded-2xl border border-gray-200 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.02)] transition-all duration-300 overflow-hidden">
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Paste your script or describe your concept here..."
                  className="w-full bg-transparent p-4 min-h-[180px] outline-none resize-none text-sm leading-relaxed placeholder:text-gray-400"
                />
                
                {/* Textarea Action Bar */}
                <div className="bg-white/50 border-t border-gray-100 backdrop-blur px-3 py-2 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Voice dictation">
                      <Mic size={16} />
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-[#B91C1C] transition-colors group">
                      <Wand2 size={16} className="group-hover:animate-pulse" />
                      <span className="text-xs font-medium">AI Enhance</span>
                    </button>
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    {script.length} chars
                  </span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={status === 'generating' || !script.trim()}
              className="w-full bg-black disabled:bg-gray-800 disabled:cursor-not-allowed text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium shadow-md shadow-black/10 transition-colors"
            >
              {status === 'generating' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles size={20} className={script.trim() ? "text-[#B91C1C]" : "text-gray-400"} />
                  Generate Video
                </>
              )}
            </motion.button>

          </div>
        </section>

        {/* Right Panel: Preview/Output Canvas */}
        <section className="flex-1 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden relative flex flex-col">
          
          {/* Canvas Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur z-10 absolute top-0 w-full">
            <span className="text-sm font-medium text-gray-600">Preview Canvas</span>
            <AnimatePresence>
              {status === 'success' && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={handleDownload}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Download size={16} />
                  Export
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-[#fafafa] bg-dot-pattern flex items-center justify-center p-8 pt-20">
            
            <AnimatePresence mode="wait">
              {/* Empty State */}
              {status === 'idle' && !videoUrl && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center max-w-sm text-gray-400"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Play size={32} className="text-gray-300 ml-1" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Awaiting Instructions</h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Write your script, select your style, and click Generate to see your kinetic typography reel here.
                  </p>
                </motion.div>
              )}

              {/* Generating State */}
              {status === 'generating' && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-[3px] border-gray-200 border-t-[#B91C1C]"
                    />
                    <Sparkles className="text-[#B91C1C] animate-pulse" size={28} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Animating typography...</h3>
                  <p className="text-sm text-gray-500 mt-2">Applying {selectedStyle.toLowerCase()} style frames</p>
                </motion.div>
              )}

              {/* Success / Video Player State */}
              {status === 'success' && videoUrl && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.2 }}
                  // Dynamic Aspect Ratio Styling
                  className={`relative bg-black rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center ring-1 ring-black/5
                    ${format === '9:16' ? 'w-full max-w-[340px] aspect-[9/16]' : 'w-full max-w-[700px] aspect-video'}
                  `}
                >
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay to make controls pop */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

      </main>
    </div>
  );
}
