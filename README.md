# wp-gutenberg-hidden-blocks

> Adds a block setting for specifying screen specific visibillity

![Screen Recording 2021-04-09 at 13 40 37](https://user-images.githubusercontent.com/302736/114213661-aa0b8780-9939-11eb-9cd5-fdc0af68e114.gif)

## Usage

```js
import { addFilter } from '@wordpress/hooks'
import { mobile, tablet, desktop } from '@wordpress/icons';

addFilter('wp-gutenberg-hidden-blocks.screenSizes', 'theme/screen-sizes', () => {
  return [
    { name: 'mobile', label: 'Mobile', icon: mobile },
    { name: 'tablet', label: 'Tablet', icon: tablet },
    { name: 'desktop', label: 'Desktop', icon: desktop },
  ];
});
```

## Development

Install dependencies

    composer install
    npm install

Run the tests

    npm run test

Build assets

    # Minified assets which are to be committed to git
    npm run build:production

    # Watch for changes and re-compile while developing the plugin
    npm run start
