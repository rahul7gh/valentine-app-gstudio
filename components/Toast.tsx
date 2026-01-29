
import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
    themeId?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, themeId }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    // For 'classic-rose', use the primary color (love-500). For others, keep it white for contrast.
    const textColorClass = themeId === 'classic-rose' ? 'text-love-200' : 'text-white';

    return (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-up w-full max-w-xs px-4">
            <div className={`bg-love-900/90 ${textColorClass} px-6 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 border-2 border-love-400/50 backdrop-blur-md text-center`}>
                <span className="text-2xl animate-bounce">🔒</span>
                <span className="font-bold text-sm leading-tight">{message}</span>
            </div>
        </div>
    );
};
