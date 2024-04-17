<script lang="ts" setup>
import 'chartjs-plugin-roughness'
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'
import { useColors } from 'roughness'
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'

Chart.register(BarElement, CategoryScale, LinearScale)

Chart.defaults.font.family = '\'CabinSketch\', cursive'

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

# Chart

Roughness does not provide any chart component. We recommend you to use [`vue-chartjs`](https://vue-chartjs.org/), [`chart.js`](https://www.chartjs.org/) and [`chartjs-plugin-roughness`](https://www.npmjs.com/package/chartjs-plugin-roughness).

```shell
npm i vue-chartjs chart.js chartjs-plugin-roughness
```

## Usage

```js
import 'chartjs-plugin-roughness'
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'

// for bar charts
Chart.register(BarElement, CategoryScale, LinearScale)

Chart.defaults.font.family = '\'CabinSketch\', cursive'
```

## Example

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
