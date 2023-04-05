import { render, screen } from "@testing-library/react";
import App from "./App";
import { PortfolioCardsTabEnum } from "./components/tabs/enums";
import { UILanguage } from "./i18n/enums";
import {
  createRandomI18nConfigurationData,
  createRandomI18nTextData,
} from "./i18n/i18n.testFixture";
import { I18nTextData } from "./i18n/interfaces";
import { getRandomNonHeterogeneousEnumValue } from "./util/enumUtil";

const portfolioCardsTabsTestId = "portfolio-cards-tabs";
const homeCardTabPanelTestId = "homecard-tabpanel";
const aboutCardTabPanelTestId = "aboutcard-tabpanel";
const skillsCardTabPanelTestId = "skillscard-tabpanel";
const projectsCardTabPanelTestId = "projectscard-tabpanel";
const experienceCardTabPanelTestId = "experiencecard-tabpanel";
const footerTestId = "footer";

function createMocksForComponentProps() {
  const enTexData = createRandomI18nTextData();
  const ptTextData = createRandomI18nTextData();
  const getTextDataMock = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enTexData : ptTextData
  );
  const enConfigData = createRandomI18nConfigurationData();
  const ptConfigData = createRandomI18nConfigurationData();
  const getConfigurationDataMock = jest.fn((language: UILanguage) =>
    language == UILanguage.English ? enConfigData : ptConfigData
  );
  return {
    enTexData,
    ptTextData,
    enConfigData,
    ptConfigData,
    getTextDataMock,
    getConfigurationDataMock,
  };
}

function getCardTabPanelTestId(
  cardTabEnum: PortfolioCardsTabEnum
) {
  switch (cardTabEnum) {
    case PortfolioCardsTabEnum.About:
      return aboutCardTabPanelTestId;
    case PortfolioCardsTabEnum.Experience:
      return experienceCardTabPanelTestId;
    case PortfolioCardsTabEnum.Home:
      return homeCardTabPanelTestId;
    case PortfolioCardsTabEnum.Projects:
      return projectsCardTabPanelTestId;
    case PortfolioCardsTabEnum.Skills:
      return skillsCardTabPanelTestId;
    default:
      return "";
  }
}

describe("<App />", () => {
  it("Renders correctly", () => {
    const mocks = createMocksForComponentProps();
    const language = getRandomNonHeterogeneousEnumValue(UILanguage);
    const initialTab = getRandomNonHeterogeneousEnumValue(
      PortfolioCardsTabEnum
    );
    render(
      <App
        currentUILanguage={language}
        getConfigurationData={mocks.getConfigurationDataMock}
        getTextData={mocks.getTextDataMock}
        initialTab={initialTab}
      />
    );
    expect(screen.getByTestId(getCardTabPanelTestId(initialTab))).toBeVisible();
    expect(screen.getByTestId(portfolioCardsTabsTestId)).toBeVisible();
    expect(screen.getByTestId(footerTestId)).toBeVisible();
  });
});
