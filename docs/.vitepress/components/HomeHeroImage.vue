<script lang="ts" setup>
import type { RoughSVG } from 'roughjs/bin/svg'
import { RGraphics } from '../../../src'

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const outsidePath = rc.path('m161.096.001-30.224 52.35L100.647.002H-.005L130.872 226.69 261.749 0z', {
    stroke: 'var(--r-common-primary-color)',
    fill: 'var(--r-common-primary-color)',
  })
  svg.appendChild(outsidePath)
  const insidePath = rc.path('m161.096.001-30.224 52.35L100.647.002H52.346l78.526 136.01L209.398.001z', {
    stroke: 'var(--r-common-primary-color)',
    fill: 'var(--r-common-primary-color)',
    fillStyle: 'cross-hatch',
  })
  svg.appendChild(insidePath)
}
</script>

<template>
  <RGraphics
    :responsive="false"
    width="261.76"
    height="226.69"
    class="home-hero-image"
    @draw="draw"
  ></RGraphics>
</template>
