# Installation

## NPM

```shell
npm i roughness
```

## Using from CDN

You can use roughness directly from a CDN via HTML tags:

```html
<link rel="stylesheet" href="https://unpkg.com/roughness/dist/style.css">

<script type="importmap">
{
  "imports": {
    "roughness": "https://unpkg.com/roughness",
    "vue": "https://unpkg.com/vue/dist/vue.esm-browser.prod.js"
  }
}
</script>
<script type="module">
import * as roughness from 'roughness'
</script>
```
