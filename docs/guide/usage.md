<script lang="ts" setup>
import { RAlert } from 'roughness'
</script>

# Usage

Roughness supports Vue 3.

<RAlert type="info">

INFO<br>The examples here assume you are using a bundler such as [Vite](https://vitejs.dev/) or [Rspack](https://www.rspack.dev/), etc.

</RAlert>

## Import On Demand

Roughness supports tree-shaking. Components that are never imported will be ignored by the bundler.

```vue
<script lang="ts" setup>
import { RButton } from 'roughness'
</script>

<template>
  <RButton>Hello!</RButton>
</template>
```

Stylesheets do not currently support importing on demand. You may need to import it where appropriate.

```js
import 'roughness/dist/style.css'
```

## Install Globally

You can also install all components in the app, but doing so may result in unwanted components in the build.

```js
import 'roughness/dist/style.css'
import roughness from 'roughness'

createApp(App).use(roughness)
```
