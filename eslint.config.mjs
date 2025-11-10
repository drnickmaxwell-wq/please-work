import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.config({
    overrides: [
      {
        files: ["scripts/**/*.cjs"],
        env: { node: true },
        rules: {
          "@typescript-eslint/no-var-requires": "off",
          "@typescript-eslint/no-require-imports": "off",
          "import/no-commonjs": "off",
        },
      },
    ],
  }),
  {
    files: [
      "app/**/*.{js,jsx,ts,tsx}",
      "components/**/*.{js,jsx,ts,tsx}",
      "src/**/*.{js,jsx,ts,tsx}",
      "styles/**/*.{js,jsx,ts,tsx}",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
          message: "Use Champagne tokens instead of literal hex.",
        },
      ],
    },
  },
];

export default eslintConfig;
