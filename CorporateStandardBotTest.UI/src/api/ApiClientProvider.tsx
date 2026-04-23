import { useMemo, type PropsWithChildren } from "react";
import { createApiClient } from "./client";
import { useMsal } from "@azure/msal-react";
import { ApiClientContext } from "./context";

export function ApiClientProvider(props: PropsWithChildren) {
  const { instance: msalInstance } = useMsal();
  const apiClient = useMemo(() => createApiClient(msalInstance), [msalInstance]);

  return <ApiClientContext.Provider value={apiClient}>
    {props.children}
  </ApiClientContext.Provider>
}