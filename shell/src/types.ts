import type {
  Application as SingleSpaApplication,
  CustomProps,
} from "single-spa";
export type Disposable = () => void;

export type AuthState =
  | {
      loggedIn: false;
    }
  | {
      loggedIn: true;
      token: string;
    };

export type Context = {
  auth: AuthState;
};

export type SharedProps = {
  getContext: () => Context;
  loginWith(token: string): void;
  logout(): void;
  route(url: string): void;
  subscribe(handler: (newContext: Context) => void): Disposable;
  getRoot(): HTMLElement;
  cleanup(): void;
};

export type ApplicationProps = SharedProps & CustomProps;

export type LifeCycle = (props: ApplicationProps) => Promise<Disposable>;
export type Application = SingleSpaApplication<SharedProps>;
