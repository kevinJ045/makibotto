import esbuild from "esbuild";
import babel from "esbuild-plugin-babel";

esbuild.build({
  entryPoints: ["index.js"],
  bundle: true,
  format: "esm",
  minify: true,
  outfile: "worker.js",
  plugins: [babel()],
});
