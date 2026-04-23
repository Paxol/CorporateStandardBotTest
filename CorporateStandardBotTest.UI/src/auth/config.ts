import type { Configuration, RedirectRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "39d484a7-6db4-4655-8290-5701cbae0d9b",
    authority: "https://login.microsoftonline.com/94235ff3-6b0b-43e8-812c-90e3cd6ca359",
  },
  cache: {
    cacheLocation: "localStorage"
  },
};

export const authRequest = {
  scopes: ["api://207da365-5ae7-42a5-b4f9-e6cf133d2191/.default"],
  redirectUri: window.location.origin + "/redirect"
} satisfies RedirectRequest