import { navigateToUrl, triggerAppChange } from "single-spa";
import type { SharedProps, Context, AuthState } from "./types";
import { getRoot, cleanup } from "./utils";

let _listeners: Array<(ctx: Context) => void> = [];

const TOKEN_KEY = "app:token";

function getAuth(): AuthState {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return {
      loggedIn: true,
      token,
    };
  } else {
    return {
      loggedIn: false,
    };
  }
}

function getContext(): Context {
  return {
    auth: getAuth(),
  };
}

export const sharedProps: SharedProps = {
  getRoot,
  getContext,
  cleanup,
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    _fireListeners(getContext());
  },
  loginWith(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    const ctx = getContext();
    _fireListeners(ctx);
  },
  route(url) {
    navigateToUrl(url);
  },
  subscribe(handler: (ctx: Context) => void) {
    _listeners.push(handler);
    return () => {
      _listeners = _listeners.filter((listener) => listener !== handler);
    };
  },
};

function _fireListeners(newCtx: Context) {
  return _listeners.forEach((listener) => listener(newCtx));
}
