import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { I18nComponentProps, I18nSkillsCardTexts } from "../../i18n/interfaces";
import { CommonCardContentProps } from "./intefaces";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import CardNavigationButtons from "./common/CardNavigationButtons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UILanguage } from "../../i18n/enums";

interface SkillsCardContentPorps
  extends I18nComponentProps,
    CommonCardContentProps {
  getSkillsCardTexts: (language: UILanguage) => I18nSkillsCardTexts;
}

const SkillsCardContent: React.FC<SkillsCardContentPorps> = ({
  onCardChange,
  currentUILanguage,
  getSkillsCardTexts,
}) => {
  const [textData, setTextData] = useState(
    getSkillsCardTexts(currentUILanguage)
  );

  useEffect(
    () => setTextData(getSkillsCardTexts(currentUILanguage)),
    [currentUILanguage, getSkillsCardTexts]
  );

  const theme = useTheme();

  const mainContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
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

  const chipsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    margin: "1vmin 0",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      gap: "1vmin",
    },
    [theme.breakpoints.down("md")]: {
      gap: "3vmin",
    },
  };

  const boxCardNavigationButtonsStyle: React.CSSProperties = {
    alignSelf: "center",
    padding: "10vmin 0",
  };

  return (
    <Box sx={mainContainerStyle}>
      <Box sx={mainContentStyle}>
        <Typography variant="h3">{textData.titleText}</Typography>
        <Typography variant="body1">
          {textData.skilsAndAbilitiesAbstractText}
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              {textData.recentlyWorkedWithTechnologiesTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={chipsContainerStyle}>
              {textData.skills.recentlyWorkedWithTechnologies.map((s) => (
                <Chip key={s} label={s} variant="filled" />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              {textData.otherTechnologiesTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={chipsContainerStyle}>
              {textData.skills.otherTechnologies.map((t) => (
                <Chip key={t} label={t} variant="filled" />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              {textData.learningTechnologiesTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={chipsContainerStyle}>
              {textData.skills.learningTechnologies.map((t) => (
                <Chip key={t} label={t} variant="filled" />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={boxCardNavigationButtonsStyle}>
        <CardNavigationButtons
          onCardChange={onCardChange}
          mode="nextAndPrevious"
          nextCardTabEnum={PortfolioCardsTabEnum.Projects}
          nextCardTitle={textData.nextCardButtonText}
          previousCardTabEnum={PortfolioCardsTabEnum.About}
          previousCardTitle={textData.previousCardButtonText}
        />
      </Box>
    </Box>
  );
};

export default SkillsCardContent;
