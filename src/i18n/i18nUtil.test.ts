import { UILanguage } from "./enums";
import {
  getAboutCardTexts,
  getConfigurationData,
  getExperienceCardTexts,
  getFooterTexts,
  getHomeCardTexts,
  getProjectsCardTexts,
  getSkillsCardTexts,
  getTextForCardsTabsTitles,
} from "./i18nUtil";

function testAllFunctionsNotThrowForLanguage(languageEnum: UILanguage) {
  expect(() => getTextForCardsTabsTitles(languageEnum)).not.toThrow();
  expect(() => getHomeCardTexts(languageEnum)).not.toThrow();
  expect(() => getAboutCardTexts(languageEnum)).not.toThrow();
  expect(() => getSkillsCardTexts(languageEnum)).not.toThrow();
  expect(() => getProjectsCardTexts(languageEnum)).not.toThrow();
  expect(() => getExperienceCardTexts(languageEnum)).not.toThrow();
  expect(() => getFooterTexts(languageEnum)).not.toThrow();
  expect(() => getConfigurationData(languageEnum)).not.toThrow();
}

describe("i18nUtil", () => {
  describe("UILanguage English", () => {
    it("Won't throw for any method", () => {
      testAllFunctionsNotThrowForLanguage(UILanguage.English);
    });
  });

  describe("UILanguage Portuguese", () => {
    it("Won't throw for any method", () => {
      testAllFunctionsNotThrowForLanguage(UILanguage.Portuguese);
    });
  });

  describe("UILanguage Default", () => {
    it("Won't throw for any method", () => {
      testAllFunctionsNotThrowForLanguage(UILanguage.Default);
    });
  })
});
