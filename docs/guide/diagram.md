<script lang="ts" setup>
import mermaid from 'mermaid'
import { RInput, RPicture, RSpace, useColors } from 'roughness'
import { ref, watchEffect } from 'vue'

const colors = useColors()

mermaid.initialize({
  startOnLoad: false,
  themeVariables: {
    fontFamily: 'var(--r-common-font-family)',
    primaryColor: colors.value.primaryColor,
    textColor: colors.value.textColor,
  },
})

let container = ref<HTMLElement>()

const graph = ref(`
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
`.trim())

watchEffect(async () => {
  const element = container.value
  if (element) {
    try {
      const { svg } = await mermaid.render('graph-1', graph.value)
      element.innerHTML = svg
    } catch {
      element.innerHTML = ''
    }
  }
})
</script>

<style lang="scss">
#graph-1 .label {
  text-shadow: var(--r-common-stroke-text-shadow);
}
</style>

# Diagram

Roughness does not provide any diagram component, but you can integrate [Mermaid](https://mermaid.js.org/) with it easily.

```shell
npm i mermaid
```

## Usage

```js
import mermaid from 'mermaid'
import { useColors } from 'roughness'

const colors = useColors()

mermaid.initialize({
  startOnLoad: false,
  themeVariables: {
    fontFamily: 'var(--r-common-font-family)',
    primaryColor: colors.value.primaryColor,
    textColor: colors.value.textColor,
  },
})
```

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import mermaid from 'mermaid'
import { RInput, RPicture, RSpace } from 'roughness'
import { ref, watchEffect } from 'vue'

let container = ref<HTMLElement>()

const graph = ref(`
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
`.trim())

watchEffect(async () => {
  const element = container.value
  if (element) {
    try {
      const { svg } = await mermaid.render('graph-1', graph.value)
      element.innerHTML = svg
    } catch {
      element.innerHTML = ''
    }
  }
})
</script>

<template>
  <RSpace vertical>
    <RInput v-model="graph" :lines="5" />
    <RPicture>
      <span ref="container"></span>
    </RPicture>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RInput v-model="graph" :lines="5" />
  <RPicture>
    <span ref="container"></span>
  </RPicture>
</RSpace>
