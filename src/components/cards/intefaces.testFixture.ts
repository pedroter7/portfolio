import { PortfolioCardsTabEnum } from "../tabs/enums";
import { CommonCardContentProps } from "./intefaces";

function createMocksForCommonCardContentProps(): CommonCardContentProps {
  return {
    onCardChange: jest.fn((newCard: PortfolioCardsTabEnum) => {}),
  };
}

export { createMocksForCommonCardContentProps };
