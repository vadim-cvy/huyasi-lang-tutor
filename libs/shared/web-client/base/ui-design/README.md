# Base CSS styles and utilities + TS design tokens and utilities for web client apps/libs

This package provides the following features for web client apps and libs styling:

- reset default CSS
- utility CSS classes
- utility SCSS mixins
- TS types for consistent design tokens
- TS utility functions for working with design tokens

## Lib Structure and Code Organization

### Base Concepts

- Any CSS values that can change at runtime _(colors, some responsive values)_ are implemented as CSS variables.
- Each token group _(`bg`, `border`, `breakpoints`, etc)_ is implemented as a separate module inside the `./src/lib/` folder.
- Groups inside this library may depend on each other's mixins or functions. For example, `./src/lib/overlay/` files may use functions from the `./src/lib/bg/`.

### Root Files _(entry points)_

- `./src/global.scss`
  - Re-exports all `./src/lib/<group>/global.scss` files _(if presented)_.
  - This file must be imported **just once** in **app global styles** to apply global CSS variables and utility classes.
- `./src/mixins.scss`
  - Re-exports all `./src/lib/<group>/mixins.scss` files _(if presented)_.
  - You may import this file from both apps and libs.
- `./src/index.ts`
  - Re-exports `./src/lib/<group>/index.ts` files _(if presented)_.
  - You may import this file from both apps and libs.

### Per-Group Files _(`./src/lib/<group>/*`)_

Each file is optional and is created only if needed.

- `./src/lib/<group>/global.scss`: CSS variable default definitions as well as utility classes are defined here.
- `./src/lib/<group>/functions.scss`: contains SCSS functions.
- `./src/lib/<group>/mixins.scss`: contains SCSS mixins.
- `./src/lib/<group>/vars.scss`
  - Contains all the settings and mappings.
  - Prefer not to to import this file from other groups. Prefer importing functions/mixins files instead. This reduces coupling between groups, promotes encapsulation and lets you keep some implementation details centralized _(validation, etc)_. Example:

    ```scss
    // ./src/lib/my-group/vars.scss
    $my-colors-map: (
      base: #fff,
      accent: #000,
    );
    ```

    ```scss
    // ./src/lib/my-group/functions.scss
    @use './vars';

    @function validate-color-exists($color-key) {
      @if not map-has-key(vars.$my-colors-map, $color-key) {
        @error "Color key `#{$color-key}` does not exist!";
      }
    }

    @function get-css-var-name--color($color-key) {
      $_: validate-color-exists($color-key);

      @return '--my-group-color-#{$color-key}';
    }
    ```

    ```scss
    // ./src/lib/my-another-awesome-group/global.scss
    @use '../my-group/functions' as my-group-functions;

    .some-selector {
      // We safely use the function implemented by `my-group` without worrying about validation, because it's all implemented and maintained inside `my-group`. We would need to re-implement validation logic here if we imported `vars.scss` instead.
      some-prop: var(my-group-functions.get-css-var-name--color(accent));
    }
    ```

- `./src/lib/<group>/assets/fonts/*`: contains group-related fonts.
- `./src/lib/<group>/assets/img/*`: contains group-related images.
- `./src/lib/<group>/abstract/*.ts`: contains TS types related to the group.
- `./src/lib/<group>/data/*.ts`: contains TS constants related to the group.
- `./src/lib/<group>/utils/*.ts`: contains TS utility functions related to the group.
- `./src/lib/<group>/index.ts`: works as an entry point for the group. It gathers and re-exports TS files that are supposed to be publicly accessible _(by apps and other libs)_.

## Global CSS

You **must** include `src/global.scss` in your **app** _(once only)_ for utility classes from this package to work in that app and its libs.

## Utility CSS Classes

- `.--bg-<colorKey>`: applies background color.
  - `<colorKey>`: `base`, `accent`
  - **CHILD ELEMENTS / SAME ELEMENT CLASSES:**
    - `.--has-overlay-<pseudoElement>`: enables an interactive overlay using pseudo-element.
      - `<pseudoElement>`: `before`, `after`
        - Controls which pseudo-element to use: `::before` or `::after`.
      - Overlay appears on `:hover`, `:focus` and `:active` states of the element.
      - Overlay color is resolved automatically based on the element/parent `.--bg-<bgColorKey>` class _(it will automatically become different for each background color)_.
      - **SAME ELEMENT CLASSES:**
        - `.--is-force-overlay-visible`: forces overlay active state
          - Is useful only if you want to activate an overlay manually _(with TS logic for example)_.
    - `.--text-color-<textColorKey>`: automatically sets text color contrasting with the element/parent element background color.
      - `<textColorKey>`: `base`, `accent`
      - Note: the same `.--text-color-<textColorKey>` class may _(and probably will)_ have different values depending on its element/parent element background color class _(`.--bg-<bgColorKey>`)_. For example, `.--text-color-base` will resolve into
        - `color: {x}` when appears inside an element with `.--bg-base` class.
        - `color: {y}` when appears inside an element with `.--bg-accent` class.
      - For more details [see this file with `.--text-color-<textColorKey>` implementation](./src/lib/typography/global.scss).
- `.--text-size-<sizeKey>-<stabilityKey>`: sets font size by key and stability mode.
  - `<sizeKey>`: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
  - `<stabilityKey>`: `static`, `responsive`
    - `static` sizes are fixed _(per `sizeKey`)_ and do not change across breakpoints, while `responsive` sizes _(per `sizeKey`)_ are designed to scale across different screen sizes automatically. For example:
      - `.--text-size-md-static` will have the same font size on all screen sizes.
      - `.--text-size-md-responsive` will have different font sizes on mobile, tablet and desktop.
  - Note: this class affects not only font size, but also vertical margins _(to ensure standardized text spacing)_.
- `.--padding-<side>-<sizeKey>-<stabilityKey>`: sets padding.
  - `<side>`: `top`, `right`, `bottom`, `left`, `x`, `y`, `all`
  - `<sizeKey>`: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
  - `<stabilityKey>`: `static`, `responsive`
    - works the same way as for `<stabilityKey>` in `.--text-size-<sizeKey>-<stabilityKey>` class.
- `.--margin-<side>-<sizeKey>-<stabilityKey>`: sets margin.
  - works the same way as `.--padding-<side>-<sizeKey>-<stabilityKey>` class.
- `.--gap-<sizeKey>-<stabilityKey>`: sets gap between elements in a flex or grid container.
  - works the same way as `.--padding-<side>-<sizeKey>-<stabilityKey>` class _(but without `<side>` part of the class name)_.
- `.--box-shadow-<boxShadowKey>`: applies box shadow.
  - `<boxShadowKey>`: `normal` _(yep, we have only one box shadow preset for now, but we'll add more in the future)_
- `.--border-<sideKey>`: sets border.
  - `<sideKey>`: `top`, `right`, `bottom`, `left`, `all`
- `.--border-radius`: sets border radius.

## SCSS Mixins _(exposed in `./src/mixins.scss`)_

This is a list of mixins names, see their implementation for more details.

Mixin names are always prefixed with the group name, for example `breakpoint-*` mixins are implemented in the `./src/lib/breakpoints/mixins.scss` file. This will help you to find appropriate files when you need to check implementation details.

### Responsive design:

- `breakpoint-lg-up() { @content }`
- `breakpoint-md-up() { @content }`
- `breakpoint-sm-up() { @content }`

### Color theming:

- `typography-define-css-vars--colors($vals)`
- `overlay-define-css-vars--colors($vals)`
- `bg-define-css-vars--colors($vals)`
- `border-define-css-var--color($val)`
- `shadow-define-css-vars--box-shadows($vals)`

### Misc utilities:

- `transition-all($duration-key)`
