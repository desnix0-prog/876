import { useEffect } from 'react';
import { useSystemStore } from './store/systemStore';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import { useTranslation } from 'react-i18next';

function App() {
  const theme = useSystemStore((state) => state.theme);
  const language = useSystemStore((state) => state.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop")' }}>
      <Desktop />
      <WindowManager />
      <Taskbar />
    </div>
  );
}

export default App;
