<template>
  <div id="nav">
    <h2>Vue Router App</h2>
    <nav>
      <router-link to="/vue-app">Index</router-link> |
      <router-link to="/vue-app/foo">Foo</router-link> |
      <router-link to="/vue-app/bar">Bar</router-link> |
    </nav>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";

type Props = {
  navigate: (url: string) => void;
};

type Bindings = {
  onClickExternal: (event: MouseEvent) => void;
};

export default defineComponent<Props, any, Bindings>({
  name: "App",
});
</script>
