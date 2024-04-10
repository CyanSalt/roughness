<script lang="ts" setup>
import { RCard, RCarousel, RCarouselItem, RDetails, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'
</script>

# Carousel

Merry Go Round.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCard, RCarousel, RCarouselItem } from 'roughness'
</script>

<template>
  <RCarousel :autoplay="3000">
    <RCarouselItem value="mage">
      <RCard type="info">
        <template #title>Arcane Intellect</template>
        Draw 2 cards.
      </RCard>
    </RCarouselItem>
    <RCarouselItem value="hunter">
      <RCard type="success">
        <template #title>Explosive Trap</template>
        <RText tag="strong">Secret</RText>: When your hero is attacked, deal 2 damage to all enemies.
      </RCard>
    </RCarouselItem>
    <RCarouselItem value="paladin">
      <RCard type="warning" size="small">
        <template #title>Tirion Fordring</template>
        <RText tag="strong">Divine Shield</RText>, <RText tag="strong">Taunt</RText>, <RText tag="strong">Deathrattle</RText>: Equip a 5/3 Ashbringer.
      </RCard>
    </RCarouselItem>
  </RCarousel>
</template>
```

</RDetails>

<RCarousel :autoplay="3000">
  <RCarouselItem value="mage">
    <RCard type="info">
      <template #title>Arcane Intellect</template>
      Draw 2 cards.
    </RCard>
  </RCarouselItem>
  <RCarouselItem value="hunter">
    <RCard type="success">
      <template #title>Explosive Trap</template>
      <RText tag="strong">Secret</RText>: When your hero is attacked, deal 2 damage to all enemies.
    </RCard>
  </RCarouselItem>
  <RCarouselItem value="paladin">
    <RCard type="warning" size="small">
      <template #title>Tirion Fordring</template>
      <RText tag="strong">Divine Shield</RText>, <RText tag="strong">Taunt</RText>, <RText tag="strong">Deathrattle</RText>: Equip a 5/3 Ashbringer.
    </RCard>
  </RCarouselItem>
</RCarousel>

## Usage

### Carousel Props

<RPropsTable>

  <RProp name="autoplay">

  <template #type>

  `number`

  </template>

  <template #default-value>

  `0`

  </template>

  Time interval in milliseconds to autoplay the carousel items.

  </RProp>

  <RProp name="model-value">

  <template #type>

  `RValueOrKey`

  </template>

  Key or data of the active item of the carousel.

  </RProp>

</RPropsTable>

### Carousel Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: RValueOfKey)`

  </template>

  Callback function triggered when the active carousel item is changed.

  </REvent>

</REventsTable>

### Carousel Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the carousel.
  </RSlot>

</RSlotsTable>

### Carousel Styles

<RStylesTable>

  <template #name="{ value }">--r-carousel-{{ value }}</template>

  <RStyle name="gap-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `calc(1em - 4px)`

  </template>

  Size of the gap between the carousel items.

  </RStyle>

</RStylesTable>

### CarouselItem Props

<RPropsTable>

  <RProp name="value">

  <template #type>

  `RValueOrKey`

  </template>

  Carousel item key or data.

  See [List Rendering](/guide/specs#list-rendering).

  </RProp>

</RPropsTable>

### CarouselItem Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the carousel item.
  </RSlot>

</RSlotsTable>
