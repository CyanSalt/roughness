<script lang="ts" setup>
import mermaid from 'mermaid'
import { RInput, RPicture, RSpace, useColors } from 'roughness'
import { ref, watchEffect } from 'vue'

const colors = useColors()

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'var(--r-common-font-family)',
    primaryColor: colors.value.primaryColor,
    primaryTextColor: colors.value.textColor,
    lineColor: colors.value.textColor,
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
  theme: 'base',
  themeVariables: {
    fontFamily: 'var(--r-common-font-family)',
    primaryColor: colors.value.primaryColor,
    primaryTextColor: colors.value.textColor,
    lineColor: colors.value.textColor,
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
    <RPicture :attrs="{ id: undefined, class: 'r-mermaid' }">
      <span ref="container"></span>
    </RPicture>
  </RSpace>
</template>

<style lang="scss">
.r-mermaid text,
.r-mermaid .label,
.r-mermaid .label text,
.r-mermaid span {
  fill: var(--r-common-color);
  color: var(--r-common-color);
  text-shadow: var(--r-common-stroke-text-shadow);
}
.r-mermaid p {
  margin: 0;
}
</style>
```

:::

<RSpace vertical>
  <RInput v-model="graph" :lines="5" />
  <RPicture :attrs="{ id: undefined, class: 'r-mermaid' }">
    <span ref="container"></span>
  </RPicture>
</RSpace>

<style lang="scss">
.r-mermaid text,
.r-mermaid .label,
.r-mermaid .label text,
.r-mermaid span {
  fill: var(--r-common-color);
  color: var(--r-common-color);
  text-shadow: var(--r-common-stroke-text-shadow);
}
.r-mermaid p {
  margin: 0;
}
</style>
