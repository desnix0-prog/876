import React, { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, ChevronRight } from 'lucide-react';

const mockFiles = [
  { id: '1', name: 'Documents', type: 'folder', items: 3 },
  { id: '2', name: 'Images', type: 'folder', items: 12 },
  { id: '3', name: 'Downloads', type: 'folder', items: 5 },
  { id: '4', name: 'notes.txt', type: 'file', size: '12 KB' },
  { id: '5', name: 'wallpaper.jpg', type: 'image', size: '2.4 MB' },
];

export default function FileExplorerApp() {
  const [currentPath] = useState(['This PC']);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Top Bar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center text-sm px-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded w-full py-1">
          {currentPath.map((path, idx) => (
            <React.Fragment key={path}>
              <span className="hover:text-blue-500 cursor-pointer">{path}</span>
              {idx < currentPath.length - 1 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 overflow-y-auto">
          <div className="flex items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer text-sm font-semibold">
            This PC
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer text-sm ml-4">
            Documents
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer text-sm ml-4">
            Downloads
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 content-start overflow-y-auto">
          {mockFiles.map((file) => (
            <div key={file.id} className="flex flex-col items-center p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded cursor-pointer group">
              {file.type === 'folder' && <Folder className="w-10 h-10 text-yellow-500 mb-1" />}
              {file.type === 'file' && <FileText className="w-10 h-10 text-blue-500 mb-1" />}
              {file.type === 'image' && <ImageIcon className="w-10 h-10 text-green-500 mb-1" />}
              <span className="text-xs text-center break-words w-full truncate">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
