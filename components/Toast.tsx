
import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-up w-full max-w-xs px-4">
            <div className="bg-love-900/90 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 border-2 border-love-400/50 backdrop-blur-md text-center">
                <span className="text-2xl animate-bounce">🔒</span>
                <span className="font-bold text-sm leading-tight">{message}</span>
            </div>
        </div>
    );
};
