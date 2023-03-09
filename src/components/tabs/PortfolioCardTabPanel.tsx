import { ReactNode } from "react";
import { I18nComponentProps } from "../../i18n/interfaces";

interface PortfolioCardTabPanelProps extends I18nComponentProps {
  children?: ReactNode;
  index: number;
  isVisible: boolean;
}

const PortfolioCardTabPanel: React.FC<PortfolioCardTabPanelProps> = ({
  index,
  isVisible,
  children,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      id={`portfolio-card-${index}`}
    >
      {children}
    </div>
  );
};

export default PortfolioCardTabPanel;
