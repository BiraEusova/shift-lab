import pluginJS from "@eslint/js";
import globals from "globals";
import pluginTS from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default pluginTS.config(
    {
        plugins: {
            "@typescript-eslint": pluginTS.plugin,
            react: pluginReact,
            "react-hooks": pluginReactHooks,
            "react-refresh": pluginReactRefresh,
            prettier: pluginPrettier
        }
    },
    {
        ignores: ["node_modules", "dist"]
    },
    pluginJS.configs.recommended,
    ...pluginTS.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: globals.browser,
            parser: pluginTS.parser,
            parserOptions: {
                project: ["tsconfig.json"]
            }
        }

    },
    {
        files: ["**/*.{ts, tsx, mjs}"]
    },
    {
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    {
        rules: {
            ...configPrettier.rules,
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "sort-imports": [
                "warn",
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: false,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: [
                        "none",
                        "all",
                        "multiple",
                        "single"
                    ],
                    allowSeparatedGroups: false
                }
            ]
        }
    }
)
