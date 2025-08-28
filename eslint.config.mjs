import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuration for your main Node.js files (index.js, cli.js)
  {
    files: ["**/*.js"],
    ignores: ["__tests__/**/*.js"], // Ignore test files in this config block
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Use Node.js global variables
      },
    },
    rules: {
      ...js.configs.recommended.rules,
	  "semi": ["error", "always"]
    },
  },

  // Specific configuration JUST for your Jest test files
  {
    files: ["__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest, // Use Jest global variables
        ...globals.node, // Test files also run in a Node environment
      },
    },
    rules: {
        ...js.configs.recommended.rules,
    }
  },
]);