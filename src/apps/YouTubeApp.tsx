import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function YouTubeApp() {
  const [query, setQuery] = useState('lofi hip hop radio');
  const [search, setSearch] = useState('lofi hip hop radio');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(query);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] text-white">
      {/* Navbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold">▶</div>
          <span className="font-semibold text-lg tracking-tighter">YouTube</span>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl px-10">
          <div className="flex bg-[#121212] border border-gray-700 rounded-full overflow-hidden">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent px-4 py-2 outline-none"
            />
            <button type="submit" className="px-5 bg-[#222222] border-l border-gray-700 hover:bg-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </form>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">U</div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Results for "{search}"</h2>
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(search)}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
