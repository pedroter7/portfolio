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
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { Box } from "@mui/system";
import { appThemeOptions } from "./appStyle";

const App: React.FC<{}> = () => {
  const [currentCardTab, setCurrentCardTab] = useState(
    PortfolioCardsTabEnum.Home
  );
  const [currentUILanguage, setCurrentUILanguage] = useState(
    UILanguage.English
  );

  const isCardVisible = (cardIndex: number) => cardIndex === currentCardTab;

  let theme = createTheme(appThemeOptions);
  theme = responsiveFontSizes(theme);

  const appStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    [theme.breakpoints.down("md")]: {
      padding: "1vmin 2vmin",
      gap: "1vmin",
    },
    [theme.breakpoints.up("md")]: {
      padding: "1vmin 30vmin",
      gap: "2vmin",
    },
  };

  const boxPortfolioCardsTabsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "stretch",
    },
  };

  const boxMainContentStyle: React.CSSProperties = {
    minHeight: "70vh",
  };

  return (
    <Box className="App" sx={appStyle}>
      <ThemeProvider theme={theme}>
        <Box sx={boxPortfolioCardsTabsStyle}>
          <PortfolioCardsTabs
            currentTab={currentCardTab}
            onTabChange={setCurrentCardTab}
            currentUILanguage={currentUILanguage}
          />
        </Box>
        <Box sx={boxMainContentStyle}>
          <PortfolioCardTabPanel
            currentUILanguage={currentUILanguage}
            index={PortfolioCardsTabEnum.Home}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Home)}
          >
            <HomeCardContent
              currentUILanguage={currentUILanguage}
              onCardChange={setCurrentCardTab}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={currentUILanguage}
            index={PortfolioCardsTabEnum.About}
            isVisible={isCardVisible(PortfolioCardsTabEnum.About)}
          >
            <AboutCardContent
              currentUILanguage={currentUILanguage}
              onCardChange={setCurrentCardTab}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={currentUILanguage}
            index={PortfolioCardsTabEnum.Skills}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Skills)}
          >
            <SkillsCardContent
              currentUILanguage={currentUILanguage}
              onCardChange={setCurrentCardTab}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={currentUILanguage}
            index={PortfolioCardsTabEnum.Projects}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Projects)}
          >
            <ProjectsCardContent
              currentUILanguage={currentUILanguage}
              onCardChange={setCurrentCardTab}
            />
          </PortfolioCardTabPanel>
          <PortfolioCardTabPanel
            currentUILanguage={currentUILanguage}
            index={PortfolioCardsTabEnum.Experience}
            isVisible={isCardVisible(PortfolioCardsTabEnum.Experience)}
          >
            <ExperienceCardContent
              currentUILanguage={currentUILanguage}
              onCardChange={setCurrentCardTab}
            />
          </PortfolioCardTabPanel>
        </Box>
        <Box>
          <Footer
            currentUILanguage={currentUILanguage}
            onUiLanguageChange={setCurrentUILanguage}
          />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default App;
