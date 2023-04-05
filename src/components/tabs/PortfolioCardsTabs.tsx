import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import Assessment from "@mui/icons-material/Assessment";
import AccountTree from "@mui/icons-material/AccountTree";
import Science from "@mui/icons-material/Science";
import { PortfolioCardsTabEnum } from "./enums";
import { I18nCardsTabsTitles, I18nComponentProps } from "../../i18n/interfaces";

interface PortfolioCardsTabsProps extends I18nComponentProps {
  currentTab: PortfolioCardsTabEnum;
  onTabChange: (newTab: PortfolioCardsTabEnum) => void;
  tabsTexts: I18nCardsTabsTitles;
}

const PortfolioCardsTabs: React.FC<PortfolioCardsTabsProps> = ({
  currentTab,
  onTabChange,
  tabsTexts,
  ...other
}) => {
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
      {...other}
    >
      <Tab
        icon={<EmojiPeople />}
        label={tabsTexts.home.toUpperCase()}
        value={PortfolioCardsTabEnum.Home}
        data-testid="cardsTab-homeTab"
      />
      <Tab
        icon={<PersonPinIcon />}
        label={tabsTexts.about.toUpperCase()}
        value={PortfolioCardsTabEnum.About}
        data-testid="cardsTab-aboutTab"
      />
      <Tab
        icon={<Assessment />}
        label={tabsTexts.skills.toUpperCase()}
        value={PortfolioCardsTabEnum.Skills}
        data-testid="cardsTab-skillsTab"
      />
      <Tab
        icon={<AccountTree />}
        label={tabsTexts.projects.toUpperCase()}
        value={PortfolioCardsTabEnum.Projects}
        data-testid="cardsTab-projectsTab"
      />
      <Tab
        icon={<Science />}
        label={tabsTexts.experience.toUpperCase()}
        value={PortfolioCardsTabEnum.Experience}
        data-testid="cardsTab-experienceTab"
      />
    </Tabs>
  );
};

export default PortfolioCardsTabs;
