
import React, { useState, useEffect } from 'react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  currentUrl: string;
  texts: {
    title: string;
    placeholder: string;
    save: string;
    cancel: string;
    reset: string;
  };
}

const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose, onSave, currentUrl, texts }) => {
  const [url, setUrl] = useState(currentUrl);

  useEffect(() => {
    setUrl(currentUrl);
  }, [currentUrl, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(url);
    onClose();
  };

  const handleReset = () => {
    onSave('');
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="theme-modal-title">
      <div className="bg-stone-900 border-2 border-amber-700 rounded-lg p-6 sm:p-8 shadow-2xl w-11/12 max-w-md" onClick={e => e.stopPropagation()}>
        <h2 id="theme-modal-title" className="text-2xl font-bold font-['Cinzel'] text-amber-300 mb-4">{texts.title}</h2>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={texts.placeholder}
          className="w-full bg-stone-800 border border-stone-600 rounded-md px-3 py-2 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label={texts.placeholder}
        />
        <div className="mt-6 flex justify-between items-center gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md bg-red-800 text-white font-bold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {texts.reset}
          </button>
          <div className="flex gap-4">
             <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-stone-700 text-white font-bold hover:bg-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              {texts.cancel}
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-amber-600 text-black font-bold hover:bg-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {texts.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
