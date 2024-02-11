import { spawn } from "child_process";
import * as esbuild from "esbuild";
import gulp from "gulp";

const environmentObject = {};
const buildOutputDirectory = "build/";

for (const key in process.env) {
  if (
    key.includes("REACT_APP") ||
    key === "NODE_ENV" ||
    key === "SKIP_PREFLIGHT_CHECK" ||
    key === "INLINE_RUNTIME_CHUNK" ||
    key === "BROWSER"
  ) {
    const variable = process.env[key];

    environmentObject[`process.env.${key}`] = JSON.stringify(variable);
  }
}

const config = {
  entryPoints: ["src/index.tsx"],
  bundle: true,
  loader: {
    ".svg": "file",
    ".png": "file",
    ".jpg": "file",
    ".webp": "file",
    ".ttf": "file",
    ".otf": "file",
    ".gif": "file",
  },
  assetNames: "assets/[name]-[hash]",
  publicPath: "/",
  sourcemap: true,
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  define: environmentObject,
  outdir: buildOutputDirectory,
  // format: "esm",
  // splitting: true,
};

const watcherFunc = async () => {
  const buildInitTime = new Date().getTime();

  await esbuild.build(config);

  const buildEndTime = new Date().getTime();

  console.log(
    `\u001b[92mSuccessfully scanned in ${(buildEndTime - buildInitTime) / 1000.0} sec at ${new Date(buildEndTime).toISOString()}\u001b[0m`,
  );
  console.log("\u001b[93mwatching...\u001b[0m");
};

if (process.argv.includes("--watch")) {
  gulp.parallel(watcherFunc, () => {
    const childProcess = spawn("npm", ["run", "deploy"]);

    childProcess.stdout.on("data", (data) => process.stdout.write(data));
  })();
  // await watcherFunc();

  gulp.watch("src/**/*", { queue: false }, watcherFunc);

  process.on("SIGINT", () => {
    console.log("Build server stopped");
    process.exit();
  });
} else {
  await esbuild.build({ ...config, sourcemap: false });

  console.log("built...");
}
