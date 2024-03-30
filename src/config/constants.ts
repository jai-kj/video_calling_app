export const APP_META = Object.freeze({
  TITLE: "NextJs Meetings App",
  DESCRIPTION: "A video calling app built in Next.js, Stream API and ❤️",
});

export const APP_ROUTES = Object.freeze({
  BASE_ROUTE: "/",
  MEETINGS: "/meetings",
});

export const STREAM_CALL_TYPES = Object.freeze({
  DEFAULT: "default",
  PRIVATE: "private-meeting",
});

export const STREAM_CALL_MEMBER = "call_member";

export const MESSAGES = Object.freeze({
  SUCCESS: {
    LINK_COPY: "Meeting link copied to clipboard",
  },
  FAILURE: {
    ERROR_PAGE: "Sorry, something went wrong, Please try again later!",
    NO_STREAM_API_KEY: "Stream API key is undefined",
    NO_STREAM_API_SECRETS: "Stream API key or secret is undefined",
    INVALID_CLERK_USER: "User not authenticated",
    CALL_NOT_FOUND: "Call not found",
    UNAUTHORIZED_CALL: "You are not authorized to join the meeting",
    STREAM_CALL_NOT_FOUND:
      "useStreamCall must be used within a Stream Call provider component with a valid call prop.",
    MEETING_NOT_STARTED: "This meeting has not started yet. It will begin at",
    MEETING_ENDED: "This meeting has ended",
  },
});
