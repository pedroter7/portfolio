import { Avatar, Box, Typography, useTheme } from "@mui/material";
import {
  I18nAboutCardTexts,
  I18nComponentProps,
  I18nConfigurationData,
} from "../../i18n/interfaces";
import { CommonCardContentProps } from "./intefaces";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import CardNavigationButtons from "./common/CardNavigationButtons";

interface AboutCardContentPorps
  extends I18nComponentProps,
    CommonCardContentProps {
  textData: I18nAboutCardTexts;
  configData: I18nConfigurationData;
}

const AboutCardContent: React.FC<AboutCardContentPorps> = ({
  onCardChange,
  configData,
  textData
}) => {
  const theme = useTheme();

  const mainContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const boxMainContentStyle = {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      gap: "2vmin",
    },
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      gap: "3vmin",
      alignItems: "center",
    },
  };

  const boxCardTitleStyle = {
    [theme.breakpoints.down("lg")]: {
      display: "flex",
      justifyContent: "center",
    },
  };

  const profileAvatarStyle: React.CSSProperties = {
    flexShrink: 2.3,
    height: "auto",
    width: "90%",
  };

  const boxAboutTextStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    flexGrow: 1.0,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      gap: "1vmin",
    },
    [theme.breakpoints.down("md")]: {
      gap: "5vmin",
    },
  };

  const boxNavigationButtonsStyle: React.CSSProperties = {
    alignSelf: "center",
    padding: "10vmin 0",
  };

  return (
    <Box sx={mainContainerStyle}>
      <Box sx={boxCardTitleStyle}>
        <Typography variant="h3">{textData.titleText}</Typography>
      </Box>
      <Box sx={boxMainContentStyle} data-testid="box-maincontent">
        <Avatar
          alt={textData.avatarAltText}
          src={configData.profileAvatarUrl}
          sx={profileAvatarStyle}
          variant="rounded"
        />
        <Box sx={boxAboutTextStyle}>
          {textData.paragraphs.map((p, i) => (
            <Typography key={i} variant="body1">
              {p}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box sx={boxNavigationButtonsStyle}>
        <CardNavigationButtons
          onCardChange={onCardChange}
          mode="nextAndPrevious"
          nextCardTabEnum={PortfolioCardsTabEnum.Skills}
          nextCardTitle={textData.nextCardButtonText}
          previousCardTabEnum={PortfolioCardsTabEnum.Home}
          previousCardTitle={textData.previousCardButtonText}
        />
      </Box>
    </Box>
  );
};

export default AboutCardContent;
