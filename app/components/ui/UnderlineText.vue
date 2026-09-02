<script setup lang="ts">
withDefaults(defineProps<{ as?: string; active?: boolean; variant?: 'center' | 'comes-in-goes-out' | 'goes-out-comes-in'; direction?: 'left' | 'right' }>(), { as: 'span', active: false, variant: 'comes-in-goes-out', direction: 'left' })
</script>
<template>
  <component :is="as" class="underline-text" :class="{ 'underline-text--active': active }" v-bind="$attrs" data-underline-text><slot /><span aria-hidden="true" class="underline-text__line" /></component>
</template>
<style scoped>
.underline-text { position: relative; display: inline-block; }
.underline-text__line { position: absolute; inset-inline-start: 0; inset-block-end: -0.2rem; width: 0; height: 1px; background: currentColor; transition: width var(--motion-duration-fast) var(--motion-ease-standard), inset-inline-start var(--motion-duration-fast) var(--motion-ease-standard); }
.underline-text:not(.underline-text--active):is(:hover, :focus-visible) .underline-text__line { width: 100%; }
.underline-text:not(.underline-text--active):not(:hover):not(:focus-visible) .underline-text__line { inset-inline-start: 100%; }
@media (prefers-reduced-motion: reduce) { .underline-text__line { transition: none; } }
</style>
