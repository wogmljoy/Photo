
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Uploader } from './components/Uploader';
import { StylePreset, PhotoState } from './types';
import { transformPhoto } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<PhotoState>({
    original: null,
    transformed: null,
    isLoading: false,
    error: null,
  });

  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(StylePreset.FORMAL_SUIT);

  const handleUpload = useCallback((base64: string) => {
    setState(prev => ({ ...prev, original: base64, transformed: null, error: null }));
  }, []);

  const handleTransform = async () => {
    if (!state.original) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await transformPhoto(state.original, selectedStyle);
      setState(prev => ({
        ...prev,
        transformed: result,
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to transform image. Please try again."
      }));
    }
  };

  const handleDownload = () => {
    if (!state.transformed) return;
    const link = document.createElement('a');
    link.href = state.transformed;
    link.download = `resume-photo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Photos <span className="text-blue-600">In Seconds</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Transform any casual snapshot into a professional studio headshot ready for your next job application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">1</span>
                Choose Photo
              </h3>
              <Uploader onUpload={handleUpload} preview={state.original} />
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">2</span>
                Select Style
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(StylePreset).map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`
                      px-4 py-3 text-sm font-medium rounded-xl border transition-all
                      ${selectedStyle === style 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-[1.02]' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-slate-50'}
                    `}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </section>

            <button
              onClick={handleTransform}
              disabled={!state.original || state.isLoading}
              className={`
                w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                ${!state.original || state.isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]'}
              `}
            >
              {state.isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Generating Studio Quality...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  Generate Resume Photo
                </>
              )}
            </button>

            {state.error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-start gap-3 animate-pulse">
                <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                <div>
                  <p className="font-bold">Transformation failed</p>
                  <p>{state.error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Result Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-[2.5rem] p-6 lg:p-10 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
              {/* Background Glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>

              {!state.original && !state.transformed && !state.isLoading && (
                <div className="text-center text-slate-400">
                  <i className="fa-solid fa-image-portrait text-6xl mb-4 opacity-20"></i>
                  <p className="text-lg">Upload a photo to see the transformation</p>
                </div>
              )}

              {state.isLoading && (
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                    <i className="fa-solid fa-bolt text-3xl text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Enhancing Your Professional Look</h4>
                    <p className="text-slate-400 max-w-sm">Gemini is adjusting lighting, changing attire, and refining details...</p>
                  </div>
                </div>
              )}

              {state.transformed && (
                <div className="w-full h-full flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
                  <div className="relative group">
                    <img 
                      src={state.transformed} 
                      alt="Transformed Result" 
                      className="max-w-full max-h-[500px] object-contain rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ring-4 ring-white/10"
                    />
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Ready
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={handleDownload}
                      className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors"
                    >
                      <i className="fa-solid fa-download"></i>
                      Download HD
                    </button>
                    <button
                      onClick={() => setState(p => ({...p, transformed: null}))}
                      className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-700 transition-colors"
                    >
                      <i className="fa-solid fa-rotate-left"></i>
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Comparison Hint */}
            {state.transformed && state.original && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase text-center">Original</p>
                  <img src={state.original} className="w-full aspect-square object-cover rounded-xl grayscale opacity-50" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-blue-500 uppercase text-center">AI Professional</p>
                  <img src={state.transformed} className="w-full aspect-square object-cover rounded-xl shadow-lg" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-xl">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Instant Results</h4>
            <p className="text-slate-500">Skip the expensive studio session. Get high-quality headshots in under 30 seconds.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-xl">
              <i className="fa-solid fa-shirt"></i>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Smart Wardrobe</h4>
            <p className="text-slate-500">Automatically switch from casual clothes to professional suits or business attire.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-xl">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Privacy First</h4>
            <p className="text-slate-500">Your photos are processed in memory and never stored. You own your data.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default App;
