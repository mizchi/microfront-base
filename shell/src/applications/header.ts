import type { Context } from "./../types";
import type { Application } from "../types";
import type { SvelteComponent } from "svelte";
import Nav from "../GlobalNavigation.svelte";

let app: SvelteComponent | null = null;
const headerRoot = document.querySelector("#header") as HTMLElement;

function render(context: Context) {
  if (app) {
    app.$set({ context });
  } else {
    app = new Nav({ target: headerRoot, props: { context } });
  }
}

let onUnmount: Array<() => void> = [];
export const headerApp: Application = {
  async bootstrap() {},
  async mount(props) {
    onUnmount.push(
      props.subscribe((newCtx) => {
        render(newCtx);
      })
    );
    render(props.getContext());
  },
  async unmount() {
    app?.$destroy();
  },
  async update() {},
};
