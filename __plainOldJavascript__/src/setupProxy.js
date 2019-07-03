const proxy = require("http-proxy-middleware");

const target = process.env.PROXY || "http://prysma.local"; // "http://localhost:4001"

module.exports = app => {
  app.use(proxy("/graphql", { target, ws: true }));
};
