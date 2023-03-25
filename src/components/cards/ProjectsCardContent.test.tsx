import { render, screen } from "@testing-library/react";
import { UILanguage } from "../../i18n/enums";
import { createRandomI18nProjectsCardTexts } from "../../i18n/i18n.testFixture";
import { I18nProjectsCardTexts } from "../../i18n/interfaces";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import ProjectsCardContent from "./ProjectsCardContent";
import userEvent from "@testing-library/user-event";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";

function createMocksForComponentProps() {
  const ptTexts = createRandomI18nProjectsCardTexts();
  const enTexts = createRandomI18nProjectsCardTexts();
  const onCardChangeMock = jest.fn((newCard: PortfolioCardsTabEnum) => {});
  const getProjectsCardTexts = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTexts : ptTexts
  );
  return {
    ptTexts,
    enTexts,
    onCardChangeMock,
    getProjectsCardTexts,
  };
}

function assertTextsRenderedCorrectly(texts: I18nProjectsCardTexts) {
  expect(screen.getByText(texts.titleText)).toBeVisible();
  expect(screen.getByText(texts.projectsAbstractText)).toBeVisible();
  texts.projects.forEach((p) => {
    expect(screen.getByText(p.title)).toBeVisible();
    p.descriptionParagraphs.forEach((d) =>
      expect(screen.getByText(d)).toBeInTheDocument()
    );
    if (p.url != null && p.urlLinkText != null) {
      const link = screen.getByText(p.urlLinkText);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", p.url);
    }
  });
}

function assertButtonsRenderCorrectly(texts: I18nProjectsCardTexts) {
  expect(screen.getByText(texts.nextCardButtonText)).toBeVisible();
  expect(screen.getByText(texts.previousCardButtonText)).toBeVisible();
}

describe("<ProjectsCardContent />", () => {
  describe("Renders correctly", () => {
    it("When UI language is English", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.English;
      const texts = mocks.getProjectsCardTexts(language);
      render(
        <ProjectsCardContent
          currentUILanguage={language}
          textData={texts}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      assertTextsRenderedCorrectly(texts);
      assertButtonsRenderCorrectly(texts);
    });

    it("When UI language is Portuguese", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.Portuguese;
      const texts = mocks.getProjectsCardTexts(language);
      render(
        <ProjectsCardContent
          currentUILanguage={language}
          textData={texts}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      assertTextsRenderedCorrectly(texts);
      assertButtonsRenderCorrectly(texts);
    });
  });

  describe("Navigation buttons", () => {
    it("When user clicks next card button, the correct enum is passed to handler", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const texts = mocks.getProjectsCardTexts(language);
      const user = userEvent.setup();
      render(
        <ProjectsCardContent
          currentUILanguage={language}
          textData={texts}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const nextCardButton = screen.getByText(texts.nextCardButtonText);
      await user.click(nextCardButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.Experience
      );
    });

    it("When user clicks previous card button, the correct enum is passed to handler", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const texts = mocks.getProjectsCardTexts(language);
      const user = userEvent.setup();
      render(
        <ProjectsCardContent
          currentUILanguage={language}
          textData={texts}
          onCardChange={mocks.onCardChangeMock}
        />
      );
      const previousCardButton = screen.getByText(texts.previousCardButtonText);
      await user.click(previousCardButton);
      expect(mocks.onCardChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChangeMock).toHaveBeenCalledWith(
        PortfolioCardsTabEnum.Skills
      );
    });
  });
});
