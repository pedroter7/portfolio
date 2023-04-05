import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PortfolioCardsTabEnum } from "./components/tabs/enums";
import { UILanguage } from "./i18n/enums";
import { getAllTextData, getConfigurationData } from "./i18n/i18nUtil";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App
      currentUILanguage={UILanguage.English}
      getTextData={getAllTextData}
      getConfigurationData={getConfigurationData}
      initialTab={PortfolioCardsTabEnum.Home}
    />
  </React.StrictMode>
);
