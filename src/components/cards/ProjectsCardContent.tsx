import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import {
  I18nComponentProps,
  I18nProjectsCardTexts,
} from "../../i18n/interfaces";
import { PortfolioCardsTabEnum } from "../tabs/enums";
import CardNavigationButtons from "./common/CardNavigationButtons";
import { CommonCardContentProps } from "./intefaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ProjectsCardContentProps
  extends I18nComponentProps,
    CommonCardContentProps {
  textData: I18nProjectsCardTexts;
}

const ProjectsCardContent: React.FC<ProjectsCardContentProps> = ({
  onCardChange,
  textData,
}) => {
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

  const projectDetailsBoxStyle = {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      gap: "1vmin",
    },
    [theme.breakpoints.down("md")]: {
      gap: "2vmin",
    },
  };

  return (
    <Box sx={mainContainerStyle}>
      <Box sx={mainContentStyle}>
        <Typography variant="h3">{textData.titleText}</Typography>
        <Typography variant="body1">{textData.projectsAbstractText}</Typography>
        {textData.projects.map((p) => (
          <Accordion key={p.title}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{p.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={projectDetailsBoxStyle}>
                {p.descriptionParagraphs.map((p, i) => (
                  <Typography key={i} variant="body1">
                    {p}
                  </Typography>
                ))}
                {p.urlLinkText != null && (
                  <Link variant="body1" href={p.url} target="_blank">
                    {p.urlLinkText}
                  </Link>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={boxCardNavigationButtonsStyle}>
        <CardNavigationButtons
          onCardChange={onCardChange}
          mode="nextAndPrevious"
          nextCardTabEnum={PortfolioCardsTabEnum.Experience}
          nextCardTitle={textData.nextCardButtonText}
          previousCardTabEnum={PortfolioCardsTabEnum.Skills}
          previousCardTitle={textData.previousCardButtonText}
        />
      </Box>
    </Box>
  );
};

export default ProjectsCardContent;
