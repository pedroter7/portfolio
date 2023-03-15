import { render, screen } from "@testing-library/react";
import CardNavigationButtons from "./CardNavigationButtons";
import { faker } from "@faker-js/faker";
import { PortfolioCardsTabEnum } from "../../tabs/enums";
import { getRandomNonHeterogeneousEnumValue } from "../../../util/enumUtil";
import userEvent from "@testing-library/user-event";

const nextCardButtonTestId = "next-card-button";
const previousCardButtonTestId = "previous-card-button";
const createOnCardChangeMockFunction = () =>
  jest.fn((newCardEnum: PortfolioCardsTabEnum) => {});

describe("CardNavigationButtons component", () => {
  describe("Mode nextOnly", () => {
    it("Throws error when next tab enum is not provided", () => {
      expect(() =>
        render(
          <CardNavigationButtons
            mode="nextOnly"
            onCardChange={() => {}}
            nextCardTitle={faker.word.noun()}
          />
        )
      ).toThrow("nextCardTabEnum");
    });

    it("Throws error when next tab title is not provided", () => {
      expect(() => {
        render(
          <CardNavigationButtons
            mode="nextOnly"
            onCardChange={() => {}}
            nextCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
          />
        );
      }).toThrow("nextCardTitle");
    });

    it("Renders correctly", () => {
      const randomTitle = faker.word.noun();
      render(
        <CardNavigationButtons
          mode="nextOnly"
          onCardChange={() => {}}
          nextCardTabEnum={getRandomNonHeterogeneousEnumValue(
            PortfolioCardsTabEnum
          )}
          nextCardTitle={randomTitle}
        />
      );
      const button = screen.getByTestId(nextCardButtonTestId);
      expect(button).toHaveTextContent(randomTitle);
      expect(button).toBeVisible();
    });

    it("On click passes correct enum to on card change handler function", async () => {
      const enumValue = getRandomNonHeterogeneousEnumValue(
        PortfolioCardsTabEnum
      );
      const onCardChangeHander = createOnCardChangeMockFunction();
      const user = userEvent.setup();
      render(
        <CardNavigationButtons
          mode="nextOnly"
          onCardChange={onCardChangeHander}
          nextCardTabEnum={enumValue}
          nextCardTitle={faker.word.noun()}
        />
      );
      await user.click(screen.getByTestId(nextCardButtonTestId));
      expect(onCardChangeHander).toHaveBeenCalledTimes(1);
      expect(onCardChangeHander).toHaveBeenCalledWith(enumValue);
    });

    it("Only rendering the next button", () => {
      render(
        <CardNavigationButtons
          mode="nextOnly"
          onCardChange={() => {}}
          nextCardTabEnum={getRandomNonHeterogeneousEnumValue(
            PortfolioCardsTabEnum
          )}
          nextCardTitle={faker.word.noun()}
        />
      );
      const nextCardButton = screen.queryByTestId(nextCardButtonTestId);
      expect(nextCardButton).toBeInTheDocument();
      expect(nextCardButton).toBeVisible();
      expect(
        screen.queryByTestId(previousCardButtonTestId)
      ).not.toBeInTheDocument();
      expect(screen.queryAllByRole("button")).toHaveLength(1);
    });
  });

  describe("Mode previousOnly", () => {
    it("Throws an error when previous tab enum is not provided", () => {
      expect(() => {
        render(
          <CardNavigationButtons
            mode="previousOnly"
            onCardChange={() => {}}
            previousCardTitle={faker.word.noun()}
          />
        );
      }).toThrow("previousCardTabEnum");
    });

    it("Throws an error when previous card title is not provided", () => {
      expect(() => {
        render(
          <CardNavigationButtons
            mode="previousOnly"
            onCardChange={() => {}}
            previousCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
          />
        );
      }).toThrow("previousCardTitle");
    });

    it("Renders correctly", () => {
      const randomTitle = faker.word.noun();
      render(
        <CardNavigationButtons
          mode="previousOnly"
          onCardChange={() => {}}
          previousCardTitle={randomTitle}
          previousCardTabEnum={getRandomNonHeterogeneousEnumValue(
            PortfolioCardsTabEnum
          )}
        />
      );
      const button = screen.getByTestId(previousCardButtonTestId);
      expect(button).toHaveTextContent(randomTitle);
      expect(button).toBeVisible();
    });

    it("On click passes correct enum to on card change handler function", async () => {
      const enumValue = getRandomNonHeterogeneousEnumValue(
        PortfolioCardsTabEnum
      );
      const onCardChangeHander = createOnCardChangeMockFunction();
      const user = userEvent.setup();
      render(
        <CardNavigationButtons
          mode="previousOnly"
          onCardChange={onCardChangeHander}
          previousCardTabEnum={enumValue}
          previousCardTitle={faker.word.noun()}
        />
      );
      await user.click(screen.getByTestId(previousCardButtonTestId));
      expect(onCardChangeHander).toHaveBeenCalledTimes(1);
      expect(onCardChangeHander).toHaveBeenCalledWith(enumValue);
    });

    it("Only rendering the previous button", () => {
      render(
        <CardNavigationButtons
          mode="previousOnly"
          onCardChange={() => {}}
          previousCardTabEnum={getRandomNonHeterogeneousEnumValue(
            PortfolioCardsTabEnum
          )}
          previousCardTitle={faker.word.noun()}
        />
      );
      const previousCardButton = screen.queryByTestId(previousCardButtonTestId);
      expect(previousCardButton).toBeInTheDocument();
      expect(previousCardButton).toBeVisible();
      expect(
        screen.queryByTestId(nextCardButtonTestId)
      ).not.toBeInTheDocument();
      expect(screen.queryAllByRole("button")).toHaveLength(1);
    });
  });

  describe("Mode nextAndPrevious", () => {
    it("Throws error when next tab enum is not provided", () => {
      expect(() =>
        render(
          <CardNavigationButtons
            mode="nextAndPrevious"
            onCardChange={() => {}}
            nextCardTitle={faker.word.noun()}
            previousCardTitle={faker.word.noun()}
            previousCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
          />
        )
      ).toThrow("nextCardTabEnum");
    });

    it("Throws error when next tab title is not provided", () => {
      expect(() => {
        render(
          <CardNavigationButtons
            mode="nextAndPrevious"
            onCardChange={() => {}}
            nextCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
            previousCardTitle={faker.word.noun()}
            previousCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
          />
        );
      }).toThrow("nextCardTitle");
    });

    it("Throws an error when previous tab enum is not provided", () => {
      expect(() => {
        render(
          <CardNavigationButtons
            mode="previousOnly"
            onCardChange={() => {}}
            previousCardTitle={faker.word.noun()}
            nextCardTitle={faker.word.noun()}
            nextCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
          />
        );
      }).toThrow("previousCardTabEnum");
    });

    it("Throws an error when previous card title is not provided", () => {
      expect(() => {
        render(
          <CardNavigationButtons
            mode="previousOnly"
            onCardChange={() => {}}
            previousCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
            nextCardTitle={faker.word.noun()}
            nextCardTabEnum={getRandomNonHeterogeneousEnumValue(
              PortfolioCardsTabEnum
            )}
          />
        );
      }).toThrow("previousCardTitle");
    });

    it("Renders correctly", () => {
      const nextCardRandomTitle = faker.word.noun();
      const previousCardRandomTitle = faker.word.noun();
      render(
        <CardNavigationButtons
          mode="nextAndPrevious"
          onCardChange={() => {}}
          previousCardTitle={previousCardRandomTitle}
          previousCardTabEnum={getRandomNonHeterogeneousEnumValue(
            PortfolioCardsTabEnum
          )}
          nextCardTitle={nextCardRandomTitle}
          nextCardTabEnum={getRandomNonHeterogeneousEnumValue(
            PortfolioCardsTabEnum
          )}
        />
      );
      const nextButton = screen.getByTestId(nextCardButtonTestId);
      expect(nextButton).toHaveTextContent(nextCardRandomTitle);
      expect(nextButton).toBeVisible();
      const previousButton = screen.getByTestId(previousCardButtonTestId);
      expect(previousButton).toHaveTextContent(previousCardRandomTitle);
      expect(previousButton).toBeVisible();
    });

    it("On clicks the correct enum is passed as param for the handler function", async () => {
      const nextButtonRandomEnum = getRandomNonHeterogeneousEnumValue(
        PortfolioCardsTabEnum
      );
      const previousButtonRandomEnum = getRandomNonHeterogeneousEnumValue(
        PortfolioCardsTabEnum
      );
      const onCardChangeHander = createOnCardChangeMockFunction();
      const user = userEvent.setup();
      render(
        <CardNavigationButtons
          mode="nextAndPrevious"
          onCardChange={onCardChangeHander}
          previousCardTitle={faker.word.noun()}
          previousCardTabEnum={previousButtonRandomEnum}
          nextCardTitle={faker.word.noun()}
          nextCardTabEnum={nextButtonRandomEnum}
        />
      );
      const previousButton = screen.getByTestId(nextCardButtonTestId);
      const nextButton = screen.getByTestId(previousCardButtonTestId);
      await user.click(previousButton);
      await user.click(nextButton);
      expect(onCardChangeHander).toHaveBeenCalledTimes(2);
      expect(onCardChangeHander).toHaveBeenCalledWith(nextButtonRandomEnum);
      expect(onCardChangeHander).toHaveBeenCalledWith(previousButtonRandomEnum);
    });
  });
});
