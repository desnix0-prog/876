import { useWindowStore } from '../store/windowStore';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import YouTubeApp from '../apps/YouTubeApp';
import BrowserApp from '../apps/BrowserApp';
import SettingsApp from '../apps/SettingsApp';
import FileExplorerApp from '../apps/FileExplorerApp';

export default function WindowManager() {
  const windows = useWindowStore((state) => state.windows);

  return (
    <>
      {windows.map((win) => {
        if (!win.isOpen || win.isMinimized) return null;
        return (
          <AppWindow key={win.id} window={win} />
        );
      })}
    </>
  );
}

function AppWindow({ window: win }: { window: any }) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowStore();

  const renderContent = () => {
    switch (win.component) {
      case 'youtube': return <YouTubeApp />;
      case 'browser': return <BrowserApp />;
      case 'settings': return <SettingsApp />;
      case 'files': return <FileExplorerApp />;
      default: return <div className="p-4">App not found: {win.component}</div>;
    }
  };

  return (
    <motion.div
      drag={!win.isMaximized}
      dragMomentum={false}
      onMouseDown={() => focusWindow(win.id)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ zIndex: win.zIndex }}
      className={`absolute flex flex-col bg-os-light dark:bg-os-dark border border-gray-300 dark:border-gray-700 shadow-2xl rounded-lg overflow-hidden
        ${win.isMaximized ? 'top-0 left-0 w-full h-[calc(100vh-3rem)] rounded-none' : 'top-20 left-20 w-[800px] h-[500px]'}`}
    >
      {/* Title Bar */}
      <div className="h-8 bg-gray-200 dark:bg-gray-800 flex items-center justify-between px-2 cursor-grab active:cursor-grabbing">
        <span className="text-xs font-semibold px-2">{win.title}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => minimizeWindow(win.id)} className="hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => maximizeWindow(win.id)} className="hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded">
            <Square className="w-3 h-3" />
          </button>
          <button onClick={() => closeWindow(win.id)} className="hover:bg-red-500 hover:text-white p-1.5 rounded">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>
    </motion.div>
  );
}
