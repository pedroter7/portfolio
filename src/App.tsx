import React, { useState } from "react";
import AboutCardContent from "./components/cards/AboutCardContent";
import ExperienceCardContent from "./components/cards/ExperienceCardContent";
import HomeCardContent from "./components/cards/HomeCardContent";
import ProjectsCardContent from "./components/cards/ProjectsCardContent";
import SkillsCardContent from "./components/cards/SkillsCardContent";
import Footer from "./components/footer/Footer";
import { PortfolioCardsTabEnum } from "./components/tabs/enums";
import PortfolioCardTabPanel from "./components/tabs/PortfolioCardTabPanel";
import PortfolioCardsTabs from "./components/tabs/PortfolioCardsTabs";
import { UILanguage } from "./i18n/enums";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { appTheme } from "./appStyle";
import {
  I18nComponentProps,
  I18nConfigurationData,
  I18nTextData,
} from "./i18n/interfaces";

interface AppProps extends I18nComponentProps {
  getTextData: (language: UILanguage) => I18nTextData;
  getConfigurationData: (language: UILanguage) => I18nConfigurationData;
}

const App: React.FC<AppProps> = ({
  currentUILanguage,
  getTextData,
  getConfigurationData,
}) => {
  const [currentCardTab, setCurrentCardTab] = useState(
    PortfolioCardsTabEnum.Home
  );

  const [uILanguage, setUILanguage] = useState(currentUILanguage);
  const textData = getTextData(uILanguage);
  const configData = getConfigurationData(uILanguage);

  const isCardVisible = (cardIndex: number) => cardIndex === currentCardTab;

  const appStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    [appTheme.breakpoints.down("md")]: {
      padding: "1vmin 2vmin",
      gap: "1vmin",
    },
    [appTheme.breakpoints.up("md")]: {
      padding: "1vmin 30vmin",
      gap: "2vmin",
    },
  };

  const boxPortfolioCardsTabsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    [appTheme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
    [appTheme.breakpoints.down("md")]: {
      justifyContent: "stretch",
    },
  };

  const boxMainContentStyle: React.CSSProperties = {
    minHeight: "70vh",
  };

  return (
    <Box className="App" sx={appStyle}>
      <ThemeProvider theme={appTheme}>
        <Box sx={boxPortfolioCardsTabsStyle}>
          <PortfolioCardsTabs
            currentTab={currentCardTab}
            onTabChange={setCurrentCardTab}
            currentUILanguage={uILanguage}
            tabsTexts={textData.tabsTitles}
          />
        </Box>
        <Box sx={boxMainContentStyle}>
          <PortfolioCardTabPanel
            currentUILanguage={uILanguage}
            index={PortfolioCardsTabEnum.Home}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Home)}
          >
            <HomeCardContent
              currentUILanguage={uILanguage}
              onCardChange={setCurrentCardTab}
              textData={textData.homeCard}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={uILanguage}
            index={PortfolioCardsTabEnum.About}
            isVisible={isCardVisible(PortfolioCardsTabEnum.About)}
          >
            <AboutCardContent
              currentUILanguage={uILanguage}
              onCardChange={setCurrentCardTab}
              configData={configData}
              textData={textData.aboutCard}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={uILanguage}
            index={PortfolioCardsTabEnum.Skills}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Skills)}
          >
            <SkillsCardContent
              currentUILanguage={uILanguage}
              onCardChange={setCurrentCardTab}
              textData={textData.skillsCard}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={uILanguage}
            index={PortfolioCardsTabEnum.Projects}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Projects)}
          >
            <ProjectsCardContent
              currentUILanguage={uILanguage}
              onCardChange={setCurrentCardTab}
              textData={textData.projectsCard}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={uILanguage}
            index={PortfolioCardsTabEnum.Experience}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Experience)}
          >
            <ExperienceCardContent
              currentUILanguage={uILanguage}
              onCardChange={setCurrentCardTab}
              textData={textData.experienceCard}
            />
          </PortfolioCardTabPanel>
        </Box>
        <Box>
          <Footer
            currentUILanguage={uILanguage}
            onUiLanguageChange={setUILanguage}
            configData={configData}
            textData={textData.footerTexts}
          />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default App;
