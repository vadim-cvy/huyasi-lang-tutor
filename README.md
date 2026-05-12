# Huyasi Lang Tutor

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

- [Enforce module boundaries](https://nx.dev/docs/features/enforce-module-boundaries)
- [Tag multiple dimensions](https://nx.dev/docs/guides/enforce-module-boundaries/tag-multiple-dimensions)

### 2.1. Apps Tagging

Add the following tags for your new app project:

- Scope tag:
  - `scope:<your-scope>`.
  - **WARNING:** You must setup custom dependency rules in `/eslint.config.mjs` for your tag!
- Type tag:
  - Use **ONE** of the following:
    - `type:web-client-app`
    - `type:service-app`

### 2.2. Libs Tagging

Add the following tags for your new lib project:

- Scope tag:
  - If you're creating a lib **for a specific app**:
    - `scope:<your-scope>`
    - Hint: you will find the scope tag in the `/apps/<path-to-the-app-you're-making-the-lib-for>/project.json`.
  - If you're creating a **shared** lib.
    - For a **web client lib**:
      - `scope:shared-web-client`
    - For a **service lib** use **ONE** of the following:
      - `scope:shared-service`
        - This is what you need in most cases.
      - `scope:shared-service-<your-own-group>`
        - This is applicable if your lib will be used by a very narrow range of apps.
        - **WARNING:** You must setup custom dependency rules in `/eslint.config.mjs` for your tag!
- Type tag:
  - For a **web client lib** use **ONE** of the following:
    - `type:web-client-lib-utils`
    - `type:web-client-lib-data-access`
    - `type:web-client-lib-ui-design`
    - `type:web-client-lib-ui-components`
    - `type:web-client-lib-feature`
  - For a **service lib** use **ONE** of the following:
    - `type:service-lib-domain`
    - `type:service-lib-use-cases`
    - `type:service-lib-persistence`
    - `type:service-lib-presentation`
    - `type:service-lib-infra`

## 3. Projects Naming

Project names are commonly set during their creation.

### 3.1. Apps Naming

Apps projects names must be the same as their `scope:...` tag.

**Example:**

- Scope tag: `scope:`**_`public-web-client`_**
- Project name: **_`public-web-client`_**

### 3.2. Libs Naming _(app-specific)_

App-specific lib projects names must be set based on their `scope:...` and `type:...` tags as well as the slice name _(feature sliced design)_.

**Example (web-client):**

- Scope tag: `scope:`**_`public-web-client`_**
- Type tag: `type:web-client-lib-`**_`ui-components`_**
- Slice: games
- Project name: **_`public-web-client`_**`-games-`**_`ui-components`_**

**Example (service):**

- Scope tag: `scope:`**_`example-service`_**
- Type tag: `type:service-lib-`**_`domain`_**
- Slice: products
- Project name: **_`example-service`_**`-products-`**_`domain`_**

### 3.3. Libs Naming _(shared)_

Shared lib projects names must be set based on their `scope:...` and `type:...` tags.

**Example:**

- Scope tag: `scope:`**_`shared-web-client-base`_**
- Type tag: `type:web-client-lib-`**_`ui-components`_**
- Project name: **_`shared-web-client-base`_**`-`**_`ui-components`_**

## 4. Project Dirs Organization

Keep apps/libs paths **COMPLETELY consistent** with their names.

**Apps Examples:**

- `public-web-client`: `/apps/public/web-client/`
- `public-web-bff-service`: `/apps/public/web-bff-service/`
- `core-payments-service`: `/apps/core/payments-service/`

**Libs Examples (app-specific):**

- `public-web-client-games-feature`: `/libs/public/web-client/games/feature/`
- `public-web-client-account-ui-components`: `/libs/public/web-client/account/ui-components/`

**Libs Examples (shared):**

- `shared-web-client-base-ui-components`: `/libs/shared/web-client/base/ui-components/`
- `shared-web-client-base-ui-design`: `/libs/shared/web-client/base/ui-design/`

## 4. Code Style

### 4.1. TypeScript

- Whenever you want to create a custom utility type, check if [type-fest](https://github.com/sindresorhus/type-fest) types can be used instead.
