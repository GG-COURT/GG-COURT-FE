import { defineConfig, globalIgnores } from "eslint/config"
import checkFile from "eslint-plugin-check-file"
import perfectionist from "eslint-plugin-perfectionist"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      perfectionist,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "perfectionist/sort-imports": [
        "warn",
        {
          type: "alphabetical",
          order: "asc",
          ignoreCase: true,
          newlinesBetween: 1,
          internalPattern: ["^@/.+"],
          groups: [
            "side-effect",
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
            ["type-builtin", "type-external"],
            "type-internal",
            ["type-parent", "type-sibling", "type-index"],
            "unknown",
          ],
        },
      ],
      "perfectionist/sort-named-imports": [
        "warn",
        { type: "alphabetical", order: "asc", ignoreCase: true },
      ],
      "perfectionist/sort-exports": [
        "warn",
        { type: "alphabetical", order: "asc", ignoreCase: true },
      ],
      "perfectionist/sort-named-exports": [
        "warn",
        { type: "alphabetical", order: "asc", ignoreCase: true },
      ],
    },
  },
  {
    // Next 라우트 파일명(page, layout, route)은 프레임워크 규칙이라 제외한다.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/app/**"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
])

export default eslintConfig
