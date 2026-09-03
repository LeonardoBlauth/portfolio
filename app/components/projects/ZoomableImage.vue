<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    width?: number
    height?: number
    caption?: string
    figureClass?: string
  }>(),
  {
    width: undefined,
    height: undefined,
    caption: undefined,
    figureClass: 'case-figure',
  },
)

const { t } = useI18n()
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const captionId = useId()

const expandLabel = computed(() =>
  t('controls.lightbox.expand', { image: props.alt }),
)
const dialogLabel = computed(() =>
  t('controls.lightbox.dialog', { image: props.alt }),
)
const closeLabel = computed(() => t('controls.lightbox.close'))

let previousHtmlOverflow = ''
let previousBodyOverflow = ''
let scrollLocked = false

const getFocusable = () =>
  dialog.value
    ? Array.from(
        dialog.value.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      )
    : []

const lockScroll = () => {
  if (scrollLocked) return
  previousHtmlOverflow = document.documentElement.style.overflow
  previousBodyOverflow = document.body.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  scrollLocked = true
}

const unlockScroll = () => {
  if (!scrollLocked) return
  document.documentElement.style.overflow = previousHtmlOverflow
  document.body.style.overflow = previousBodyOverflow
  scrollLocked = false
}

const open = async () => {
  dialog.value?.showModal()
  lockScroll()
  await nextTick()
  closeButton.value?.focus()
}

const close = () => {
  dialog.value?.close()
}

const restoreFocus = () => {
  unlockScroll()
  trigger.value?.focus()
}

const onDialogClick = (event: MouseEvent) => {
  if (event.target === dialog.value) close()
}

const onDialogKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key !== 'Tab') return

  const focusable = getFocusable()
  const first = focusable[0]
  const last = focusable.at(-1)

  if (!first || !last) {
    event.preventDefault()
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onBeforeUnmount(() => {
  unlockScroll()
  if (dialog.value?.open) dialog.value.close()
})
</script>

<template>
  <figure :class="figureClass">
    <button
      ref="trigger"
      type="button"
      class="zoomable-image__trigger"
      :aria-label="expandLabel"
      @click="open"
    >
      <img
        :src="src"
        alt=""
        :width="width"
        :height="height"
        decoding="async"
      />
    </button>
    <figcaption v-if="caption">{{ caption }}</figcaption>
    <dialog
      ref="dialog"
      class="zoomable-image__dialog"
      aria-modal="true"
      :aria-label="dialogLabel"
      :aria-describedby="caption ? captionId : undefined"
      @close="restoreFocus"
      @cancel.prevent="close"
      @click="onDialogClick"
      @keydown="onDialogKeydown"
    >
      <button
        ref="closeButton"
        type="button"
        class="zoomable-image__close"
        :aria-label="closeLabel"
        @click="close"
      >
        <span aria-hidden="true">×</span>
      </button>
      <div class="zoomable-image__stage" @click.stop>
        <img class="zoomable-image__expanded" :src="src" :alt="alt" />
        <p v-if="caption" :id="captionId" class="zoomable-image__caption">
          {{ caption }}
        </p>
      </div>
    </dialog>
  </figure>
</template>

<style scoped>
.zoomable-image__trigger {
  display: block;
  width: 100%;
  padding: 0;
  cursor: zoom-in;
  background: transparent;
  border: 0;
  border-radius: inherit;
}

.zoomable-image__trigger img {
  width: 100%;
  height: auto;
  cursor: zoom-in;
  transition: border-color var(--motion-duration-fast) var(--motion-ease-standard);
}

.zoomable-image__trigger:is(:hover, :focus-visible) img {
  border-color: color-mix(
    in srgb,
    var(--color-accent) 42%,
    var(--color-border)
  );
}

.zoomable-image__dialog {
  position: fixed;
  inset: 0;
  display: grid;
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  margin: 0;
  padding: max(var(--space-12), env(safe-area-inset-top, 0px))
    max(var(--space-4), env(safe-area-inset-right, 0px))
    max(var(--space-4), env(safe-area-inset-bottom, 0px))
    max(var(--space-4), env(safe-area-inset-left, 0px));
  overflow: hidden;
  color: var(--color-text-primary);
  background: transparent;
  border: 0;
  place-items: center;
}

.zoomable-image__dialog:not([open]) {
  display: none;
}

.zoomable-image__dialog::backdrop {
  background: rgb(2 6 23 / 0.64);
}

.zoomable-image__close {
  position: absolute;
  top: max(var(--space-4), env(safe-area-inset-top, 0px));
  right: max(var(--space-4), env(safe-area-inset-right, 0px));
  z-index: 1;
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  place-items: center;
  color: var(--color-text-primary);
  font: inherit;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  background: color-mix(in srgb, var(--color-canvas) 78%, transparent);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

.zoomable-image__close:hover {
  color: var(--color-accent-interactive);
  border-color: var(--color-accent);
}

.zoomable-image__stage {
  display: grid;
  justify-items: center;
  max-width: min(92vw, 100%);
  max-height: min(88dvh, 100%);
}

.zoomable-image__expanded {
  width: auto;
  max-width: min(92vw, 100%);
  height: auto;
  max-height: min(88dvh, calc(100dvh - 5.5rem));
  object-fit: contain;
}

.zoomable-image__caption {
  max-width: min(92vw, 40rem);
  margin: var(--space-3) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.055em;
  text-align: center;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: no-preference) {
  .zoomable-image__dialog[open] {
    animation: zoomable-image-fade var(--motion-duration-base)
      var(--motion-ease-standard);
  }

  .zoomable-image__dialog[open]::backdrop {
    animation: zoomable-image-fade var(--motion-duration-base)
      var(--motion-ease-standard);
  }
}

@keyframes zoomable-image-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
