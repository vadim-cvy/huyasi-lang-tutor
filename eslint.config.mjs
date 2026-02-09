import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
