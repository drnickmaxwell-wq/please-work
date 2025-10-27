import path from "node:path";
import postcssImport from "postcss-import";

const config = {
  plugins: [
    postcssImport({
      resolve(id, basedir) {
        if (id === "tailwindcss") {
          return id;
        }
        if (id.startsWith("@/")) {
          return path.resolve(process.cwd(), id.slice(2));
        }
        if (id.startsWith(".") || id.startsWith("/")) {
          return path.resolve(basedir, id);
        }
        return id;
      },
    }),
    "@tailwindcss/postcss",
  ],
};

export default config;
