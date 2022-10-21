import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

export const initGA = () => {
  if (IS_BROWSER && !window.GA_INITIALIZED)
    ReactGA.initialize("UA-137962581-2");
};
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) {
    ReactGA.event({ category, action, label });
  }
};
export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
