<script lang="ts" setup>
import { RAlert, RButton, RDetails, RGraphics, RGraphicsConfig, RSpace, RTable, RText } from 'roughness'
import type { RoughSVG } from 'roughjs/bin/svg'

function drawHeart(rc: RoughSVG, svg: SVGSVGElement) {
  const path = rc.path('M10 30a20 20 0 0 1 40 0 20 20 0 0 1 40 0q0 30-40 60-40-30-40-60z', {
    stroke: 'red',
    fill: 'red',
  })
  svg.appendChild(path)
}

function drawOcean(rc: RoughSVG, svg: SVGSVGElement) {
  const rect = rc.rectangle(0, 0, svg.width.baseVal.value, svg.height.baseVal.value, {
    fill: 'var(--r-common-primary-color)',
  })
  svg.appendChild(rect)
}
</script>

# Graphics

<RAlert type="warning">

WARNING<br>In general, `RGraphics` components are only used inside the component library.

</RAlert>

Seeing is believing.

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

### Responsive

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import type { RoughSVG } from 'roughjs/bin/svg'
import { RGraphics, RTable } from 'roughness'

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const rect = rc.rectangle(0, 0, svg.width.baseVal.value, svg.height.baseVal.value, {
    fill: 'var(--r-common-primary-color)',
  })
  svg.appendChild(rect)
}
</script>

<template>
  <RTable
    :columns="['continent', 'ocean']"
    :rows="['color']"
  >
    <template #body:color.ocean>
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
  <template #body:color.continent>
    New Zealand
  </template>
  <template #body:color.ocean>
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
  <RGraphicsConfig :options="{ fillStyle: 'cross-hatch' }">
    <RButton filled>Psychological Shadow</RButton>
  </RGraphicsConfig>
</template>
```

</RDetails>

<RGraphicsConfig :options="{ fillStyle: 'cross-hatch' }">
  <RButton filled>Psychological Shadow</RButton>
</RGraphicsConfig>

## Usage

### GraphicsConfig Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['options']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:options.type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:options.description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  </template>
</RTable>
</RSpace>

### Graphics Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['responsive', 'tag']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:responsive.type>

  `boolean`

  </template>
  <template #body:responsive.default>

  `true`

  </template>
  <template #body:responsive.description>
    Whether to adjust the size to fit the parent element.
  </template>

  <template #body:tag.type>

  `'canvas' | 'svg'`

  </template>
  <template #body:tag.default>

  `'svg'`

  </template>
  <template #body:tag.description>

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
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:draw.parameters>

  `(rc: import('roughjs/bin/canvas').RoughCanvas, element: HTMLCanvasElement)` or `(rc: import('roughjs/bin/svg').RoughSVG, element: SVGSVGElement)`

  </template>
  <template #body:draw.description>
    Ready to start drawing.
  </template>
</RTable>
</RSpace>
