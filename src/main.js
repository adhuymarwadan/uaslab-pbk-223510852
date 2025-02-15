// FILE: main.js

import { createApp } from "vue";
import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(Quasar).mount("#app");
// FILE: App.vue
const myApp = createApp(App);

myApp.use(router);
myApp.use(Quasar, {
  config: {
    brand: {
      primary: variables.$primary,
      secondary: variables.$secondary,
      accent: variables.$accent,
      // ... other theme variables ...
    },
  },
  plugins: {}, // import Quasar plugins and add here
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
