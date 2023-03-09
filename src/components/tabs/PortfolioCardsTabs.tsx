import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import Assessment from "@mui/icons-material/Assessment";
import AccountTree from "@mui/icons-material/AccountTree";
import Science from "@mui/icons-material/Science";
import { PortfolioCardsTabEnum } from "./enums";
import { I18nComponentProps } from "../../i18n/interfaces";
import { getTextForCardsTabsTitles } from "../../i18n/i18nUtil";
import { useEffect, useState } from "react";

interface PortfolioCardsTabsProps extends I18nComponentProps {
  currentTab: PortfolioCardsTabEnum;
  onTabChange: (newTab: PortfolioCardsTabEnum) => void;
}

const PortfolioCardsTabs: React.FC<PortfolioCardsTabsProps> = ({
  currentTab,
  onTabChange,
  currentUILanguage,
}) => {
  const [tabsTexts, setTabsTexts] = useState(
    getTextForCardsTabsTitles(currentUILanguage)
  );

  useEffect(
    () => setTabsTexts(getTextForCardsTabsTitles(currentUILanguage)),
    [currentUILanguage]
  );

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: PortfolioCardsTabEnum
  ) => {
    onTabChange(newValue);
  };

  return (
    <Tabs
      value={currentTab}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      <Tab
        icon={<EmojiPeople />}
        label={tabsTexts.home.toUpperCase()}
        value={PortfolioCardsTabEnum.Home}
      />
      <Tab
        icon={<PersonPinIcon />}
        label={tabsTexts.about.toUpperCase()}
        value={PortfolioCardsTabEnum.About}
      />
      <Tab
        icon={<Assessment />}
        label={tabsTexts.skills.toUpperCase()}
        value={PortfolioCardsTabEnum.Skills}
      />
      <Tab
        icon={<AccountTree />}
        label={tabsTexts.projects.toUpperCase()}
        value={PortfolioCardsTabEnum.Projects}
      />
      <Tab
        icon={<Science />}
        label={tabsTexts.experience.toUpperCase()}
        value={PortfolioCardsTabEnum.Experience}
      />
    </Tabs>
  );
};

export default PortfolioCardsTabs;
