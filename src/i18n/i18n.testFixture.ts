import { faker } from "@faker-js/faker";
import {
  I18nCardsTabsTitles,
  I18nConfigurationData,
  I18nFooterTexts,
  I18nHomeCardTexts,
} from "./interfaces";

function createRandomI18nFooterTexts(): I18nFooterTexts {
  return {
    contactMeText: faker.lorem.sentence(),
    githubLinkToolTipText: faker.lorem.sentence(),
    languageText: faker.lorem.sentence(),
    linkedinLinkToolTipText: faker.lorem.sentence(),
    sendMeMailText: faker.lorem.sentence(),
  };
}

function createRandomI18nConfigurationData(): I18nConfigurationData {
  return {
    contactLinks: {
      email: faker.internet.url(),
      github: faker.internet.url(),
      linkedin: faker.internet.url(),
    },
    profileAvatarUrl: faker.internet.url(),
  };
}

function createRandomI18nCardsTabsTitles(): I18nCardsTabsTitles {
  return {
    about: faker.word.noun(),
    experience: faker.word.noun(),
    home: faker.word.noun(),
    projects: faker.word.noun(),
    skills: faker.word.noun(),
  };
}

function createRandomI18nHomeCardTexts(): I18nHomeCardTexts {
  return {
    helloText: faker.lorem.sentence(),
    nameText: faker.word.noun(),
    nextCardButtonText: faker.word.noun(),
    previousCardButtonText: faker.word.noun(),
    smallIntroText: faker.lorem.sentences(
      faker.datatype.number({ min: 3, max: 25 })
    ),
  };
}

export {
  createRandomI18nFooterTexts,
  createRandomI18nConfigurationData,
  createRandomI18nCardsTabsTitles,
  createRandomI18nHomeCardTexts,
};
