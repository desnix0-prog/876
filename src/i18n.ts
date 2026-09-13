import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Start": "Start",
          "Settings": "Settings",
          "Browser": "Browser",
          "Terminal": "Terminal"
        }
      },
      es: {
        translation: {
          "Start": "Inicio",
          "Settings": "Configuración",
          "Browser": "Navegador",
          "Terminal": "Terminal"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
