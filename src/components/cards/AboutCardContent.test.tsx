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
  const getAboutCardTextsMock = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTexts : ptTexts
  );
  const getConfigurationDataMock = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enConfigData : ptConfigData
  );
  const onCardChangeMock = jest.fn((newCard: PortfolioCardsTabEnum) => {});
  return {
    ptTexts,
    enTexts,
    ptConfigData,
    enConfigData,
    getAboutCardTextsMock,
    getConfigurationDataMock,
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
      render(
        <AboutCardContent
          currentUILanguage={language}
          getAboutCardTexts={mocks.getAboutCardTextsMock}
          getConfigurationData={mocks.getConfigurationDataMock}
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
      render(
        <AboutCardContent
          currentUILanguage={language}
          getAboutCardTexts={mocks.getAboutCardTextsMock}
          getConfigurationData={mocks.getConfigurationDataMock}
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
      const texts = mocks.getAboutCardTextsMock(language);
      const user = userEvent.setup();
      render(
        <AboutCardContent
          currentUILanguage={language}
          getAboutCardTexts={mocks.getAboutCardTextsMock}
          getConfigurationData={mocks.getConfigurationDataMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const nextButton = screen.getByText(texts.nextCardButtonText);
      await user.click(nextButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.Skills
      );
    });

    it("When user clicks on previous page button, the handler receives the correct enum value", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const texts = mocks.getAboutCardTextsMock(language);
      const user = userEvent.setup();
      render(
        <AboutCardContent
          currentUILanguage={language}
          getAboutCardTexts={mocks.getAboutCardTextsMock}
          getConfigurationData={mocks.getConfigurationDataMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const previousButton = screen.getByText(texts.previousCardButtonText);
      await user.click(previousButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.Home
      );
    });
  });
});
