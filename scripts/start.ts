/* eslint no-console:0 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { argv } from "yargs";
import execa from "execa";

process.env.REACT_APP_ENV = "development";

const { PROXY_PROTOCOL = "http", PROXY_HOST = "prysma.local", PROXY_PORT = "80" } = process.env;

// Crash on unhandled rejections
process.on("unhandledRejection", (err): never => {
  throw err;
});

const startArgs = process.argv.slice(2);

if (argv.local) {
  // Remove --local from argv
  startArgs.splice(startArgs.indexOf("--local"), 1);

  // Set the env variable to use the local server
  console.log("Using Server at http://localhost:4001");
  process.env.PROXY = "http://localhost:4001";
} else {
  process.env.PROXY = `${PROXY_PROTOCOL}://${PROXY_HOST}:${PROXY_PORT}`;
  console.log(`Using Server at ${process.env.PROXY}`);
}

execa.sync("react-scripts", ["start", ...startArgs], {
  stdio: "inherit",
  preferLocal: true,
});
