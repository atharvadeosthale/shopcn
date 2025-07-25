import Conf from "conf";

interface Config {
  serverUrl?: string;
  apiKey?: string;
}

export const config = new Conf<Config>({
  projectName: "shopcn-cli",
  projectVersion: "0.0.1",
});

export const getConfig = () => {
  return {
    serverUrl: config.get("serverUrl"),
    apiKey: config.get("apiKey"),
  };
};

export const setConfig = (data: Partial<Config>) => {
  if (data.serverUrl) config.set("serverUrl", data.serverUrl);
  if (data.apiKey) config.set("apiKey", data.apiKey);
};

export const clearConfig = () => {
  config.clear();
};

export const isAuthenticated = () => {
  const { serverUrl, apiKey } = getConfig();
  return Boolean(serverUrl && apiKey);
};