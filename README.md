# Huyasi Lang Tutor

## TODO: Finish your remote caching setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/W4ZILrTb9y)

## 1. Tools

### 1.1. NX

We use NX for our monorepo management.

**Documentation**

[Read NX documentation](https://nx.dev/docs/getting-started/intro).

**Install Nx Console**

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 2. Projects Tagging

Read about NX tagging system here:
* [Enforce module boundaries](https://nx.dev/docs/features/enforce-module-boundaries)
* [Tag multiple dimensions](https://nx.dev/docs/guides/enforce-module-boundaries/tag-multiple-dimensions)

### 2.1. Apps Tagging

Add the following tags for your new app project:

* Scope tag:
    * `scope:<your-scope>`.
    * **WARNING:** You must setup custom dependency rules in `/eslint.config.mjs` for your tag!
* Type tag:
    * Use **ONE** of the following:
        * `type:web-client-app`
        * `type:service-app`

### 2.2. Libs Tagging

Add the following tags for your new lib project:

* Scope tag:
    * If you're creating a lib **for a specific app**:
        * `scope:<your-scope>`
        * Hint: you will find the scope tag in the `/apps/<path-to-the-app-you're-making-the-lib-for>/project.json`.
    * If you're creating a lib **to be used by several apps** *(shared)*. Use **ONE** of the following:
        * `scope:shared-web-client-global`
        * `scope:shared-web-client-<your-own-group>`
            * **WARNING:** You must setup custom dependency rules in `/eslint.config.mjs` for your tag!
        * `scope:shared-service-global`
        * `scope:shared-service-<your-own-group>`
            * **WARNING:** You must setup custom dependency rules in `/eslint.config.mjs` for your tag!
* Type tag:
    * For a **web client lib** use **ONE** of the following:
        * `type:web-client-lib-utils`
        * `type:web-client-lib-data-access`
        * `type:web-client-lib-ui-design`
        * `type:web-client-lib-ui-components`
        * `type:web-client-lib-feature`
    * For a **service lib** use **ONE** of the following:
        * `type:service-lib-domain`
        * `type:service-lib-use-cases`
        * `type:service-lib-persistence`
        * `type:service-lib-presentation`
        * `type:service-lib-infra`

## 3. Project Dirs Organization

### 3.1. App Dirs Organization

**Pattern:** `/apps/<scope-tag-based-path>/`.

**Examples:**

* `scope:public-web-client`

    Dir: `/apps/public/web-client/`
* `scope:public-web-bff-service`

    Dir: `/apps/public/web-bff-service/`
* `scope:public-api-composition-service`

    Dir: `/apps/public/api-composition-service/`
* `scope:core-example-1-service`

    Dir: `/apps/core/example-1-service/`
* `scope:core-example-2-service`

    Dir: `/apps/core/example-2-service/`

### 3.2. Lib Dirs Organization *(app-specific)*

**Pattern:** `/libs/<scope-tag-based-path>/<slice-based-path>/<type-tag-based-path>/`.

**Examples:**

* `scope:public-web-client` + **Theme** slice + `type:web-client-lib-data-access`

    Dir: `/libs/public/web-client/theme/data-access`

* `scope:public-web-client` + **Theme** slice + `type:web-client-lib-feature`

    Dir: `/libs/public/web-client/theme/feature`

* `scope:core-billing-service` + **Payment** slice + `type:service-lib-domain`

    Dir: `/libs/core/billing-service/payment/domain`

* `scope:core-billing-service` + **Payment** slice + `type:service-lib-use-cases`

    Dir: `/libs/core/billing-service/payment/use-cases`

### 3.3. Lib Dirs Organization *(shared, app-specific)*

**Warning:** Prefer composition (through your app) over creating shared app-specific libs!

**Pattern:** `/libs/<scope-tag-based-path>/shared/<custom-organization-based-path>/<type-tag-based-path>`.

**Examples:**

* `scope:public-web-client` + **hint** custom organization dir + `type:web-client-lib-ui-components`

    Dir: `/libs/public/web-client/shared/hint/ui-components`

### 3.4. Lib Dirs Organization *(shared, global)*

**Pattern:** `/libs/shared/<scope-tag-based-path>/<custom-organization-based-path>/<type-tag-based-path>`.

**Examples:**

* `scope:shared-web-client-global` + **base-components** custom organization dir + `type:web-client-lib-ui-components`

    Dir: `/libs/shared/web-client/global/base-components/ui-components`
