import { useSystemStore } from '../store/systemStore';

export default function SettingsApp() {
  const { theme, setTheme, language, setLanguage } = useSystemStore();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-black dark:text-white p-6 overflow-auto">
      <h1 className="text-3xl font-light mb-8">Settings</h1>
      
      <div className="space-y-8 max-w-2xl">
        
        {/* Personalization */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Personalization</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <label className="flex items-center justify-between">
              <span>System Theme</span>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 outline-none"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
        </section>

        {/* Time & Language */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Time & Language</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <label className="flex items-center justify-between">
              <span>Display Language</span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </label>
          </div>
        </section>

        {/* AI Assistant */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">AI Voice Assistant</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              The AI Voice Assistant uses the Groq API. Make sure you have added your `VITE_GROQ_API_KEY` to your environment variables.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Groq API Ready (configured via .env)</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
