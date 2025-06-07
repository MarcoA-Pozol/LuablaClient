import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
import frTranslation from "./locales/fr.json";
import ptTranslation from "./locales/pt.json";
import cnTranslation from "./locales/zh.json";
import jpTranslation from "./locales/jp.json";
import deTranslation from "./locales/de.json";
import hiTranslation from "./locales/hi.json";
import koTranslation from "./locales/ko.json";
import itTranslation from "./locales/it.json";
import ruTranslation from "./locales/ru.json";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Load translations via AJAX
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      fr: { translation: frTranslation },
      pt: { translation: ptTranslation },
      zh: { translation: cnTranslation },
      jp: { translation: jpTranslation },
      de: { translation: deTranslation },
      ko: { translation: koTranslation },
      ru: { translation: ruTranslation },
      it: { translation: itTranslation },
      hi: { translation: hiTranslation },
    },
    fallbackLng: "en",
    lng: localStorage.getItem("luablaInterfaceLanguage")||"en", // Default language
    interpolation: { escapeValue: false },
  });

export default i18n;
