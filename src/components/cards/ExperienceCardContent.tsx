import { useEffect, useState } from "react";
import {
  I18nComponentProps,
  I18nExperienceCardTexts,
} from "../../i18n/interfaces";
import { CommonCardContentProps } from "./intefaces";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import { Box } from "@mui/system";
import CardNavigationButtons from "./common/CardNavigationButtons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UILanguage } from "../../i18n/enums";

interface ExperienceCardContentProps
  extends I18nComponentProps,
    CommonCardContentProps {
  getExperienceCardTexts: (language: UILanguage) => I18nExperienceCardTexts;
}

const ExperienceCardContent: React.FC<ExperienceCardContentProps> = ({
  onCardChange,
  currentUILanguage,
  getExperienceCardTexts,
}) => {
  const [textData, setTextData] = useState(
    getExperienceCardTexts(currentUILanguage)
  );

  useEffect(
    () => setTextData(getExperienceCardTexts(currentUILanguage)),
    [currentUILanguage, getExperienceCardTexts]
  );

  const theme = useTheme();

  const mainContainerStyle: React.CSSProperties = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const boxCardNavigationButtonsStyle: React.CSSProperties = {
    alignSelf: "center",
    padding: "10vmin 0",
  };

  const mainContentStyle: React.CSSProperties = {
    width: "100%",
    flexGrow: 1.0,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      gap: "1vmin",
    },
    [theme.breakpoints.down("md")]: {
      gap: "3vmin",
    },
  };

  const boxExperienceDetailsParagraphsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1vmin",
  };

  return (
    <Box sx={mainContainerStyle}>
      <Box sx={mainContentStyle}>
        <Typography variant="h3">{textData.titleText}</Typography>
        <Typography variant="body1">
          {textData.experienceCardAbstractText}
        </Typography>
        {textData.experiences.map((e, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{e.field}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={boxExperienceDetailsParagraphsStyle}>
                {e.detailsParagraphs.map((p, i) => (
                  <Typography variant="body1" key={i}>
                    {p}
                  </Typography>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={boxCardNavigationButtonsStyle}>
        <CardNavigationButtons
          mode="previousOnly"
          onCardChange={onCardChange}
          previousCardTabEnum={PortfolioCardsTabEnum.Projects}
          previousCardTitle={textData.previousCardButtonText}
        />
      </Box>
    </Box>
  );
};

export default ExperienceCardContent;
