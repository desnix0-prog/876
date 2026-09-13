import React from 'react';
import { useWindowStore } from '../store/windowStore';
import { Settings, Globe, PlaySquare } from 'lucide-react';

export default function Desktop() {
  const { openWindow } = useWindowStore();

  return (
    <div className="w-full h-[calc(100vh-3rem)] p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
      <DesktopIcon 
        icon={<Globe className="w-8 h-8 text-blue-400" />} 
        label="Browser" 
        onDoubleClick={() => openWindow('browser', 'Browser', 'browser')} 
      />
      <DesktopIcon 
        icon={<PlaySquare className="w-8 h-8 text-red-500" />} 
        label="YouTube" 
        onDoubleClick={() => openWindow('youtube', 'YouTube', 'youtube')} 
      />
      <DesktopIcon 
        icon={<Settings className="w-8 h-8 text-gray-300" />} 
        label="Settings" 
        onDoubleClick={() => openWindow('settings', 'Settings', 'settings')} 
      />
    </div>
  );
}

function DesktopIcon({ icon, label, onDoubleClick }: { icon: React.ReactNode, label: string, onDoubleClick: () => void }) {
  return (
    <div 
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center justify-center w-20 h-24 hover:bg-white/20 rounded-md cursor-pointer group"
    >
      <div className="drop-shadow-md mb-1">{icon}</div>
      <span className="text-white text-xs drop-shadow-md truncate w-full text-center group-hover:bg-blue-600/50 rounded px-1">{label}</span>
    </div>
  )
}
