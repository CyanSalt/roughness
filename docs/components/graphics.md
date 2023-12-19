<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import { parse } from 'opentype.js'
import { RAlert, RButton, RDetails, RGraphics, RGraphicsConfig, RInput, RRate, RSpace, RTable, RText } from 'roughness'
import type { RoughSVG } from 'roughjs/bin/svg'
import { ref } from 'vue'

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
  return fetch('https://unpkg.com/@openfonts/noto-sans-sc_chinese-simplified/files/noto-sans-sc-chinese-simplified-400.woff')
    .then(response => response.arrayBuffer())
    .then(buffer => parse(buffer))
}, null)

const text = ref('群贤毕至')

function drawGlyphs(rc: RoughSVG, svg: SVGSVGElement) {
  if (!font.value) return
  const pathData = font.value.getPath(text.value, 0, 50, 50).toPathData()
  const path = rc.path(pathData, {
    fill: 'var(--r-common-text-color)',
  })
  svg.appendChild(path)
}
</script>

# Graphics

Seeing is believing.

<RAlert type="warning">

WARNING<br>In general, `RGraphics` components are only used inside the component library.

</RAlert>

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<RGraphics :responsive="false" width="100" height="100" @draw="drawHeart" />

### Text Glyphs

<RAlert type="comment">

\* You need to install [`opentype.js`](https://www.npmjs.com/package/opentype.js) yourself.

</RAlert>

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import { parse } from 'opentype.js'
import type { RoughSVG } from 'roughjs/bin/svg'
import { RGraphics, RInput } from 'roughness'
import { ref } from 'vue'

const font = computedAsync(() => {
  return fetch('https://unpkg.com/@openfonts/noto-sans-sc_chinese-simplified/files/noto-sans-sc-chinese-simplified-400.woff')
    .then(response => response.arrayBuffer())
    .then(buffer => parse(buffer))
}, null)

const text = ref('群贤毕至')

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  if (!font.value) return
  const pathData = font.value.getPath(text.value, 0, 50, 50).toPathData()
  const path = rc.path(pathData)
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

</RDetails>

<RSpace vertical align="start">
  <RInput v-model="text" maxlength="5" />
  <RGraphics :responsive="false" width="250" height="70" @draw="drawGlyphs" />
</RSpace>

### Responsive

<RDetails>
  <template #summary>Show Code</template>

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
  <RTable
    :columns="['continent', 'ocean']"
    :rows="['color']"
  >
    <template #body:color:ocean>
      <RGraphics @draw="draw" />
    </template>
  </RTable>
</template>
```

</RDetails>

<RTable
  :columns="['continent', 'ocean']"
  :rows="['color']"
>
  <template #body:color:continent>
    New Zealand
  </template>
  <template #body:color:ocean>
    <RGraphics @draw="drawOcean" />
  </template>
</RTable>

### Configuration

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RGraphicsConfig } from 'roughness'
</script>

<template>
  <RGraphicsConfig :options="{ fillStyle: 'solid' }">
    <RSpace vertical align="start">
      <RButton filled>Medieval Sky</RButton>
      <RRate :model-value="1" />
    </RSpace>
  </RGraphicsConfig>
</template>
```

</RDetails>

<RGraphicsConfig :options="{ fillStyle: 'solid' }">
  <RSpace vertical align="start">
    <RButton filled>Medieval Sky</RButton>
    <RRate :model-value="1" />
  </RSpace>
</RGraphicsConfig>

Additionally, almost all components with graphics support the `graphics-options` prop:{#component-prop}

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton } from 'roughness'
</script>

<template>
  <RButton filled :graphics-options="{ fillStyle: 'cross-hatch' }">Psychological Shadow</RButton>
</template>
```

</RDetails>

<RButton filled :graphics-options="{ fillStyle: 'cross-hatch' }">Psychological Shadow</RButton>

## Usage

### GraphicsConfig Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['options']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  </template>
</RTable>
</RSpace>

### Graphics Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['options', 'responsive', 'tag']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  </template>

  <template #body:responsive:type>

  `boolean`

  </template>
  <template #body:responsive:default>

  `true`

  </template>
  <template #body:responsive:description>
    Whether to adjust the size to fit the parent element.
  </template>

  <template #body:tag:type>

  `'canvas' | 'svg'`

  </template>
  <template #body:tag:default>

  `'svg'`

  </template>
  <template #body:tag:description>

  [HTML tag for rendering the graphics](https://github.com/rough-stuff/rough/wiki#roughcanvas--roughsvg).

  </template>
</RTable>
</RSpace>

### Graphics Events

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['draw']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:draw:parameters>

  `(rc: import('roughjs/bin/canvas').RoughCanvas, element: HTMLCanvasElement)` or `(rc: import('roughjs/bin/svg').RoughSVG, element: SVGSVGElement)`

  </template>
  <template #body:draw:description>
    Ready to start drawing.
  </template>
</RTable>
</RSpace>
