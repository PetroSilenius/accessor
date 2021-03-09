import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import FI from '../translations/fi.json'
import EN from '../translations/en.json'
import { getUserLanguage, setUserLanguage, formatLanguage} from './common';


const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    if(process.env.NODE_ENV !== 'production'){console.log(getUserLanguage())}
    callback( formatLanguage( getUserLanguage() || navigator.language || navigator.userLanguage ))
  },
  init: () => {},
  cacheUserLanguage: (lng, options) => {
    if(process.env.NODE_ENV !== 'production'){console.log(lng)}
    setUserLanguage(lng)
  }
}

const resources = {
  fi: {
    translation: FI
  },
  en: {
    translation: EN
  }
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
