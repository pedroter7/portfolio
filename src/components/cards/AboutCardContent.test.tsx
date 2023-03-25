import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UILanguage } from "../../i18n/enums";
import {
  createRandomI18nAboutCardTexts,
  createRandomI18nConfigurationData,
} from "../../i18n/i18n.testFixture";
import {
  I18nAboutCardTexts,
  I18nConfigurationData,
} from "../../i18n/interfaces";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import AboutCardContent from "./AboutCardContent";

const mainContentBoxTestId = "box-maincontent";

function createMocksForComponentProps() {
  const ptTexts = createRandomI18nAboutCardTexts();
  const enTexts = createRandomI18nAboutCardTexts();
  const ptConfigData = createRandomI18nConfigurationData();
  const enConfigData = createRandomI18nConfigurationData();
  const getAboutCardTexts = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTexts : ptTexts
  );
  const getConfigurationData = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enConfigData : ptConfigData
  );
  const onCardChangeMock = jest.fn((newCard: PortfolioCardsTabEnum) => {});
  return {
    ptTexts,
    enTexts,
    ptConfigData,
    enConfigData,
    getAboutCardTexts,
    getConfigurationData,
    onCardChangeMock,
  };
}

function assertThatProfilePictureRenderedCorrectly(
  texts: I18nAboutCardTexts,
  configData: I18nConfigurationData
) {
  const imgElement = screen.getByRole("img");
  expect(imgElement).toBeVisible();
  expect(imgElement).toHaveProperty("alt", texts.avatarAltText);
  expect(imgElement).toHaveProperty("src", configData.profileAvatarUrl);
}

function assertThatTextsAreVisible(texts: I18nAboutCardTexts) {
  expect(screen.getByText(texts.titleText)).toBeVisible();
  texts.paragraphs.forEach((p) => expect(screen.getByText(p)).toBeVisible());
}

function assertThatButtonsAreVisible(texts: I18nAboutCardTexts) {
  expect(screen.getByText(texts.nextCardButtonText)).toBeVisible();
  expect(screen.getByText(texts.previousCardButtonText)).toBeVisible();
}

describe("<AboutCardContent />", () => {
  describe("Renders correctly", () => {
    it("When UI language is English", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.English;
      const textData = mocks.getAboutCardTexts(language);
      const configData = mocks.getConfigurationData(language);
      render(
        <AboutCardContent
          currentUILanguage={language}
          configData={configData}
          textData={textData}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      assertThatProfilePictureRenderedCorrectly(
        mocks.enTexts,
        mocks.enConfigData
      );
      assertThatTextsAreVisible(mocks.enTexts);
      assertThatButtonsAreVisible(mocks.enTexts);
    });

    it("When UI language is Portuguese", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.Portuguese;
      const textData = mocks.getAboutCardTexts(language);
      const configData = mocks.getConfigurationData(language);
      render(
        <AboutCardContent
          currentUILanguage={language}
          configData={configData}
          textData={textData}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      assertThatProfilePictureRenderedCorrectly(
        mocks.ptTexts,
        mocks.ptConfigData
      );
      assertThatTextsAreVisible(mocks.ptTexts);
      assertThatButtonsAreVisible(mocks.ptTexts);
    });
  });

  describe("Card navigation", () => {
    it("When user clicks on next page button, the handler receives the correct enum value", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const textData = mocks.getAboutCardTexts(language);
      const configData = mocks.getConfigurationData(language);
      const user = userEvent.setup();
      render(
        <AboutCardContent
          currentUILanguage={language}
          configData={configData}
          textData={textData}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const nextButton = screen.getByText(textData.nextCardButtonText);
      await user.click(nextButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.Skills
      );
    });

    it("When user clicks on previous page button, the handler receives the correct enum value", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const textData = mocks.getAboutCardTexts(language);
      const configData = mocks.getConfigurationData(language);
      const user = userEvent.setup();
      render(
        <AboutCardContent
          currentUILanguage={language}
          configData={configData}
          textData={textData}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const previousButton = screen.getByText(textData.previousCardButtonText);
      await user.click(previousButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.Home
      );
    });
  });
});
