import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getConfigurationData, getFooterTexts } from "../../i18n/i18nUtil";
import { I18nComponentProps } from "../../i18n/interfaces";
import Linkedin from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";
import Mail from "@mui/icons-material/Mail";
import { UILanguage } from "../../i18n/enums";

interface FooterProps extends I18nComponentProps {
  onUiLanguageChange: (selectedLanguage: UILanguage) => void;
}

const Footer: React.FC<FooterProps> = ({
  currentUILanguage,
  onUiLanguageChange,
}) => {
  const [textData, setTextData] = useState(getFooterTexts(currentUILanguage));
  const [configData, setConfigData] = useState(
    getConfigurationData(currentUILanguage)
  );

  useEffect(() => {
    setTextData(getFooterTexts(currentUILanguage));
    setConfigData(getConfigurationData(currentUILanguage));
  }, [currentUILanguage]);

  const theme = useTheme();
  const screenIsSmallerThanMediumBreakpoint = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const onButtonLinkClick = (url: string) => window.open(url, "_blank");

  const onButtonUiLanguageClick = (selectedLanguage: UILanguage) =>
    onUiLanguageChange(selectedLanguage);

  const idsPrefix = "footer-";

  const mailtoUrl = `mailto: ${configData.contactLinks.email}`;

  const boxContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    gap: "0.5vmin",
  };

  const boxReachMeStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1vmin",
  };

  return (
    <Box sx={boxContainerStyle}>
      <Box sx={boxReachMeStyle}>
        {!screenIsSmallerThanMediumBreakpoint && (
          <Typography variant="h6" id={`${idsPrefix}contactMeText`}>
            {textData.contactMeText}
          </Typography>
        )}
        <ButtonGroup>
          <Tooltip title={textData.linkedinLinkToolTipText} arrow>
            <IconButton
              onClick={() =>
                onButtonLinkClick(configData.contactLinks.linkedin)
              }
            >
              <Linkedin />
            </IconButton>
          </Tooltip>
          <Tooltip title={textData.githubLinkToolTipText} arrow>
            <IconButton
              onClick={() => onButtonLinkClick(configData.contactLinks.github)}
            >
              <GitHub />
            </IconButton>
          </Tooltip>
          {screenIsSmallerThanMediumBreakpoint && (
            <Tooltip
              title={`${textData.sendMeMailText} ${configData.contactLinks.email}`}
            >
              <IconButton onClick={() => window.open(mailtoUrl, "_blank")}>
                <Mail />
              </IconButton>
            </Tooltip>
          )}
        </ButtonGroup>
        {!screenIsSmallerThanMediumBreakpoint && (
          <Typography variant="body1" id={`${idsPrefix}sendMeMailText`}>
            {textData.sendMeMailText}{" "}
            <Link href={mailtoUrl}>{configData.contactLinks.email}</Link>
          </Typography>
        )}
      </Box>
      <Box sx={boxReachMeStyle}>
        <Typography>{textData.languageText}</Typography>
        <ButtonGroup variant="text">
          <Button
            disabled={currentUILanguage === UILanguage.English}
            onClick={() => onButtonUiLanguageClick(UILanguage.English)}
          >
            EN
          </Button>
          <Button
            disabled={currentUILanguage === UILanguage.Portuguese}
            onClick={() => onButtonUiLanguageClick(UILanguage.Portuguese)}
          >
            PT
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Footer;
