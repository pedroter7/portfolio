import { render, screen } from "@testing-library/react";
import { UILanguage } from "../../i18n/enums";
import { createRandomI18nCardsTabsTitles } from "../../i18n/i18n.testFixture";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";
import { PortfolioCardsTabEnum } from "./enums";
import PortfolioCardsTabs from "./PortfolioCardsTabs";
import userEvent from "@testing-library/user-event";

const homeTabTestId = "cardsTab-homeTab";
const aboutTabTestId = "cardsTab-aboutTab";
const skillsTabTestId = "cardsTab-skillsTab";
const projectsTabTestId = "cardsTab-projectsTab";
const experienceTabTestId = "cardsTab-experienceTab";

function getTabTestIdFromTabEnum(tabEnum: PortfolioCardsTabEnum) {
  switch (tabEnum) {
    case PortfolioCardsTabEnum.About:
      return aboutTabTestId;
    case PortfolioCardsTabEnum.Experience:
      return experienceTabTestId;
    case PortfolioCardsTabEnum.Home:
      return homeTabTestId;
    case PortfolioCardsTabEnum.Projects:
      return projectsTabTestId;
    case PortfolioCardsTabEnum.Skills:
      return skillsTabTestId;
  }
}

function getTabEnumDifferentFrom(tabEnum: PortfolioCardsTabEnum) {
  let te = tabEnum;
  do {
    te = getRandomNonHeterogeneousEnumValue(PortfolioCardsTabEnum);
  } while (te == tabEnum);
  return te;
}

function createMocksForComponentProps() {
  const enTabsTitle = createRandomI18nCardsTabsTitles();
  const ptTabsTitle = createRandomI18nCardsTabsTitles();
  const getCardsTabsTitles = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTabsTitle : ptTabsTitle
  );
  const onTabChangeMock = jest.fn((newTab: PortfolioCardsTabEnum) => {});
  return {
    enTabsTitle,
    ptTabsTitle,
    getCardsTabsTitles,
    onTabChangeMock,
  };
}

function testButtonIsVisibleAndHasText(
  buttonTestId: string,
  buttonText: string
) {
  const button = screen.getByTestId(buttonTestId);
  expect(button).toBeVisible();
  expect(button).toHaveTextContent(buttonText);
}

describe("<PortfolioCardsTabs />", () => {
  describe("Renders correctly", () => {
    it("When UI language is English", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.English;
      const tabsTitles = mocks.getCardsTabsTitles(language);
      const currentTab = getRandomNonHeterogeneousEnumValue(
        PortfolioCardsTabEnum
      );
      render(
        <PortfolioCardsTabs
          currentTab={currentTab}
          currentUILanguage={language}
          tabsTexts={tabsTitles}
          onTabChange={mocks.onTabChangeMock}
        />
      );
      const texts = mocks.enTabsTitle;
      testButtonIsVisibleAndHasText(homeTabTestId, texts.home.toUpperCase());
      testButtonIsVisibleAndHasText(aboutTabTestId, texts.about.toUpperCase());
      testButtonIsVisibleAndHasText(
        skillsTabTestId,
        texts.skills.toUpperCase()
      );
      testButtonIsVisibleAndHasText(
        projectsTabTestId,
        texts.projects.toUpperCase()
      );
      testButtonIsVisibleAndHasText(
        experienceTabTestId,
        texts.experience.toUpperCase()
      );
    });

    it("When UI language is English", () => {
      const mocks = createMocksForComponentProps();
      const language = UILanguage.Portuguese;
      const tabsTitles = mocks.getCardsTabsTitles(language);
      const currentTab = getRandomNonHeterogeneousEnumValue(
        PortfolioCardsTabEnum
      );
      render(
        <PortfolioCardsTabs
          currentTab={currentTab}
          currentUILanguage={language}
          tabsTexts={tabsTitles}
          onTabChange={mocks.onTabChangeMock}
        />
      );
      const texts = mocks.ptTabsTitle;
      testButtonIsVisibleAndHasText(homeTabTestId, texts.home.toUpperCase());
      testButtonIsVisibleAndHasText(aboutTabTestId, texts.about.toUpperCase());
      testButtonIsVisibleAndHasText(
        skillsTabTestId,
        texts.skills.toUpperCase()
      );
      testButtonIsVisibleAndHasText(
        projectsTabTestId,
        texts.projects.toUpperCase()
      );
      testButtonIsVisibleAndHasText(
        experienceTabTestId,
        texts.experience.toUpperCase()
      );
    });
  });

  describe("When click on another tab", () => {
    it("The correct enum is passed to handler function", async () => {
      const mocks = createMocksForComponentProps();
      const language = getRandomNonHeterogeneousEnumValue(UILanguage);
      const tabsTitles = mocks.getCardsTabsTitles(language);
      const currentTab = getRandomNonHeterogeneousEnumValue(
        PortfolioCardsTabEnum
      );
      const toClickEnum = getTabEnumDifferentFrom(currentTab);
      const user = userEvent.setup();
      render(
        <PortfolioCardsTabs
          currentTab={currentTab}
          currentUILanguage={language}
          tabsTexts={tabsTitles}
          onTabChange={mocks.onTabChangeMock}
        />
      );
      const toClickTab = screen.getByTestId(
        getTabTestIdFromTabEnum(toClickEnum)
      );
      await user.click(toClickTab);
      expect(mocks.onTabChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onTabChangeMock).toHaveBeenCalledWith(toClickEnum);
    });
  });
});
