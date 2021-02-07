export const __prod__ = process.env.NODE_ENV === "production";

export const ApiErrors = {
  UserAlreadyExists:
    "Sorry! User with this email address is already registered.",
  Unknown: "Unknown error! Please contact us, if the it persists.",
};
