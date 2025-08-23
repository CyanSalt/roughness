<script lang="ts" setup>
import { RButton, RCard } from 'roughness'
import { onMounted, nextTick } from 'vue';
import rough from 'roughjs/bundled/rough.esm.js';

// neither wired nor rough.js provide a table with a sketchy hachure background so we'll do
// this one ourselves
onMounted(async () => {
    const drawCanvas = () => {
    const canvas = document.getElementById('header-bg');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const rc = rough.canvas(canvas);

    // Set canvas size to match the table
    const table = document.querySelector('table');
    canvas.width = table.offsetWidth;
    canvas.height = table.querySelector('thead').offsetHeight;

    // Draw hachure rectangle
    rc.rectangle(0, 0, canvas.width, canvas.height, {
    fill: '#afc1d3',
    fillStyle: 'hachure',
    hachureAngle: 320,
    fillWeight: 4,
    hachureGap: 5.5,
    stroke: 'none',
    strokeWidth: 4,
    });
    };

    await nextTick();
    drawCanvas();
});
</script>

# Table

Neither wired.js nor rough.js provide a table with a sketchy hachure background so we'll do this one ourselves.

It would be nice if one could set the table head, table body, table row, and table cell's fill, fill style,
hachure angle, fill weight, hachure gap, stroke, and stroke width through css like we can for other rough components.

## Example


::: details Show Code
```vue
<script lang="ts" setup>
import { RButton, RCard } from 'roughness'
import { onMounted, nextTick } from 'vue';
import rough from 'roughjs/bundled/rough.esm.js';

// Neither wired nor rough.js provide a table with a sketchy hachure
// background so we'll do this one ourselves.
onMounted(async () => {
    const drawCanvas = () => {
    const canvas = document.getElementById('header-bg');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const rc = rough.canvas(canvas);

    // Set canvas size to match the table
    const table = document.querySelector('table');
    canvas.width = table.offsetWidth;
    canvas.height = table.querySelector('thead').offsetHeight;

    // Draw hachure rectangle
    rc.rectangle(0, 0, canvas.width, canvas.height, {
    fill: '#afc1d3',
    fillStyle: 'hachure',
    hachureAngle: 320,
    fillWeight: 4,
    hachureGap: 5.5,
    stroke: 'none',
    strokeWidth: 4,
    });
    };

    await nextTick();
    drawCanvas();
});
</script>

<template>
    <h1>Applications</h1>
    <div class="table-container">
        <canvas id="header-bg" aria-hidden="true"></canvas>
        <table aria-label="Service Status List">
        <thead>
            <tr>
            <th width="60%">Service</th>
            <th width="20%">Status</th>
            <th width="20%" colspan="3">Log</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>
                <RCard class="app-card">
                <b class="app-name">Rough Service</b>
                <span class="smallerText"> v0.0.1</span>
                <RButton class="start-stop">Stop</RButton>
                </RCard>
            </td>
            <td class="status">Running</td>
            <td><RButton>[]</RButton></td>
            <td><RButton>[]</RButton></td>
            <td><RButton>[]</RButton></td>
            </tr>  
        </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-container {
  position: relative;
}
#header-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
table {
  border-collapse: collapse;
  position: relative;
  z-index: 1;
  width: 100%;
  border: 0;
}
table th {
  border: 0;
  padding: 8px;
  padding-left: 1em;
  background-color: transparent;
}
table thead tr {
  background-color: transparent;
  text-transform: uppercase;
  margin: 5px;
  border: 0;
}
table thead tr th {
  font-size: 1rem;
  font-family: cursive;
  color: var(--vp-c-bg);
  text-shadow: 1px 1px 1px var(--vp-c-bg);
}
article.app-card {
  width: 95%;
}
button.start-stop {
  float: right;
}
.app-name {
  color: darkorange;
  text-shadow: 1px 1px 1px grey;
}
.status {
  padding-left: 20px;
}
.running {
  color: green;
}
.stopped {
  color: darkorange;
}
.error {
  color: red;
}
.smallerText {
  font-size: 0.8em;
  margin-left: 5px;
}
</style>
```
:::

<br />

<h1>Applications</h1>
<div class="table-container">
    <canvas id="header-bg" aria-hidden="true"></canvas>
    <table aria-label="Service Status List">
    <thead>
        <tr>
        <th width="60%">Service</th>
        <th width="20%">Status</th>
        <th width="20%" colspan="3">Log</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>
            <RCard class="app-card">
            <b class="app-name">Rough Service</b><span class="smallerText"> v0.0.1</span>
            <RButton class="start-stop">Stop</RButton>
            </RCard>
        </td>
        <td class="status">Running</td>
        <td><RButton>[]</RButton></td>
        <td><RButton>[]</RButton></td>
        <td><RButton>[]</RButton></td>
        </tr>  
    </tbody>
    </table>
</div>

<style scoped>
.table-container {
  position: relative;
}
#header-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
table {
  border-collapse: collapse;
  position: relative;
  z-index: 1;
  width: 100%;
  border: 0;
}
table th {
  border: 0;
  padding: 8px;
  padding-left: 1em;
  background-color: transparent;
}
table thead tr {
  background-color: transparent;
  text-transform: uppercase;
  margin: 5px;
  border: 0;
}
table thead tr th {
  font-size: 1rem;
  font-family: cursive;
  color: var(--vp-c-bg);
  text-shadow: 1px 1px 1px var(--vp-c-bg);
}
article.app-card {
  width: 95%;
}
button.start-stop {
  float: right;
}
.app-name {
  color: darkorange;
  text-shadow: 1px 1px 1px grey;
}
.status {
  padding-left: 20px;
}
.running {
  color: green;
}
.stopped {
  color: darkorange;
}
.error {
  color: red;
}
.smallerText {
  font-size: 0.8em;
  margin-left: 5px;
}
</style>