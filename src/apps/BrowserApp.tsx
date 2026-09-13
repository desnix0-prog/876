import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home } from 'lucide-react';

export default function BrowserApp() {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [inputUrl, setInputUrl] = useState('https://www.wikipedia.org');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300" onClick={() => setUrl(url)}>
          <RotateCw className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300" onClick={() => { setUrl('https://www.wikipedia.org'); setInputUrl('https://www.wikipedia.org'); }}>
          <Home className="w-4 h-4" />
        </button>
        
        <form onSubmit={handleSubmit} className="flex-1 mx-2">
          <input 
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      {/* Webview */}
      <div className="flex-1 bg-white">
        <iframe 
          src={url}
          className="w-full h-full border-none bg-white"
          title="Browser View"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
