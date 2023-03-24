import { UILanguage } from "./enums";

export interface I18nComponentProps {
  currentUILanguage: UILanguage;
}

export interface I18nCardsTabsTitles {
  home: string;
  about: string;
  skills: string;
  projects: string;
  experience: string;
}

interface I18nCardsCommonTexts {
  nextCardButtonText: string;
  previousCardButtonText: string;
}

export interface I18nHomeCardTexts extends I18nCardsCommonTexts {
  helloText: string;
  nameText: string;
  smallIntroText: string;
}

export interface I18nAboutCardTexts extends I18nCardsCommonTexts {
  avatarAltText: string;
  paragraphs: string[];
  titleText: string;
}

export interface I18nSkillsCardTexts extends I18nCardsCommonTexts {
  titleText: string;
  skills: {
    recentlyWorkedWithTechnologies: string[];
    otherTechnologies: string[];
    learningTechnologies: string[];
  };
  recentlyWorkedWithTechnologiesTitle: string;
  otherTechnologiesTitle: string;
  learningTechnologiesTitle: string;
  skilsAndAbilitiesAbstractText: string;
}

export interface I18nProjectsCardTexts extends I18nCardsCommonTexts {
  titleText: string;
  projectsAbstractText: string;
  projects: {
    title: string;
    descriptionParagraphs: string[];
    url?: string;
    urlLinkText?: string;
  }[];
}

export interface I18nExperienceCardTexts extends I18nCardsCommonTexts {
  titleText: string;
  experienceCardAbstractText: string;
  experiences: {
    field: string;
    detailsParagraphs: string[];
  }[];
}

export interface I18nFooterTexts {
  contactMeText: string;
  sendMeMailText: string;
  linkedinLinkToolTipText: string;
  githubLinkToolTipText: string;
  languageText: string;
}

export interface I18nConfigurationData {
  contactLinks: {
    email: string;
    linkedin: string;
    github: string;
  };
  profileAvatarUrl: string;
}

export interface I18nTextData {
  tabsTitles: I18nCardsTabsTitles;
  footerTexts: I18nFooterTexts;
  homeCard: I18nHomeCardTexts;
  aboutCard: I18nAboutCardTexts;
  skillsCard: I18nSkillsCardTexts;
  projectsCard: I18nProjectsCardTexts;
  experienceCard: I18nExperienceCardTexts;
}