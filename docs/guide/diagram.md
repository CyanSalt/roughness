<script lang="ts" setup>
import 'chartjs-plugin-roughness'
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'
import mermaid from 'mermaid'
import { RInput, RPicture, RSpace, useColors } from 'roughness'
import { computed, ref, watchEffect } from 'vue'
import { Bar } from 'vue-chartjs'

Chart.register(BarElement, CategoryScale, LinearScale)

Chart.defaults.font.family = '\'Xiaolai SC\', cursive'

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

const chartData = computed(() => ({
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      data: [40, 20, 12],
      borderColor: [
        colors.value.primaryColor,
        colors.value.textColor,
        colors.value.errorColor,
      ],
      backgroundColor: [
        colors.value.primaryColor,
        colors.value.textColor,
        colors.value.errorColor,
      ],
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: colors.value.textColor,
      },
    },
    y: {
      ticks: {
        color: colors.value.textColor,
      },
    },
  },
}))
</script>

# Diagram

Roughness does not provide any diagram component. We recommend you to use [Mermaid](https://mermaid.js.org/) for static diagrams, and to use [`vue-chartjs`](https://vue-chartjs.org/), [`chart.js`](https://www.chartjs.org/) and [`chartjs-plugin-roughness`](https://www.npmjs.com/package/chartjs-plugin-roughness) when driven by a numerical data set. You can integrate both of them with roughness easily.

## Mermaid

```shell
npm i mermaid
```

### Usage

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

### Example

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

## Chart.js

```shell
npm i vue-chartjs chart.js chartjs-plugin-roughness
```

### Usage

```js
import 'chartjs-plugin-roughness'
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'

// for bar charts
Chart.register(BarElement, CategoryScale, LinearScale)

Chart.defaults.font.family = '\'Xiaolai SC\', cursive'
```

### Example

::: details Show Code

```vue
<script lang="ts" setup>
import { useColors } from 'roughness'
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'

const colors = useColors()

const chartData = computed(() => ({
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      data: [40, 20, 12],
      borderColor: [
        colors.value.primaryColor,
        colors.value.textColor,
        colors.value.errorColor,
      ],
      backgroundColor: [
        colors.value.primaryColor,
        colors.value.textColor,
        colors.value.errorColor,
      ],
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: colors.value.textColor,
      },
    },
    y: {
      ticks: {
        color: colors.value.textColor,
      },
    },
  },
}))
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
```

:::

<Bar :data="chartData" :options="chartOptions" />
