<script lang="ts">
  import type { Context } from "./types";
  import { navigateToUrl } from "single-spa";
  export let context: Context;
</script>

<nav>
  <h1>Microfront Base</h1>
  <button on:click={() => navigateToUrl("/")}>Home</button>
  |
  <button on:click={() => navigateToUrl("/nested")}>/nested</button>
  |
  <button on:click={() => navigateToUrl("/external")}>/external</button>
  |
  <button on:click={() => navigateToUrl("/vue-app")}>/vue-app</button>

  {#if context.auth.loggedIn}
    loggedIn
  {/if}
</nav>
<hr />
