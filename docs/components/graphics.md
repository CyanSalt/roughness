<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import { parse } from 'opentype.js'
import { RButton, RGraphics, RGraphicsConfig, RInput, RRate, RSpace, RTable, RTableColumn, useGraphicsConfig } from 'roughness'
import type { RoughSVG } from 'roughjs/bin/svg'
import { defineComponent, h, ref } from 'vue'

const GraphicsConfigExample = defineComponent({
  setup() {
    useGraphicsConfig({
      include: ['button', 'rate.shape'],
      options: {
        fillStyle: 'cross-hatch',
      },
    })
    return () => h(RSpace, { vertical: true, align: 'start' }, () => [
      h(RButton, { filled: true }, () => 'Psychological Shadow'),
      h(RGraphicsConfig, {
        include: ['button'],
        options: { strokeWidth: 2, hachureGap: 8 },
      }, () => h(RButton, { color: 'warning', filled: true }, () => 'Waffles')),
      h(RRate, { modelValue: 1 }),
    ])
  }
})

function drawHeart(rc: RoughSVG, svg: SVGSVGElement) {
  const path = rc.path('M10 30a20 20 0 0 1 40 0 20 20 0 0 1 40 0q0 30-40 60-40-30-40-60z', {
    stroke: 'red',
    fill: 'red',
  })
  svg.appendChild(path)
}

function drawOcean(rc: RoughSVG, svg: SVGSVGElement) {
  const rectangle = rc.rectangle(0, 0, svg.width.baseVal.value, svg.height.baseVal.value, {
    fill: 'var(--r-common-primary-color)',
  })
  svg.appendChild(rectangle)
}

const font = computedAsync(() => {
  return fetch('https://cdn.jsdelivr.net/npm/@openfonts/noto-sans-sc_chinese-simplified/files/noto-sans-sc-chinese-simplified-400.woff')
    .then(response => response.arrayBuffer())
    .then(buffer => parse(buffer))
}, null)

const text = ref('群贤毕至')

function drawGlyphs(rc: RoughSVG, svg: SVGSVGElement) {
  if (!font.value) return
  const pathData = font.value.getPath(text.value, 0, 50, 50).toPathData()
  const path = rc.path(pathData, {
    fill: 'var(--r-common-color)',
  })
  svg.appendChild(path)
}
</script>

# Graphics

Seeing is believing.

::: warning

In general, `RGraphics` components are only used inside the component library.

:::

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import type { RoughSVG } from 'roughjs/bin/svg'
import { RGraphics } from 'roughness'

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const path = rc.path('M10 30a20 20 0 0 1 40 0 20 20 0 0 1 40 0q0 30-40 60-40-30-40-60z', {
    stroke: 'red',
    fill: 'red',
  })
  svg.appendChild(path)
}
</script>

<template>
  <RGraphics :responsive="false" width="100" height="100" @draw="draw" />
</template>
```

:::

<RGraphics :responsive="false" width="100" height="100" @draw="drawHeart" />

### Text Glyphs

::: info

You need to install [`opentype.js`](https://www.npmjs.com/package/opentype.js) yourself.

:::

::: details Show Code

```vue
<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import { parse } from 'opentype.js'
import type { RoughSVG } from 'roughjs/bin/svg'
import { RGraphics, RInput } from 'roughness'
import { ref } from 'vue'

const font = computedAsync(() => {
  return fetch('https://cdn.jsdelivr.net/npm/@openfonts/noto-sans-sc_chinese-simplified/files/noto-sans-sc-chinese-simplified-400.woff')
    .then(response => response.arrayBuffer())
    .then(buffer => parse(buffer))
}, null)

const text = ref('群贤毕至')

function drawGlyphs(rc: RoughSVG, svg: SVGSVGElement) {
  if (!font.value) return
  const pathData = font.value.getPath(text.value, 0, 50, 50).toPathData()
  const path = rc.path(pathData, {
    fill: 'var(--r-common-color)',
  })
  svg.appendChild(path)
}
</script>

<template>
  <RSpace vertical align="start">
    <RInput v-model="text" maxlength="5" />
    <RGraphics :responsive="false" width="250" height="70" @draw="drawGlyphs" />
  </RSpace>
</template>
```

:::

<RSpace vertical align="start">
  <RInput v-model="text" maxlength="5" />
  <RGraphics :responsive="false" width="250" height="70" @draw="drawGlyphs" />
</RSpace>

### Responsive

::: details Show Code

```vue
<script lang="ts" setup>
import type { RoughSVG } from 'roughjs/bin/svg'
import { RGraphics, RTable } from 'roughness'

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const rectangle = rc.rectangle(0, 0, svg.width.baseVal.value, svg.height.baseVal.value, {
    fill: 'var(--r-common-primary-color)',
  })
  svg.appendChild(rectangle)
}
</script>

<template>
  <RTable :rows="['color']">
    <RTableColumn name="continent">
      <template v-if="row === 'color'">
        New Zealand
      </template>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="ocean">
      <template v-if="row === 'color'">
        <RGraphics @draw="draw" />
      </template>
    </RTableColumn>
  </RTable>
</template>
```

:::

<RTable :rows="['color']">
  <RTableColumn v-slot="{ row }" name="continent">
    <template v-if="row === 'color'">
      New Zealand
    </template>
  </RTableColumn>
  <RTableColumn v-slot="{ row }" name="ocean">
    <template v-if="row === 'color'">
      <RGraphics @draw="drawOcean" />
    </template>
  </RTableColumn>
</RTable>

### Configuration

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RGraphicsConfig, useGraphicsConfig } from 'roughness'

useGraphicsConfig({
  include: ['button', 'rate.shape'],
  options: {
    fillStyle: 'cross-hatch',
  },
})
</script>

<template>
  <RSpace vertical align="start">
    <RButton filled>Psychological Shadow</RButton>
    <RGraphicsConfig :include="['button']" options="{ strokeWidth: 2, hachureGap: 8 }" />
      <RButton color="warning" filled>Waffles</RButton>
    </RGraphicsConfig>
    <RRate :model-value="1" />
  </RSpace>
</template>
```

:::

<GraphicsConfigExample />

You can find the selector IDs which you can use in the documentation of each component.

## Usage

<RUsage file="src/graphics/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>

<RUsage file="src/graphics/graphics-config.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
