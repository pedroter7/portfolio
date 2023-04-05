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
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      id={`portfolio-card-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

export default PortfolioCardTabPanel;
