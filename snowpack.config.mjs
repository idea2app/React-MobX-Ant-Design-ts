/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    src: "/",
  },
  plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-react-refresh"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
