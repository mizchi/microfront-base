import { authApp } from "./applications/auth";
import { registerApplication, start } from "single-spa";
import { headerApp } from "./applications/header";
import { sharedProps } from "./shared_props";
import { createExternalApp } from "./utils";

registerApplication({
  name: "header",
  activeWhen: (_loc) => true,
  app: headerApp,
  customProps: sharedProps,
});

registerApplication({
  name: "home",
  activeWhen: (loc) => loc.pathname === "/",
  app: authApp,
  customProps: sharedProps,
});

// minimum
registerApplication({
  name: "external",
  activeWhen: (loc) => loc.pathname.startsWith("/external"),
  app: createExternalApp({ endpoint: "http://localhost:3000/external.js" }),
  customProps: sharedProps,
});

// nested routing
registerApplication({
  name: "nested",
  activeWhen: (loc) => loc.pathname.startsWith("/nested"),
  app: createExternalApp({
    endpoint: "http://localhost:3000/nested/nested.es.js",
  }),
  customProps: sharedProps,
});

// nested routing
registerApplication({
  name: "vue-app",
  activeWhen: (loc) => loc.pathname.startsWith("/vue-app"),
  app: createExternalApp({
    endpoint: "http://localhost:3000/vue-app/vue-app.es.js",
  }),
  customProps: sharedProps,
});

start();
