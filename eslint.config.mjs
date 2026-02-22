import nx from '@nx/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:public-web-client',
              onlyDependOnLibsWithTags: [
                'scope:public-web-client',
                'scope:shared-web-client-base',
                // Add your custom groups you want to include in this scope like this:
                // 'scope:shared-web-client-<your-own-group>',
              ],
            },

            {
              sourceTag: 'scope:shared-web-client-base',
              onlyDependOnLibsWithTags: ['scope:shared-web-client-base'],
            },
            {
              sourceTag: 'scope:shared-service-global',
              onlyDependOnLibsWithTags: ['scope:shared-service-global'],
            },

            {
              sourceTag: 'type:web-client-app',
              onlyDependOnLibsWithTags: ['type:web-client-lib-*'],
            },
            {
              sourceTag: 'type:service-app',
              onlyDependOnLibsWithTags: ['type:service-lib-*'],
            },

            {
              sourceTag: 'type:web-client-lib-utils',
              onlyDependOnLibsWithTags: ['type:web-client-lib-utils'],
            },
            {
              sourceTag: 'type:web-client-lib-data-access',
              onlyDependOnLibsWithTags: [
                'type:web-client-lib-utils',
                'type:web-client-lib-data-access',
              ],
            },
            {
              sourceTag: 'type:web-client-lib-ui-design',
              onlyDependOnLibsWithTags: ['type:web-client-lib-ui-design'],
              /**
               * No other dependencies because design lib must keep only design tokens
               * and CSS (optionally).
               */
            },
            {
              sourceTag: 'type:web-client-lib-ui-components',
              onlyDependOnLibsWithTags: [
                'type:web-client-lib-utils',
                'type:web-client-lib-ui-design',
                'type:web-client-lib-ui-components',
                /**
                 * No `...-lib-ui-data-access` because components must not care
                 * about it. Use composition through the `...-lib-feature` instead.
                 */
              ],
            },
            {
              sourceTag: 'type:web-client-lib-feature',
              onlyDependOnLibsWithTags: [
                'type:web-client-lib-utils',
                'type:web-client-lib-data-access',
                'type:web-client-lib-ui-design',
                'type:web-client-lib-ui-components',
                /**
                 * No `...-lib-ui-feature` because features must not include each
                 * other. Use composition through the app instead.
                 */
              ],
            },

            /**
             * `type:service-lib-...` are organized based on the Clean Architecture
             * pattern.
             */
            {
              sourceTag: 'type:service-lib-domain',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'type:service-lib-use-cases',
              onlyDependOnLibsWithTags: ['type:service-lib-domain'],
            },
            {
              sourceTag: 'type:service-lib-persistence',
              onlyDependOnLibsWithTags: ['type:service-lib-domain'],
            },
            {
              sourceTag: 'type:service-lib-presentation',
              onlyDependOnLibsWithTags: [
                'type:service-lib-domain',
                'type:service-lib-use-cases',
                'type:service-lib-persistence',
              ],
            },
            {
              sourceTag: 'type:service-lib-infra',
              onlyDependOnLibsWithTags: ['type:service-lib-infra'],
            },
          ],
        },
      ],

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',

      'unused-imports/no-unused-imports': 'error',

      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      camelcase: ['error', { properties: 'never' }],
      '@typescript-eslint/class-literal-property-style': 'error',
      'class-methods-use-this': 'off',
      '@typescript-eslint/class-methods-use-this': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      'consistent-return': 'off',
      '@typescript-eslint/consistent-return': 'error',
      'consistent-this': ['error', 'self'],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      curly: ['error', 'all'],
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
      eqeqeq: 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      'func-names': ['error', 'as-needed'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'max-params': 'off',
      '@typescript-eslint/max-params': ['error', { max: 3 }],
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['signature', 'field', 'constructor', 'method'] },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/naming-convention': 'error',
      'no-alert': 'error',
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      'no-duplicate-imports': 'off', // this conflicts with `@typescript-eslint/consistent-type-imports`
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      'no-eval': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      'no-implied-eval': 'off',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreClassFieldInitialValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
          ignore: [-1, 0, 1],
        },
      ],
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-misused-spread': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-namespace': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-object-constructor': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-promise-executor-return': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      'no-restricted-imports': 'off',
      'no-return-assign': 'error',
      'no-return-await': 'off',
      'no-self-compare': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-template-curly-in-string': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      'no-throw-literal': 'off',
      'no-unassigned-vars': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unnecessary-type-conversion': 'error',
      'no-unneeded-ternary': 'error',
      'no-unreachable-loop': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      'no-unused-private-class-members': 'off',
      '@typescript-eslint/no-unused-private-class-members': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-useless-default-assignment': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      'no-var': 'error',
      'no-warning-comments': ['error', { terms: ['fixme'], location: 'anywhere' }],
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      'object-shorthand': ['error', 'always'],
      '@typescript-eslint/only-throw-error': 'error',
      'prefer-arrow-callback': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-destructuring': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      'prefer-promise-reject-errors': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        { treatMethodsAsReadonly: true },
      ],
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      'prefer-rest-params': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      'prefer-spread': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      'prefer-template': 'error',
      'preserve-caught-error': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/related-getter-setter-pairs': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      'require-atomic-updates': 'error',
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { considerDefaultExhaustiveForUnions: true },
      ],
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/unbound-method': 'error',
      '@typescript-eslint/unified-signatures': 'error',
    },
  },
  eslintConfigPrettier,
];
