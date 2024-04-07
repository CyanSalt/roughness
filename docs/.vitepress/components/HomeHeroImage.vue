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
    viewBox="0 0 261.76 226.69"
    class="home-hero-image"
    @draw="draw"
  ></RGraphics>
</template>

<style lang="scss" scoped>
.home-hero-image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 192px;
  height: 192px;
  transform: translate(-50%, -50%);
  @media (min-width: 960px) {
    width: 320px;
    height: 320px;
  }
  @media (min-width: 640px) {
    width: 256px;
    height: 256px;
  }
}
</style>
