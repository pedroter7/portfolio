import { Button } from "@mui/material";
import { PortfolioCardsTabEnum } from "../../tabs/enums";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import NextPreviousCardButtonGroup from "./NextPreviousCardButtonGroup";

interface CardNavigationButtonProps {
  onCardChange: (newCard: PortfolioCardsTabEnum) => void;
  mode: "nextOnly" | "previousOnly" | "nextAndPrevious";
  nextCardTitle?: string;
  previousCardTitle?: string;
  nextCardTabEnum?: PortfolioCardsTabEnum;
  previousCardTabEnum?: PortfolioCardsTabEnum;
}

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
    return (
      <Button
        endIcon={<ArrowCircleRightIcon />}
        onClick={() => onCardChange(nextCardTabEnum)}
        variant="contained"
      >
        {nextCardTitle}
      </Button>
    );
  } else if (mode === "previousOnly") {
    if (previousCardTabEnum == null)
      throw new Error(
        "When using previousOnly mode, previousCardTabEnum is necessary"
      );
    if (previousCardTitle == null)
      throw new Error(
        "When using previousOnly mode, previousCardTitle is necessary"
      );
    return (
      <Button
        startIcon={<ArrowCircleLeftIcon />}
        onClick={() => onCardChange(previousCardTabEnum)}
        variant="contained"
      >
        {previousCardTitle}
      </Button>
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
    <NextPreviousCardButtonGroup
      nextCardTabEnum={nextCardTabEnum}
      nextCardTitle={nextCardTitle}
      onCardChange={onCardChange}
      previousCardTabEnum={previousCardTabEnum}
      previousCardTitle={previousCardTitle}
    />
  );
};

export default CardNavigationButtons;
