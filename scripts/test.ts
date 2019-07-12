/* eslint no-console:0 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { argv } from "yargs";
import execa from "execa";

process.env.REACT_APP_ENV = "test";

// Crash on unhandled rejections
process.on("unhandledRejection", (err): never => {
  throw err;
});

const jestArgs = process.argv.slice(2);

// Don't watch (set CI flag to true) if --no-watch was specified
if ("watch" in argv && !argv.watch) {
  process.env.CI = "true";
  jestArgs.splice(jestArgs.indexOf("--no-watch"), 1); // Remove no-watch option from argv so jest doesn't screw up
}

execa.sync("react-scripts", ["test", "--env=jsdom", ...jestArgs], {
  stdio: "inherit",
  preferLocal: true,
});
