import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config";

export const MsalInstance = new PublicClientApplication(msalConfig);