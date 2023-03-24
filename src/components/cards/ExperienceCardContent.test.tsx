import { render, screen } from "@testing-library/react";
import { UILanguage } from "../../i18n/enums";
import { createRandomI18nExperienceCardTexts } from "../../i18n/i18n.testFixture";
import { I18nExperienceCardTexts } from "../../i18n/interfaces";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import ExperienceCardContent from "./ExperienceCardContent";
import userEvent from "@testing-library/user-event";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";

function createMocksForComponentProps() {
  const onCardChangeMock = jest.fn((newCard: PortfolioCardsTabEnum) => {});
  const enTexts = createRandomI18nExperienceCardTexts();
  const ptTexts = createRandomI18nExperienceCardTexts();
  const getExperienceCardTextsMock = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTexts : ptTexts
  );
  return {
    onCardChangeMock,
    getExperienceCardTextsMock,
    ptTexts,
    enTexts,
  };
}

function assertTextsRenderedCorrectly(texts: I18nExperienceCardTexts) {
  expect(screen.getByText(texts.titleText)).toBeVisible();
  expect(screen.getByText(texts.experienceCardAbstractText)).toBeVisible();
  texts.experiences.forEach((e) => {
    expect(screen.getByText(e.field)).toBeVisible();
    expect(screen.getByText(e.detailsParagraphs[0])).toBeInTheDocument();
  });
}

function assertButtonsRenderedCorrectly(texts: I18nExperienceCardTexts) {
  expect(screen.queryByText(texts.nextCardButtonText)).not.toBeInTheDocument();
  expect(screen.getByText(texts.previousCardButtonText)).toBeVisible();
}

describe("<ExperienceCardContent />", () => {
  describe("Renders correctly", () => {
    it("When UI language is English", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.English;
      const texts = mocks.enTexts;
      render(
        <ExperienceCardContent
          currentUILanguage={language}
          getExperienceCardTexts={mocks.getExperienceCardTextsMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      assertTextsRenderedCorrectly(texts);
      assertButtonsRenderedCorrectly(texts);
    });

    it("When UI language is Portuguese", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.Portuguese;
      const texts = mocks.ptTexts;
      render(
        <ExperienceCardContent
          currentUILanguage={language}
          getExperienceCardTexts={mocks.getExperienceCardTextsMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      assertTextsRenderedCorrectly(texts);
      assertButtonsRenderedCorrectly(texts);
    });
  });

  describe("Navigation buttons", () => {
    it("When user clicks on previous card button, the correct enum is passed to the handler", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const texts = mocks.getExperienceCardTextsMock(language);
      const user = userEvent.setup();
      render(
        <ExperienceCardContent
          currentUILanguage={language}
          getExperienceCardTexts={mocks.getExperienceCardTextsMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const previousCardButton = screen.getByText(texts.previousCardButtonText);
      await user.click(previousCardButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenLastCalledWith(
        PortfolioCardsTabEnum.Projects
      );
    });
  });
});
