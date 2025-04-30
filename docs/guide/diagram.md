<script lang="ts" setup>
import mermaid from 'mermaid'
import { RInput, RPicture, RSpace } from 'roughness'
import { ref, watchEffect } from 'vue'

mermaid.initialize({
  startOnLoad: false,
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

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import mermaid from 'mermaid'
import { RInput, RPicture, RSpace } from 'roughness'
import { ref, watchEffect } from 'vue'

mermaid.initialize({
  startOnLoad: false,
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
