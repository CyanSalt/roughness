<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import { parse } from 'opentype.js'
import { RButton, RCard, RDetails, RGraphics, RGraphicsConfig, RInput, RRate, RSpace, RTable, RTableColumn, RText } from 'roughness'
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

<RCard type="warning">

In general, `RGraphics` components are only used inside the component library.

</RCard>

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

<RCard type="comment">

You need to install [`opentype.js`](https://www.npmjs.com/package/opentype.js) yourself.

</RCard>

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

</RDetails>

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

<RPropsTable>

  <RProp name="options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  </RProp>

</RPropsTable>

### Graphics Props

<RPropsTable>

  <RProp name="options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  </RProp>

  <RProp name="responsive">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to adjust the size to fit the parent element.

  </RProp>

  <RProp name="tag">

  <template #type>

  `'canvas' | 'svg'`

  </template>

  <template #default-value>

  `'svg'`

  </template>

  [HTML tag for rendering the graphics](https://github.com/rough-stuff/rough/wiki#roughcanvas--roughsvg).

  </RProp>

</RPropsTable>

### Graphics Events

<REventsTable>

  <REvent name="draw">

  <template #parameters>

  `(rc: import('roughjs/bin/canvas').RoughCanvas, element: HTMLCanvasElement)` or `(rc: import('roughjs/bin/svg').RoughSVG, element: SVGSVGElement)`

  </template>

  Ready to start drawing.

  </REvent>

</REventsTable>

### Graphics Styles

<RStylesTable>

  <template #name="{ value }">--r-graphics-{{ value }}</template>

  <RStyle name="stroke-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the graphics lines by default.

  </RStyle>

</RStylesTable>
