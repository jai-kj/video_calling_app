export const APP_META = Object.freeze({
  TITLE: "NextJs Meetings App",
  DESCRIPTION: "A video calling app built in Next.js, Stream API and ❤️",
});

export const APP_ROUTES = Object.freeze({
  BASE_ROUTE: "/",
  MEETINGS: "/meetings",
});

export const MESSAGES = Object.freeze({
  FAILURE: {
    ERROR_PAGE: "Sorry, something went wrong, Please try again later!",
    NO_STREAM_API_KEY: "Stream API key is undefined",
    NO_STREAM_API_SECRETS: "Stream API key or secret is undefined",
    INVALID_CLERK_USER: "User not authenticated",
  },
});
