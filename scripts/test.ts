/* eslint no-console:0 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import spawn from "cross-spawn";
import { delimiter, resolve as pathResolve } from "path";

process.env.REACT_APP_ENV = "test";

// Crash on unhandled rejections
process.on("unhandledRejection", (err): never => {
  throw err;
});

let argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (argv.indexOf("--no-watch") >= 0) {
  // Remove --no-watch from argv
  argv = argv.filter((arg): boolean => arg !== "--no-watch");

  // Set the env variable to not watch files
  process.env.CI = "true";
}

const result = spawn.sync("react-scripts", ["test", "--env=jsdom", ...argv], {
  stdio: ["inherit", "inherit", "inherit"], // stdin, stdout, stderr. set to ignore to ignore
  cwd: process.cwd(),
  env: Object.assign({}, process.env, {
    PATH: process.env.PATH + delimiter + pathResolve(process.cwd(), "node_modules", ".bin"),
  }),
});

if (result.status !== 0) {
  process.exit(result.status || 1);
}
