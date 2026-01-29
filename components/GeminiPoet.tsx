
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Quote } from 'lucide-react';

interface GeminiPoetProps {
  theme: string;
}

export const GeminiPoet: React.FC<GeminiPoetProps> = ({ theme }) => {
  const [poem, setPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePoem = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, beautiful, and heartfelt romantic poem (maximum 4 lines) about ${theme}. The recipient is my beautiful wife-to-be. Make it sound deeply personal and elegant.`,
        config: {
          systemInstruction: "You are a world-class romantic poet. Your poems are short, impactful, and use elegant language. You never use cliches. Refer to the recipient as 'my darling' or 'my wife-to-be'.",
          temperature: 0.9,
          topP: 0.8,
        },
      });

      const result = response.text?.trim();
      if (result) {
        setPoem(result);
      } else {
        throw new Error("Empty response");
      }
    } catch (err) {
      console.error("Gemini Error:", err);
      setError("My heart is full, but the words are hiding right now. Let's try again in a moment?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 mb-4">
      {!poem ? (
        <button
          onClick={generatePoem}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-love-400 to-love-600 text-white rounded-2xl shadow-lg font-bold hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden relative"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:animate-bounce" />
              <span>Request an AI Love Poem</span>
            </>
          )}
          {/* Animated Glow */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
        </button>
      ) : (
        <div className="bg-love-100/60 backdrop-blur-sm border-2 border-love-200 rounded-3xl p-6 relative animate-fade-in shadow-inner">
          <Quote className="absolute top-4 left-4 text-love-200 w-10 h-10 opacity-40" />
          <div className="relative z-10 text-center">
            <p className="font-handwriting text-2xl text-love-800 leading-relaxed italic whitespace-pre-wrap">
              {poem}
            </p>
            <button 
              onClick={() => setPoem(null)}
              className="mt-4 text-xs font-bold text-love-600 uppercase tracking-widest hover:text-love-800 transition-colors"
            >
              Write another?
            </button>
          </div>
        </div>
      )}
      {error && (
        <p className="text-center text-xs text-love-500 mt-2 italic px-4">{error}</p>
      )}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          50% { transform: translateX(100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
};
