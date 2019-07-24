// Note: This file is used to proxy API requests to /graphql to the backend running on another port/server
// The reason I want to use this is so that I can call the backend using things like fetch("/graphql") instead of fetch("localhost:4001/graphql")
const proxy = require("http-proxy-middleware");

const target = process.env.PROXY || "http://prysma.local";

module.exports = app => {
  app.use(proxy("/graphql", { target, ws: true }));
};
