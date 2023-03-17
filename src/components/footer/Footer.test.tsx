import { UILanguage } from "../../i18n/enums";
import userEvent from "@testing-library/user-event";
import {
  createRandomI18nConfigurationData,
  createRandomI18nFooterTexts,
} from "../../i18n/i18n.testFixture";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { getRandomNonHeterogeneousEnumValue } from "../../util/enumUtil";
import { match } from "css-mediaquery";
import { mock } from "jest-mock-extended";

const englishButtonTestId = "i18n-language-button-english";
const portugueseButtonTestId = "i18n-language-button-portuguese";
const linkedinButtonTestId = "linkedin-contact-button";
const githubButtonTestId = "github-contact-button";
const emailIconButtonTestId = "email-contact-iconButton";
const emailLinkTestId = "email-contact-link";

function createMocksForComponentProps() {
  const enTextData = createRandomI18nFooterTexts();
  const ptTextData = createRandomI18nFooterTexts();
  const enConfigData = createRandomI18nConfigurationData();
  const ptConfigData = createRandomI18nConfigurationData();
  const getFooterTextDataMock = jest.fn((language: UILanguage) =>
    language === UILanguage.English ? enTextData : ptTextData
  );
  const getConfigurationDataMock = jest.fn((language: UILanguage) =>
    language === UILanguage.English ? enConfigData : ptConfigData
  );
  const onUiLanguageChangeMock = jest.fn((selectedLanguage: UILanguage) => {});
  return {
    enTextData,
    ptTextData,
    enConfigData,
    ptConfigData,
    getFooterTextDataMock,
    getConfigurationDataMock,
    onUiLanguageChangeMock,
  };
}

function createMatchMedia(width: number): (query: string) => MediaQueryList {
  return (query: string) => {
    const mockedMediaQueryList = mock<MediaQueryList>({
      matches: match(query, { width }),
    });
    return mockedMediaQueryList;
  };
}

let windowOpenSpy: jest.SpyInstance<
  Window | null,
  [
    url?: string | URL | undefined,
    target?: string | undefined,
    features?: string | undefined
  ]
>;

beforeEach(() => {
  windowOpenSpy = jest.spyOn(window, "open");
});
afterEach(() => windowOpenSpy.mockRestore());

describe("<Footer />", () => {
  describe("I18n buttons", () => {
    it("All language buttons are rendered correctly", () => {
      const mocks = createMocksForComponentProps();
      render(
        <Footer
          currentUILanguage={getRandomNonHeterogeneousEnumValue(UILanguage)}
          getConfigurationData={mocks.getConfigurationDataMock}
          getFooterTextData={mocks.getFooterTextDataMock}
          onUiLanguageChange={mocks.onUiLanguageChangeMock}
        />
      );
      const ptButton = screen.getByTestId(portugueseButtonTestId);
      const enButton = screen.getByTestId(englishButtonTestId);
      expect(ptButton).toBeVisible();
      expect(enButton).toBeVisible();
    });

    it("Clicking PT language button calls the handler with correct language enum", async () => {
      const mocks = createMocksForComponentProps();
      const initialLanguage = UILanguage.English;
      const user = userEvent.setup();
      render(
        <Footer
          currentUILanguage={initialLanguage}
          getConfigurationData={mocks.getConfigurationDataMock}
          getFooterTextData={mocks.getFooterTextDataMock}
          onUiLanguageChange={mocks.onUiLanguageChangeMock}
        />
      );
      const ptButton = screen.getByTestId(portugueseButtonTestId);
      await user.click(ptButton);
      expect(mocks.onUiLanguageChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onUiLanguageChangeMock).toHaveBeenCalledWith(
        UILanguage.Portuguese
      );
    });

    it("Clicking EN language button calls the handler with correct language enum", async () => {
      const mocks = createMocksForComponentProps();
      const initialLanguage = UILanguage.Portuguese;
      const user = userEvent.setup();
      render(
        <Footer
          currentUILanguage={initialLanguage}
          getConfigurationData={mocks.getConfigurationDataMock}
          getFooterTextData={mocks.getFooterTextDataMock}
          onUiLanguageChange={mocks.onUiLanguageChangeMock}
        />
      );
      const enButton = screen.getByTestId(englishButtonTestId);
      await user.click(enButton);
      expect(mocks.onUiLanguageChangeMock).toHaveBeenCalledTimes(1);
      expect(mocks.onUiLanguageChangeMock).toHaveBeenCalledWith(
        UILanguage.English
      );
    });
  });

  describe("Contact links and buttons", () => {
    describe("LinkedIn", () => {
      it("Renders correctly", () => {
        const mocks = createMocksForComponentProps();
        render(
          <Footer
            currentUILanguage={getRandomNonHeterogeneousEnumValue(UILanguage)}
            getConfigurationData={mocks.getConfigurationDataMock}
            getFooterTextData={mocks.getFooterTextDataMock}
            onUiLanguageChange={mocks.onUiLanguageChangeMock}
          />
        );
        const linkedinButton = screen.getByTestId(linkedinButtonTestId);
        expect(linkedinButton).toBeVisible();
      });

      it("On click the correct url is open in a _blank target", async () => {
        const mocks = createMocksForComponentProps();
        const languageEnum = getRandomNonHeterogeneousEnumValue(UILanguage);
        const user = userEvent.setup();
        render(
          <Footer
            currentUILanguage={languageEnum}
            getConfigurationData={mocks.getConfigurationDataMock}
            getFooterTextData={mocks.getFooterTextDataMock}
            onUiLanguageChange={mocks.onUiLanguageChangeMock}
          />
        );
        const linkedinButton = screen.getByTestId(linkedinButtonTestId);
        await user.click(linkedinButton);
        expect(windowOpenSpy).toHaveBeenCalledTimes(1);
        expect(windowOpenSpy).toHaveBeenCalledWith(
          mocks.getConfigurationDataMock(languageEnum).contactLinks.linkedin,
          "_blank"
        );
      });
    });

    describe("GitHub", () => {
      it("Renders correctly", () => {
        const mocks = createMocksForComponentProps();
        render(
          <Footer
            currentUILanguage={getRandomNonHeterogeneousEnumValue(UILanguage)}
            getConfigurationData={mocks.getConfigurationDataMock}
            getFooterTextData={mocks.getFooterTextDataMock}
            onUiLanguageChange={mocks.onUiLanguageChangeMock}
          />
        );
        const githubButton = screen.getByTestId(githubButtonTestId);
        expect(githubButton).toBeVisible();
      });

      it("On click the correct url is open in a _blank target", async () => {
        const mocks = createMocksForComponentProps();
        const languageEnum = getRandomNonHeterogeneousEnumValue(UILanguage);
        const user = userEvent.setup();
        render(
          <Footer
            currentUILanguage={languageEnum}
            getConfigurationData={mocks.getConfigurationDataMock}
            getFooterTextData={mocks.getFooterTextDataMock}
            onUiLanguageChange={mocks.onUiLanguageChangeMock}
          />
        );
        const githubButton = screen.getByTestId(githubButtonTestId);
        await user.click(githubButton);
        expect(windowOpenSpy).toHaveBeenCalledTimes(1);
        expect(windowOpenSpy).toHaveBeenCalledWith(
          mocks.getConfigurationDataMock(languageEnum).contactLinks.github,
          "_blank"
        );
      });
    });

    describe("Email", () => {
      it("Renders Link correctly on big screen, shouldn't render icon", () => {
        const mocks = createMocksForComponentProps();
        window.matchMedia = createMatchMedia(3000);
        render(
          <Footer
            currentUILanguage={getRandomNonHeterogeneousEnumValue(UILanguage)}
            getConfigurationData={mocks.getConfigurationDataMock}
            getFooterTextData={mocks.getFooterTextDataMock}
            onUiLanguageChange={mocks.onUiLanguageChangeMock}
          />
        );
        const emailLink = screen.getByTestId(emailLinkTestId);
        expect(emailLink).toBeVisible();
        expect(
          screen.queryByTestId(emailIconButtonTestId)
        ).not.toBeInTheDocument();
      });

      it("Renders icon button correctly on small screen, shouldn't render link", () => {
        const mocks = createMocksForComponentProps();
        window.matchMedia = createMatchMedia(100);
        render(
          <Footer
            currentUILanguage={getRandomNonHeterogeneousEnumValue(UILanguage)}
            getConfigurationData={mocks.getConfigurationDataMock}
            getFooterTextData={mocks.getFooterTextDataMock}
            onUiLanguageChange={mocks.onUiLanguageChangeMock}
          />
        );
        const emailButton = screen.getByTestId(emailIconButtonTestId);
        expect(emailButton).toBeVisible();
        expect(screen.queryByTestId(emailLinkTestId)).not.toBeInTheDocument();
      });

      it("On click icon button the correct url is open in a _blank target", async () => {
        const mocks = createMocksForComponentProps();
        const languageEnum = getRandomNonHeterogeneousEnumValue(UILanguage);
        const user = userEvent.setup();
        render(
          <Footer
            currentUILanguage={languageEnum}
            getConfigurationData={mocks.getConfigurationDataMock}
            getFooterTextData={mocks.getFooterTextDataMock}
            onUiLanguageChange={mocks.onUiLanguageChangeMock}
          />
        );
        const emailIconButton = screen.getByTestId(emailIconButtonTestId);
        await user.click(emailIconButton);
        expect(windowOpenSpy).toHaveBeenCalledTimes(1);
        expect(windowOpenSpy).toHaveBeenCalledWith(
          `mailto: ${mocks.getConfigurationDataMock(languageEnum).contactLinks.email}`,
          "_blank"
        );
      })
    });
  });
});
