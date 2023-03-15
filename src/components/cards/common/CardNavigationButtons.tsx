import { Button, ButtonGroup } from "@mui/material";
import { PortfolioCardsTabEnum } from "../../tabs/enums";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

interface CardNavigationButtonProps {
  onCardChange: (newCard: PortfolioCardsTabEnum) => void;
  mode: "nextOnly" | "previousOnly" | "nextAndPrevious";
  nextCardTitle?: string;
  previousCardTitle?: string;
  nextCardTabEnum?: PortfolioCardsTabEnum;
  previousCardTabEnum?: PortfolioCardsTabEnum;
}

const buildNextCardButton = (
  nextCardTabEnum: PortfolioCardsTabEnum,
  title: string,
  onCardChange: (newCard: PortfolioCardsTabEnum) => void
) => {
  return (
    <Button
      endIcon={<ArrowCircleRightIcon />}
      onClick={() => onCardChange(nextCardTabEnum)}
      variant="contained"
      data-testid="next-card-button"
    >
      {title}
    </Button>
  );
};

const buildPreviousCardButton = (
  previousCardTabEnum: PortfolioCardsTabEnum,
  title: string,
  onCardChange: (newCard: PortfolioCardsTabEnum) => void
) => {
  return (
    <Button
      startIcon={<ArrowCircleLeftIcon />}
      onClick={() => onCardChange(previousCardTabEnum)}
      variant="contained"
      data-testid="previous-card-button"
    >
      {title}
    </Button>
  );
};

const CardNavigationButtons: React.FC<CardNavigationButtonProps> = ({
  mode,
  onCardChange,
  nextCardTabEnum,
  nextCardTitle,
  previousCardTabEnum,
  previousCardTitle,
}) => {
  if (mode === "nextOnly") {
    if (nextCardTabEnum == null)
      throw new Error("When using nextOnly mode, nextCardTabEnum is necessary");
    if (nextCardTitle == null)
      throw new Error("When using nextOnly mode, nextCardTitle is necessary");
    return buildNextCardButton(nextCardTabEnum, nextCardTitle, onCardChange);
  } else if (mode === "previousOnly") {
    if (previousCardTabEnum == null)
      throw new Error(
        "When using previousOnly mode, previousCardTabEnum is necessary"
      );
    if (previousCardTitle == null)
      throw new Error(
        "When using previousOnly mode, previousCardTitle is necessary"
      );
    return buildPreviousCardButton(
      previousCardTabEnum,
      previousCardTitle,
      onCardChange
    );
  }

  if (nextCardTabEnum == null || previousCardTabEnum == null)
    throw new Error(
      "When using nextAndPrevious mode, nextCardTabEnum and previousCardTabEnum are necessary"
    );

  if (nextCardTitle == null || previousCardTitle == null)
    throw new Error(
      "When using nextAndPrevious mode, nextCardTitle and previousCardTitle are necessary"
    );

  return (
    <ButtonGroup variant="contained">
      {buildPreviousCardButton(
        previousCardTabEnum,
        previousCardTitle,
        onCardChange
      )}
      {buildNextCardButton(nextCardTabEnum, nextCardTitle, onCardChange)}
    </ButtonGroup>
  );
};

export default CardNavigationButtons;
