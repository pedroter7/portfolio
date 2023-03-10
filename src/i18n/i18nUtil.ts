import { UILanguage } from "./enums";
import {
  I18nAboutCardTexts,
  I18nConfigurationData,
  I18nExperienceCardTexts,
  I18nFooterTexts,
  I18nHomeCardTexts,
  I18nProjectsCardTexts,
  I18nSkillsCardTexts,
  I18nCardsTabsTitles,
  I18nTextData,
} from "./interfaces";
import englishTextData from "./text/en.json";
import englishConfigData from "./config/en.json";
import portugueseTextData from "./text/pt.json";
import portugueseConfigData from "./config/pt.json";

const getAllTextData: (language: UILanguage) => I18nTextData = (language) => {
  switch (language) {
    case UILanguage.English:
      return englishTextData as I18nTextData;
    case UILanguage.Portuguese:
      return portugueseTextData as I18nTextData;
    default:
      return englishTextData as I18nTextData;
  }
};

const getConfigurationData: (language: UILanguage) => I18nConfigurationData = (
  language
) => {
  switch (language) {
    case UILanguage.English:
      return englishConfigData as I18nConfigurationData;
    case UILanguage.Portuguese:
      return portugueseConfigData as I18nConfigurationData;
    default:
      return englishConfigData as I18nConfigurationData;
  }
};

const getTextForCardsTabsTitles: (
  language: UILanguage
) => I18nCardsTabsTitles = (language) => getAllTextData(language).tabsTitles;

const getHomeCardTexts: (language: UILanguage) => I18nHomeCardTexts = (
  language
) => getAllTextData(language).homeCard;

const getAboutCardTexts: (language: UILanguage) => I18nAboutCardTexts = (
  language
) => getAllTextData(language).aboutCard;

const getSkillsCardTexts: (language: UILanguage) => I18nSkillsCardTexts = (
  language
) => getAllTextData(language).skillsCard;

const getProjectsCardTexts: (language: UILanguage) => I18nProjectsCardTexts = (
  language
) => getAllTextData(language).projectsCard;

const getExperienceCardTexts: (
  language: UILanguage
) => I18nExperienceCardTexts = (language) =>
  getAllTextData(language).experienceCard;

const getFooterTexts: (language: UILanguage) => I18nFooterTexts = (language) =>
  getAllTextData(language).footerTexts;

export {
  getTextForCardsTabsTitles,
  getHomeCardTexts,
  getAboutCardTexts,
  getSkillsCardTexts,
  getProjectsCardTexts,
  getExperienceCardTexts,
  getFooterTexts,
  getConfigurationData,
};
