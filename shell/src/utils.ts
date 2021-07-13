import type { Application, LifeCycle, Disposable } from "./types";

let unmountListeners: Array<Disposable> = [];

export function createExternalApp(options: { endpoint: string }): Application {
  return {
    async bootstrap() {},
    async mount(props) {
      console.log("[external:mount]", options.endpoint);
      const mod = await import(/* @vite-ignore */ options.endpoint);
      const disposable = await mod.default(props);
      unmountListeners.push(disposable);
    },
    async unmount() {
      console.log("[external:unmount]", options.endpoint);
      await Promise.all(unmountListeners.map((disposable) => disposable()));
      unmountListeners = [];
      cleanup();
    },
    async update() {},
  };
}

const permanentRoot = document.querySelector("#main") as HTMLElement;
let el: HTMLElement | null;

export function getRoot(): HTMLElement {
  if (permanentRoot.firstChild == null) {
    cleanup();
  }
  return el as HTMLElement;
}

let cycle = 0;

export function cleanup() {
  el?.remove();
  el = document.createElement("div");
  el.id = "root";
  el.dataset.cycle = (cycle++).toString();
  permanentRoot.appendChild(el);
}
