import { storage } from "./storage";

const TOKEN_KEYS = {
  ACCESS_TOKEN: "access-token",
  CLIENT: "client",
  UID: "uid",
} as const;

export const authStorage = {
  saveTokens: (headers: Headers): void => {
    const accessToken = headers.get("Access-Token");
    const client = headers.get("Client");
    const uid = headers.get("Uid");

    if (accessToken && client && uid) {
      storage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
      storage.setItem(TOKEN_KEYS.CLIENT, client);
      storage.setItem(TOKEN_KEYS.UID, uid);
    }
  },

  getAccessToken: (): string | null => {
    return storage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  getAuthHeaders: (): Record<string, string> => {
    const accessToken = storage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    const client = storage.getItem(TOKEN_KEYS.CLIENT);
    const uid = storage.getItem(TOKEN_KEYS.UID);

    return {
      "Content-Type": "application/json",
      ...(accessToken && { "access-token": accessToken }),
      ...(client && { client }),
      ...(uid && { uid }),
    };
  },

  clearTokens: (): void => {
    storage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    storage.removeItem(TOKEN_KEYS.CLIENT);
    storage.removeItem(TOKEN_KEYS.UID);
  },
};
