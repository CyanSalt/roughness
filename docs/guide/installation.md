# Installation

## NPM

```shell
npm i roughness
```

## Using from CDN

You can use roughness directly from a CDN via HTML tags:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/roughness/dist/style.css">

<script type="importmap">
{
  "imports": {
    "roughness": "https://cdn.jsdelivr.net/npm/roughness/dist/index.js",
    "vue": "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js"
  }
}
</script>
<script type="module">
import * as roughness from 'roughness'
</script>
```
