<script lang="ts" setup>
import '../common/style.scss'
import type { InputHTMLAttributes } from 'vue'
import { computed } from 'vue'
import RBox from '../box/index.vue'
import { isTruthyBooleanish } from '../common/utils'
import { useFormItem } from '../form/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RUpload',
})

interface InputProps {
  /** @ignore */
  accept?: InputHTMLAttributes['accept'],
  /** @ignore */
  capture?: InputHTMLAttributes['capture'],
  /** @ignore */
  disabled?: InputHTMLAttributes['disabled'],
  /** @ignore */
  form?: InputHTMLAttributes['form'],
  /** @ignore */
  multiple?: InputHTMLAttributes['multiple'],
  /** @ignore */
  name?: InputHTMLAttributes['name'],
}

const {
  block = false,
  disabled: userDisabled,
  loading = false,
  multiple = false,
  name: userName,
  ...props
} = defineProps<{
  /** Whether the upload is displayed as block. */
  block?: boolean,
  /**
   * Whether the upload is loading.
   * It will be non-interactive in loading state.
   */
  loading?: boolean,
} & InputProps>()

const emit = defineEmits<{
  /** Callback function triggered when one or more files are selected. */
  (event: 'select', value: File | File[]): void,
}>()

defineSlots<{
  /** Content of the upload. */
  default?: (props: {}) => any,
}>()

const { name, required } = useFormItem(() => userName)

const disabled = computed(() => {
  return isTruthyBooleanish(userDisabled) || loading
})

function change(event: InputEvent) {
  const target = event.target as HTMLInputElement
  const files = target.files!
  if (files.length) {
    emit('select', multiple ? Array.from(files) : files[0])
  }
  target.value = ''
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "upload",
      "description": "Box of the upload."
    }
  ]
}
</defs>

<template>
  <RBox
    tag="label"
    graphics-selector="upload"
    :class="['r-upload', { 'is-block': block }]"
    role="button"
    :aria-required="required"
    :aria-busy="loading"
  >
    <input
      :disabled="disabled"
      :multiple="multiple"
      :name="name"
      v-bind="props"
      type="file"
      class="r-upload__input"
      @change="change"
    >
    <slot></slot>
    <RLoading v-if="loading" class="r-upload__loading" />
  </RBox>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-upload-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-upload-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-upload-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-upload-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

.r-upload {
  // Color of the upload text.
  --R-upload-color: var(--r-upload-color, var(--r-common-color));
  // Color of the upload border.
  --R-upload-border-color: var(--r-upload-border-color, var(--R-upload-color));
  // Width of the upload border.
  --R-upload-border-width: var(--r-upload-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-upload-border-dash: var(--r-upload-border-dash, var(--r-common-stroke-dash));
  // Box styles
  --r-box-border-color: var(--R-upload-border-color);
  --r-box-border-width: var(--R-upload-border-width);
  --r-box-border-dash: var(--R-upload-border-dash);
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-upload-color);
  text-align: center;
  cursor: pointer;
  &:focus-visible, &:active {
    // @default 2px when focused or active
    --R-upload-border-width: var(--r-upload-border-width, var(--r-common-emphasized-stroke-width));
  }
  &:disabled:not(.is-loading) {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &.is-filled:disabled {
    text-shadow: none;
  }
  &.is-block {
    display: block;
  }
}
.r-upload__input {
  position: absolute;
  block-size: 0;
  inline-size: 0;
  opacity: 0;
}
</style>
