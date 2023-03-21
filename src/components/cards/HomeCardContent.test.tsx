import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UILanguage } from "../../i18n/enums";
import { createRandomI18nHomeCardTexts } from "../../i18n/i18n.testFixture";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import HomeCardContent from "./HomeCardContent";
import { createMocksForCommonCardContentProps } from "./intefaces.testFixture";

function createMocksForComponentProps() {
  const ptTexts = createRandomI18nHomeCardTexts();
  const enTexts = createRandomI18nHomeCardTexts();
  const getHomeCardTextsMock = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTexts : ptTexts
  );
  return {
    ptTexts,
    enTexts,
    getHomeCardTextsMock,
    ...createMocksForCommonCardContentProps(),
  };
}

describe("<HomeCardContent />", () => {
  describe("Renders correctly", () => {
    it("When selected language is English", () => {
      const mocks = createMocksForComponentProps();
      const texts = mocks.enTexts;
      const language = UILanguage.English;
      render(
        <HomeCardContent
          currentUILanguage={language}
          getHomeCardTexts={mocks.getHomeCardTextsMock}
          onCardChange={mocks.onCardChange}
        />
      );
      expect(screen.getByText(texts.helloText)).toBeVisible();
      expect(screen.getByText(texts.nameText)).toBeVisible();
      expect(screen.getByText(texts.nextCardButtonText)).toBeVisible();
      expect(
        screen.queryByText(texts.previousCardButtonText)
      ).not.toBeInTheDocument();
      expect(screen.getByText(texts.smallIntroText)).toBeVisible();
    });

    it("When selected language is Portuguese", () => {
      const mocks = createMocksForComponentProps();
      const texts = mocks.ptTexts;
      const language = UILanguage.Portuguese;
      render(
        <HomeCardContent
          currentUILanguage={language}
          getHomeCardTexts={mocks.getHomeCardTextsMock}
          onCardChange={mocks.onCardChange}
        />
      );
      expect(screen.getByText(texts.helloText)).toBeVisible();
      expect(screen.getByText(texts.nameText)).toBeVisible();
      expect(screen.getByText(texts.nextCardButtonText)).toBeVisible();
      expect(
        screen.queryByText(texts.previousCardButtonText)
      ).not.toBeInTheDocument();
      expect(screen.getByText(texts.smallIntroText)).toBeVisible();
    });
  });

  describe("Card navigation", () => {
    it("On click next card button passes correct parameter to handler function", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const text = mocks.getHomeCardTextsMock(language);
      const user = userEvent.setup();
      render(
        <HomeCardContent
          currentUILanguage={language}
          getHomeCardTexts={mocks.getHomeCardTextsMock}
          onCardChange={mocks.onCardChange}
        />
      );
      const nextCardButton = screen.getByText(text.nextCardButtonText);
      await user.click(nextCardButton);
      expect(mocks.onCardChange).toHaveBeenCalledTimes(1);
      expect(mocks.onCardChange).toHaveBeenCalledWith(PortfolioCardsTabEnum.About);
    });
  });
});
