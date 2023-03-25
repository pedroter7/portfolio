import { render, screen } from "@testing-library/react";
import { UILanguage } from "../../i18n/enums";
import { createRandomI18nSkillsCardTexts } from "../../i18n/i18n.testFixture";
import { I18nSkillsCardTexts } from "../../i18n/interfaces";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import SkillsCardContent from "./SkillsCardContent";
import userEvent from "@testing-library/user-event";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";

function createMocksForComponentProps() {
  const ptTexts = createRandomI18nSkillsCardTexts();
  const enTexts = createRandomI18nSkillsCardTexts();
  const getSkillsCardTextsMock = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTexts : ptTexts
  );
  const onCardChangeMock = jest.fn((newCard: PortfolioCardsTabEnum) => {});
  return {
    ptTexts,
    enTexts,
    getSkillsCardTextsMock,
    onCardChangeMock,
  };
}

function assertTextsRenderedCorrectly(texts: I18nSkillsCardTexts) {
  expect(screen.getByText(texts.titleText)).toBeVisible();
  expect(screen.getByText(texts.skilsAndAbilitiesAbstractText)).toBeVisible();
  expect(
    screen.getByText(texts.recentlyWorkedWithTechnologiesTitle)
  ).toBeVisible();
  expect(screen.getByText(texts.otherTechnologiesTitle)).toBeVisible();
  expect(screen.getByText(texts.learningTechnologiesTitle)).toBeVisible();
  texts.skills.recentlyWorkedWithTechnologies.forEach((t) =>
    expect(screen.getByText(t)).toBeInTheDocument()
  );
  texts.skills.learningTechnologies.forEach((t) =>
    expect(screen.getByText(t)).toBeInTheDocument()
  );
  texts.skills.otherTechnologies.forEach((t) =>
    expect(screen.getByText(t)).toBeInTheDocument()
  );
}

function assertButtonsRenderedCorrectly(texts: I18nSkillsCardTexts) {
  expect(screen.getByText(texts.nextCardButtonText)).toBeVisible();
  expect(screen.getByText(texts.previousCardButtonText)).toBeVisible();
}

describe("<SkillsCardContent />", () => {
  describe("Renders correctly", () => {
    it("When UI language is English", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.English;
      const texts = mocks.enTexts;
      render(
        <SkillsCardContent
          currentUILanguage={language}
          getSkillsCardTexts={mocks.getSkillsCardTextsMock}
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
        <SkillsCardContent
          currentUILanguage={language}
          getSkillsCardTexts={mocks.getSkillsCardTextsMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      assertTextsRenderedCorrectly(texts);
      assertButtonsRenderedCorrectly(texts);
    });
  });

  describe("Navigation buttons", () => {
    it("When user clicks on next card button, the correct enum is passed to handler", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const texts = mocks.getSkillsCardTextsMock(language);
      const user = userEvent.setup();
      render(
        <SkillsCardContent
          currentUILanguage={language}
          getSkillsCardTexts={mocks.getSkillsCardTextsMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const nextButton = screen.getByText(texts.nextCardButtonText);
      await user.click(nextButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.Projects
      );
    });

    it("When user clicks on previous card button, the correct enum is passed to handler", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const texts = mocks.getSkillsCardTextsMock(language);
      const user = userEvent.setup();
      render(
        <SkillsCardContent
          currentUILanguage={language}
          getSkillsCardTexts={mocks.getSkillsCardTextsMock}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const previousButton = screen.getByText(texts.previousCardButtonText);
      await user.click(previousButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.About
      );
    });
  });
});
