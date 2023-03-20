import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { UILanguage } from "../../i18n/enums";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";
import PortfolioCardTabPanel from "./PortfolioCardTabPanel";

describe("<PortfolioCardTabPanel />", () => {
  describe("Renders correctly", () => {
    it("When visible is true", () => {
      const paragraphText = faker.lorem.paragraph(
        faker.datatype.number({ min: 3, max: 25 })
      );
      render(
        <PortfolioCardTabPanel
          currentUILanguage={getRandomNonHeterogeneousEnumValue(UILanguage)}
          index={faker.datatype.number({ min: 0 })}
          isVisible={true}
        >
          <p data-testid="paragraph">{paragraphText}</p>
        </PortfolioCardTabPanel>
      );
      const paragraph = screen.getByTestId("paragraph");
      expect(paragraph).toBeVisible();
      expect(paragraph).toHaveTextContent(paragraphText);
    });

    it("When visible is false", () => {
      const paragraphText = faker.lorem.paragraph(
        faker.datatype.number({ min: 3, max: 25 })
      );
      render(
        <PortfolioCardTabPanel
          currentUILanguage={getRandomNonHeterogeneousEnumValue(UILanguage)}
          index={faker.datatype.number({ min: 0 })}
          isVisible={false}
        >
          <p data-testid="paragraph">{paragraphText}</p>
        </PortfolioCardTabPanel>
      );
      const paragraph = screen.getByTestId("paragraph");
      expect(paragraph).not.toBeVisible();
    })
  });
});
