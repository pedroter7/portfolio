import { Button, ButtonGroup } from "@mui/material";
import { PortfolioCardsTabEnum } from "../../tabs/enums";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

interface NextPreviousCardButtonGroupProps {
  onCardChange: (newCard: PortfolioCardsTabEnum) => void;
  nextCardTitle: string;
  previousCardTitle: string;
  nextCardTabEnum: PortfolioCardsTabEnum;
  previousCardTabEnum: PortfolioCardsTabEnum;
}

const NextPreviousCardButtonGroup: React.FC<
  NextPreviousCardButtonGroupProps
> = ({
  onCardChange,
  nextCardTitle,
  previousCardTitle,
  nextCardTabEnum,
  previousCardTabEnum,
}) => {
  return (
    <ButtonGroup variant="contained">
      <Button
        startIcon={<ArrowCircleLeftIcon />}
        onClick={() => onCardChange(previousCardTabEnum)}
      >
        {previousCardTitle}
      </Button>
      <Button
        endIcon={<ArrowCircleRightIcon />}
        onClick={() => onCardChange(nextCardTabEnum)}
      >
        {nextCardTitle}
      </Button>
    </ButtonGroup>
  );
};

export default NextPreviousCardButtonGroup;
