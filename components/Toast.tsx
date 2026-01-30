
import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';

interface ToastProps {
    message: string;
    onClose: () => void;
    themeId?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, themeId }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none px-6">
            <div className="
                relative overflow-hidden
                bg-love-100/95 
                text-love-900
                backdrop-blur-xl 
                px-8 py-6 rounded-[2rem]
                shadow-[0_0_40px_-10px_var(--love-500)]
                border-2 border-love-300/50
                flex flex-col items-center justify-center gap-4 text-center
                animate-pop-in
                max-w-xs w-full
                pointer-events-auto
            ">
                {/* Decorative background glow */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-love-300/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-love-500/20 rounded-full blur-3xl animate-pulse delay-100"></div>

                <div className="relative bg-love-200/50 p-4 rounded-full border border-love-300/50 shadow-inner z-10">
                    <Lock className="w-8 h-8 text-love-600" />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-love-500 rounded-full animate-ping"></div>
                </div>
                
                <span className="relative z-10 font-bold text-xl font-handwriting tracking-wide drop-shadow-sm">
                    {message}
                </span>
            </div>
            <style>{`
                @keyframes pop-in {
                    0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(4px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
                }
                .animate-pop-in {
                    animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            `}</style>
        </div>
    );
};
