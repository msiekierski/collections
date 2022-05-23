import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  ENGLISH_LANGUAGE,
  POLISH_LANGUAGE,
} from "./common/constants/languages";
import polishResources from "./translation/pl/translation.json";
import englishResources from "./translation/en/translation.json";

const fallbackLng = [ENGLISH_LANGUAGE];
const availableLanguages = [ENGLISH_LANGUAGE, POLISH_LANGUAGE];

const resources = {
  en: {
    translation: englishResources,
  },
  pl: {
    translation: polishResources,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng,
  debug: true,
  whitelist: availableLanguages,
  react: {
    useSuspense: false,
  },
});
