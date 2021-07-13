import { ApplicationProps } from "../../shell/src/types";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Index from "./components/Index.vue";

const routes = [
  {
    path: APP_ROOT,
    component: Index,
  },
  {
    path: `${APP_ROOT}foo`,
    component: () => import("./components/Foo.vue"),
  },
  {
    path: `${APP_ROOT}bar`,
    component: () => import("./components/Bar.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

async function run(props: ApplicationProps) {
  console.log("vue-app:start");
  const root = props.getRoot();
  const app = createApp(App, {
    navigate: props.route,
  }).use(router);
  app.mount(root);
  return () => {
    app.unmount();
  };
}

export default run;
