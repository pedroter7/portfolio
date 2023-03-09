import { PortfolioCardsTabEnum } from "../tabs/enums";

export interface CommonCardContentProps {
    onCardChange: (newCard: PortfolioCardsTabEnum) => void;
}