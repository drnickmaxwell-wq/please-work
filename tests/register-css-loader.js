import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./tests/css-module-loader.mjs", pathToFileURL("./"));
