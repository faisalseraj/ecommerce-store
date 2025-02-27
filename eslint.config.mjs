import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Base configuration using Next.js presets
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Custom rules can be defined here
    rules: {
      'react/no-unescaped-entities':'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type':'off',
      '@typescript-eslint/no-explicit-any': 'off', // Disable the rule globally
      // Alternatively, use 'warn' to allow but give a warning
      // '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default eslintConfig;