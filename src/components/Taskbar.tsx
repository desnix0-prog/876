import React from 'react';
import { useSystemStore } from '../store/systemStore';
import { useWindowStore } from '../store/windowStore';
import { Settings, LayoutGrid, Globe, FolderClosed, PlaySquare, Mic } from 'lucide-react';
import { voiceAgent } from '../services/voiceAgent';

export default function Taskbar() {
  const { toggleStartMenu, startMenuOpen } = useSystemStore();
  const { openWindow } = useWindowStore();
  const [isListening, setIsListening] = React.useState(false);

  const handleVoice = () => {
    setIsListening(true);
    voiceAgent.startListening();
    setTimeout(() => setIsListening(false), 3000); // UI reset fallback
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 bg-os-light/80 dark:bg-os-dark/80 backdrop-blur-md border-t border-white/20 dark:border-black/50 flex items-center justify-between px-2 z-50">
      
      {/* Start Button & Pinned Apps */}
      <div className="flex items-center gap-2 h-full">
        <button 
          onClick={toggleStartMenu}
          className={`p-2 rounded-md hover:bg-white/20 dark:hover:bg-white/10 transition-colors ${startMenuOpen ? 'bg-white/20 dark:bg-white/10' : ''}`}
        >
          <LayoutGrid className="w-6 h-6 text-blue-500" />
        </button>
        
        {/* Docked Apps */}
        <div className="h-8 w-px bg-gray-400/50 mx-1"></div>
        <AppIcon icon={<Globe className="w-5 h-5" />} onClick={() => openWindow('browser', 'Browser', 'browser')} />
        <AppIcon icon={<FolderClosed className="w-5 h-5 text-yellow-500" />} onClick={() => openWindow('files', 'File Explorer', 'files')} />
        <AppIcon icon={<Settings className="w-5 h-5 text-gray-500" />} onClick={() => openWindow('settings', 'Settings', 'settings')} />
        <AppIcon icon={<PlaySquare className="w-5 h-5 text-red-500" />} onClick={() => openWindow('youtube', 'YouTube', 'youtube')} />
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 pr-2">
        <button 
          onClick={handleVoice}
          className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500/50 animate-pulse' : 'hover:bg-white/20 dark:hover:bg-white/10'}`}
          title="Voice Assistant"
        >
          <Mic className={`w-4 h-4 ${isListening ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`} />
        </button>
        <div className="text-xs text-gray-700 dark:text-gray-300 flex flex-col items-end cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-1 rounded">
          <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

function AppIcon({ icon, onClick }: { icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-2 rounded-md hover:bg-white/20 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
    >
      {icon}
    </button>
  )
}
