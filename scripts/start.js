"use strict";

process.env.REACT_APP_ENV = "dev";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

//const spawnSync = require("child_process").spawnSync;
const spawn = require("cross-spawn");
const { delimiter } = require("path");
const pathResolve = require("path").resolve;

let argv = process.argv.slice(2);

if (argv.indexOf("--local") >= 0) {
  // Remove --local from argv
  argv = argv.filter(arg => arg !== "--local");

  // Set the env variable to use the local server
  console.log("Using Server at http://localhost:4001");
  process.env.REACT_APP_USE_LOCAL_SERVER = true;
  process.env.PROXY = "http://localhost:4001";
} else {
  console.log("Using Server at http://prysma.local");
}

spawn.sync("react-scripts", ["start", ...argv], {
  stdio: ["ignore", "inherit", "inherit"],
  cwd: process.cwd(),
  env: Object.assign({}, process.env, {
    PATH:
      process.env.PATH +
      delimiter +
      pathResolve(process.cwd(), "node_modules", ".bin"),
  }),
});
