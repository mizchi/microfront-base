/** @jsx h */
import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import type {
  Application,
  AuthState,
  Context,
  ApplicationProps,
} from "../types";

function App(props: {
  context: Context;
  logout: () => void;
  loginWith: (token: string) => void;
}) {
  useEffect(() => {}, []);
  return (
    <div>
      {props.context.auth.loggedIn ? (
        <div>
          <div>token: {props.context.auth.token}</div>
          <button
            onClick={() => {
              props.logout();
            }}
          >
            logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              props.loginWith(Math.random().toString());
            }}
          >
            login
          </button>
        </div>
      )}
    </div>
  );
}

function renderWithContext(
  props: ApplicationProps,
  context: Context,
  root: HTMLElement
) {
  render(
    <App context={context} loginWith={props.loginWith} logout={props.logout} />,
    root
  );
}

export const authApp: Application = {
  async bootstrap() {},
  async mount(props) {
    const d = props.subscribe((ctx) => {
      renderWithContext(props, ctx, props.getRoot());
    });
    renderWithContext(props, props.getContext(), props.getRoot());
    return d;
  },
  async unmount(props) {
    // render(null, props.getRoot(), props.getRoot());
    props.cleanup();
  },
  async update(_props) {
    console.log("update");
  },
};
