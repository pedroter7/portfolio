import { Box, Typography, useTheme } from "@mui/material";
import { I18nComponentProps, I18nHomeCardTexts } from "../../i18n/interfaces";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import { CommonCardContentProps } from "./intefaces";
import CardNavigationButtons from "./common/CardNavigationButtons";

interface HomeCardContentProps
  extends I18nComponentProps,
    CommonCardContentProps {
  textData: I18nHomeCardTexts;
}

const HomeCardContent: React.FC<HomeCardContentProps> = ({
  onCardChange,
  textData,
}) => {
  const theme = useTheme();

  const idsPrefix = "homeCard-";

  const mainContainerStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5vmin",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      gap: "15vmin",
      padding: "5vmin 0",
    },
  };

  const boxMainContentStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    gap: "1vmin",
    [theme.breakpoints.down("md")]: {
      gap: "5vmin",
      alignItems: "stretch",
    },
  };

  return (
    <Box sx={mainContainerStyle}>
      <Box sx={boxMainContentStyle}>
        <Typography variant="h5" id={`${idsPrefix}helloText`}>
          {textData.helloText}
        </Typography>
        <Typography variant="h1" id={`${idsPrefix}nameText`}>
          {textData.nameText}
        </Typography>
        <Typography variant="h5" id={`${idsPrefix}smallIntroText`}>
          {textData.smallIntroText}
        </Typography>
      </Box>
      <Box>
        <CardNavigationButtons
          mode="nextOnly"
          nextCardTabEnum={PortfolioCardsTabEnum.About}
          nextCardTitle={textData.nextCardButtonText}
          onCardChange={onCardChange}
        />
      </Box>
    </Box>
  );
};

export default HomeCardContent;
