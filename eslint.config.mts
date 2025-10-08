import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { eq } from "lodash";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } 
  },
  tseslint.configs.recommended,
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["warn", { vars: "all", args:"none" }],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "eqeqeq": ["error", "always"],
    },
  },
  {
    ignores: ["node_modules", "dist", "eslint.config.mts"],
  }
]);
