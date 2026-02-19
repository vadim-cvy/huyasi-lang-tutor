# Base CSS styles and utilities + TS design tokens for web client apps/libs

This package provides a set of global CSS variables, utility classes, and TS enums and types for consistent design tokens across web client apps and libs.

## Lib Structure and Code Organization

### Base Concepts

- Any CSS values that can change at runtime (e.g., colors) are implemented as CSS variables.
- Each token group (e.g., `bg`, `border`, `breakpoints`) is implemented as a separate module inside the `./src/lib/` folder.
- Groups inside this library may depend on each other's non-private files. For example, `./src/lib/overlay/` files may use functions from the `./src/lib/bg/` group to get CSS variable names or values. But they **MUST NOT** use private files from other groups (e.g., `*-vars-private.scss`).
- There are entry-point files in the root `./src/` folder intended for imports from apps and other libs. These files gather and re-export public functions, global CSS, mixins, etc.

### Root Files

- `./src/global.scss`
  - Works as an entry point and contains all `./src/lib/<group>/*-global.scss` files.
  - This file must be imported in **app global styles** to apply global CSS variables and utility classes. **NEVER import it from libraries**.
- `./src/functions.scss`
  - Works as an entry point for all SCSS functions defined in `./src/lib/<group>/*-functions-public.scss` files.
  - You may import this file from both apps and libs.
  - **NOTE:** prefer utility classes over functions for styling whenever possible!
- `./src/mixins.scss`
  - Works as an entry point for all SCSS mixins defined in `./src/lib/<group>/*-mixins-public.scss` files.
  - You may import this file from both apps and libs.
  - **NOTE:** prefer utility classes over mixins for styling whenever possible!
- `./src/index.ts`
  - Works as an entry point for all TS types and enums defined in `./src/lib/<group>/abstract/*.ts` and `./src/lib/<group>/enums/*.ts` files.
  - You may import this file from both apps and libs.

### Per-Group Files

- `./src/lib/<group>/*-global.scss`
  - CSS variable definitions as well as utility classes are defined here.
- `./src/lib/<group>/*-vars-private.scss`
  - Contains all the settings and mappings.
  - If you want to expose variables to other groups inside this library or to external apps/libs, expose them via `*-functions-public.scss`. Example:

    ```scss
    // ./src/lib/my-group/my-group-vars-private.scss
    $default-theme-colors: (
      base: #fff,
      accent: #000,
    );
    ```

    ```scss
    // ./src/lib/my-group/my-group-global.scss
    @use './my-group-vars-private';
    @use './my-group-functions-public';

    @each $color-key, $color-val in my-group-vars-private.$default-theme-colors {
      $css-var-name: my-group-functions-public.my-group-get-color-css-var-name($color-key);

      :root {
        #{$css-var-name}: #{$color-val};
      }

      .--my-group-#{$color-key} {
        background-color: my-group-functions-public.my-group-get-color-val($color-key);
      }
    }
    ```

    ```scss
    // ./src/lib/my-group/my-group-functions-public.scss
    @use './my-group-vars-private';

    @function my-group-get-color-css-var-name($color-key) {
      @return '--my-group-color-#{$color-key}';
    }

    @function my-group-get-color-val($color-key) {
      @return var(my-group-get-color-css-var-name($color-key));
    }
    ```

- `./src/lib/<group>/*-functions-public.scss`
  - Contains SCSS functions. Functions may implement some logic or just expose some values from `*-vars-private.scss`.
- `./src/lib/<group>/*-functions-private.scss`
  - Contains SCSS functions that are supposed to be used ONLY inside the current group.
- `./src/lib/<group>/*-mixins-public.scss`
  - Contains SCSS mixins.
- `./src/lib/<group>/*-mixins-private.scss`
  - Contains SCSS mixins that are supposed to be used ONLY inside the current group.
- `./src/lib/<group>/abstract/*.ts` or `./src/lib/<group>/enums/*.ts`
  - Contains TS types or enums related to the group.
- `./src/lib/<group>/index.ts`
  - Works as an entry point for the group. It gathers and re-exports types and enums.

## Global CSS

You **must** include `src/global.scss` in your **app** for utility classes, mixins, and functions from this package to work in that app and its libs.

## Utility CSS Classes

- `.--bg-<colorKey>`
  - `<colorKey>`: `base`, `accent`
  - Applies background color.
- `.--has-overlay-<pseudoElement>`
  - `<pseudoElement>`: `before`, `after`
  - Enables an interactive overlay pseudo-element inside a matching background context.
  - Overlay is created as the specified pseudo-element (`::before` or `::after`).
  - Overlay appears on hover/focus/active states of the element.
  - Overlay color is determined by the element/parent background color utility class (`.--bg-<bgColorKey>`).
  - **NOTE:** Works only if the element (or its parent) has the `.--bg-<bgColorKey>` class.
- `.--is-overlay-active`
  - Forces overlay active state (useful if you want to activate overlay with TS).
  - **NOTE:** Works only if the element has the `.--has-overlay-<pseudoElement>` class.
- `.--text-size-<textSizeKey>-<stabilityKey>`
  - `<textSizeKey>`: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
  - `<stabilityKey>`: `static`, `responsive`
  - Sets font size by key and stability mode.
  - Static mode sizes are fixed and do not change across breakpoints, while responsive mode sizes are designed to scale across different screen sizes automatically.
  - **Note:** this utility class sets not only font size, but also vertical margins to ensure standardized text spacing.
- `.--text-color-<textColorKey>`
  - `<textColorKey>`: `base`, `accent`
  - Sets text color inside `.--bg-<bgColorKey>` scope.
  - Text color is determined by the element/parent background color utility class (`.--bg-<bgColorKey>`).
  - Note that **base text color** is not equal to **base background color**. Instead, each background type has its own text color set designed for readability. So the same text color key may have different values on different backgrounds. Example:
    - `.--bg-base` + `.--text-color-base`: base bg is **white**. Base color for base bg is **black**.
    - `.--bg-accent` + `.--text-color-base`: accent bg is **gray**. Base color for accent bg is **blue**.
- Whitespace:
  - Props:
    - `.--p<side>-<sizeKey>-<stabilityKey>` - padding.
    - `.--m<side>-<sizeKey>-<stabilityKey>` - margin.
    - `.--g-<sizeKey>-<stabilityKey>` - gap.
  - Placeholders:
    - `<side>`
      - `a` - all
      - `x` - horizontal
      - `y` - vertical
      - `t` - top
      - `r` - right
      - `b` - bottom
      - `l` - left
    - `<sizeKey>`: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
    - `<stabilityKey>`: `static`, `responsive`

## Mixins

**Note:** prefer utility classes over mixins for styling whenever possible!

- `breakpoint-<size>-up`
  - `<size>`: `sm`, `md`, `lg`
  - Applies styles inside media query with min-width equal to the breakpoint value.
- `whitespace-<prop>-<side>`
  - `<prop>`: `padding`, `margin`
  - `<side>`: `x`, `y`

## Functions

**Note:** prefer utility classes over functions for styling whenever possible!

**Notes on functions usage**:

- In most cases you'll need `*-get-*-val()` functions, so take a look at them first.
- `*-get-*-css-var-name()` functions are useful only if you need to override a CSS variable value (e.g., for dark mode).
- You'll probably never need other functions.

### bg

- `bg-get-color-val($color-key)`
- `bg-get-color-css-var-name($color-key)`
- `bg-validate-color-key-exists($color-key)`

### border

- `border-get-color-val()`
- `border-get-radius-val()`
- `border-get-border-val()`
- `border-get-color-css-var-name()`

### overlay

- `overlay-get-color-for-bg-val($bg-color-key)`
- `overlay-get-color-for-bg-css-var-name($bg-color-key)`
- `overlay-validate-exists-for-bg-color-key($bg-color-key)`

### shadow

- `shadow-get-box-shadow-color-val($box-shadow-key)`
- `shadow-get-box-shadow-val($box-shadow-key, $offset-x: 0, $offset-y: 0)`
- `shadow-get-box-shadow-color-css-var-name($box-shadow-key)`
- `shadow-validate-box-shadow-key-exists($box-shadow-key)`

### transition

- `transition-get-transition-duration-val($transition-duration-key)`
- `transition-validate-transition-duration-key-exists($transition-duration-key)`

### typography

- `typography-get-text-size-val($text-size-key, $stability-key)`
- `typography-get-text-size-margin-y-val($text-size-key)`
- `typography-get-text-color-val($text-color-key, $bg-color-key)`
- `typography-get-text-size-responsive-css-var-name($text-size-key)`
- `typography-get-text-color-css-var-name($text-color-key, $bg-color-key)`
- `typography-get-text-size-util-class-name($text-size-key, $stability-key)`
- `typography-get-text-color-util-class-name($text-color-key)`
- `typography-validate-text-size-key-exists($text-size-key)`
- `typography-validate-color-exists($bg-color-key, $text-color-key)`

### whitespace

- `whitespace-get-size-val($size-key, $stability-key)`
