import { authApp } from "./applications/auth";
import { registerApplication, start } from "single-spa";
import { headerApp } from "./applications/header";
import { sharedProps } from "./shared_props";
import { createExternalApp } from "./utils";

type RemoteConfig = {
  name: string;
  endpoint: string;
};

const HOST = `${location.protocol}//${location.host}`;

const remoteConfigList: RemoteConfig[] = [
  {
    name: "external",
    endpoint: HOST + "/external.js",
    // endpoint: "http://localhost:3000/external.js"
  },
  {
    name: "nested",
    endpoint: HOST + "/nested/nested.es.js",
    // endpoint: "http://localhost:3000/nested/nested.es.js"
  },
  {
    name: "vue-app",
    endpoint: HOST + "/vue-app/vue-app.es.js",
    // endpoint: "http://localhost:3000/vue-app/vue-app.es.js"
  },
];

remoteConfigList.forEach((config) => {
  registerApplication({
    name: config.name,
    activeWhen: (loc) => loc.pathname.startsWith("/" + config.name),
    app: createExternalApp({ endpoint: config.endpoint }),
    customProps: sharedProps,
  });
});

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

start();
