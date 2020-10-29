export const DATE_TIME_FORMAT = "MMMM d, yyyy HH:mm";
export const DAY_DATE_TIME_FORMAT = "EEEE, d MMMM yyyy";
export const TIME_FORMAT = "HH:mm";

export const ValidationError = {
  Required: "Field required!",
  Email: "Must be valid email!",
  NumPositive: "Must be positive!",
  Url: "Must be valid URL!",
};

export const Routes = {
  LANDING: {
    path: "/",
  },
  LOGIN: {
    path: "/login",
  },
  REGISTER: {
    path: "/register",
  },
  FORGOT_PASSWORD: {
    path: "/forgot-password",
  },
  AUTH: {
    path: "/auth",
  },
  INVITATION: {
    path: "/invitation",
  },
  INVITATION_RESPONSE: {
    path: "/invitation/response",
  },
  INVITATION_GIFTS: {
    path: "/invitation/gifts",
  },
  WEDDING: {
    path: "/wedding",
  },
  GUESTS: {
    path: "/wedding/guests",
  },
  GUEST_NEW: {
    path: "/wedding/guests/new",
  },
  GUEST: {
    path: "/wedding/guests/:id",
  },
  GIFTS: {
    path: "/wedding/gifts",
  },
  GIFT_NEW: {
    path: "/wedding/gifts/new",
  },
  GIFT: {
    path: "/wedding/gifts/:id",
  },
};
