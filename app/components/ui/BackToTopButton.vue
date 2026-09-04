<script setup lang="ts">
const emit = defineEmits<{
  activate: []
}>()

const { t } = useI18n()

const visible = ref(false)
const footerObscures = ref(false)

const SCROLL_DURATION_MS = 360

let scrollFrame: number | null = null
let visibilityFrame: number | null = null
let footerOverlapObserver: IntersectionObserver | null = null
let footerObserverRetries = 0

const cancelScrollAnimation = () => {
  if (scrollFrame === null) return
  window.cancelAnimationFrame(scrollFrame)
  scrollFrame = null
}

const cancelVisibilityFrame = () => {
  if (visibilityFrame === null) return
  window.cancelAnimationFrame(visibilityFrame)
  visibilityFrame = null
}

const updateVisibility = () => {
  const hero = document.getElementById('top')
  if (!hero) {
    visible.value = false
    return
  }

  const scrollPadding = Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingBlockStart,
  )
  const heroHasLeftView = hero.getBoundingClientRect().bottom <= scrollPadding
  visible.value = heroHasLeftView && !footerObscures.value
}

const disconnectFooterOverlapObserver = () => {
  footerOverlapObserver?.disconnect()
  footerOverlapObserver = null
  footerObserverRetries = 0
  footerObscures.value = false
}

const setupFooterOverlapObserver = () => {
  footerOverlapObserver?.disconnect()
  footerOverlapObserver = null

  const footer = document.querySelector('.site-footer')
  if (!footer) {
    if (footerObserverRetries >= 12) return
    footerObserverRetries += 1
    window.requestAnimationFrame(setupFooterOverlapObserver)
    return
  }

  footerObserverRetries = 0

  const returnButton = document.querySelector<HTMLElement>('.return-to-hero')
  const inset = (() => {
    if (returnButton) {
      const styles = getComputedStyle(returnButton)
      if (styles.insetBlockEnd && styles.insetBlockEnd !== 'auto') {
        return styles.insetBlockEnd
      }

      const token = styles.getPropertyValue('--return-to-hero-inset').trim()
      if (token) return token
    }

    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--space-6')
        .trim() || '1.5rem'
    )
  })()

  footerOverlapObserver = new IntersectionObserver(
    (entries) => {
      footerObscures.value = Boolean(entries[0]?.isIntersecting)
      updateVisibility()
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `0px 0px -${inset} 0px`,
    },
  )
  footerOverlapObserver.observe(footer)
}

const handleViewportScroll = () => {
  if (visibilityFrame !== null) return

  visibilityFrame = window.requestAnimationFrame(() => {
    visibilityFrame = null
    updateVisibility()
  })
}

const scrollToTop = () => {
  const target = document.getElementById('top')
  if (!target) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return
  }

  const scrollPadding = Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingBlockStart,
  )
  const startY = window.scrollY
  const targetY = Math.max(
    0,
    Math.min(
      document.documentElement.scrollHeight - window.innerHeight,
      startY + target.getBoundingClientRect().top - scrollPadding,
    ),
  )

  cancelScrollAnimation()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: targetY, behavior: 'instant' })
    return
  }

  const distance = targetY - startY
  const startedAt = performance.now()
  const animateScroll = (timestamp: number) => {
    const progress = Math.min((timestamp - startedAt) / SCROLL_DURATION_MS, 1)
    const easedProgress = 1 - Math.pow(1 - progress, 3)

    window.scrollTo({
      top: startY + distance * easedProgress,
      behavior: 'instant',
    })

    if (progress < 1) {
      scrollFrame = window.requestAnimationFrame(animateScroll)
    } else {
      scrollFrame = null
    }
  }

  scrollFrame = window.requestAnimationFrame(animateScroll)
}

const handleClick = () => {
  emit('activate')
  scrollToTop()
}

onMounted(async () => {
  window.addEventListener('scroll', handleViewportScroll, { passive: true })
  await nextTick()
  setupFooterOverlapObserver()
  updateVisibility()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleViewportScroll)
  disconnectFooterOverlapObserver()
  cancelVisibilityFrame()
  cancelScrollAnimation()
})
</script>

<template>
  <button
    class="return-to-hero"
    :class="{ 'return-to-hero--visible': visible }"
    type="button"
    data-return-to-hero
    :aria-hidden="!visible"
    :tabindex="visible ? 0 : -1"
    :aria-label="t('controls.backToTop')"
    @click="handleClick"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 19V5m0 0-5 5m5-5 5 5" />
    </svg>
  </button>
</template>

<style scoped>
.return-to-hero {
  --return-to-hero-inset: var(--space-6);

  position: fixed;
  z-index: 101;
  inset-block-end: var(--return-to-hero-inset);
  inset-inline-end: var(--layout-gutter);
  display: grid;
  width: 3rem;
  height: 3rem;
  padding: 0;
  place-items: center;
  color: var(--color-text-primary);
  visibility: hidden;
  pointer-events: none;
  cursor: pointer;
  opacity: 0;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-elevated);
  translate: 0 var(--space-3);
  transition:
    opacity var(--motion-duration-fast) var(--motion-ease-standard),
    translate var(--motion-duration-fast) var(--motion-ease-standard),
    visibility 0s linear var(--motion-duration-fast);
}

.return-to-hero--visible {
  visibility: visible;
  pointer-events: auto;
  opacity: 1;
  translate: 0;
  transition-delay: 0s;
}

.return-to-hero:hover {
  color: var(--color-accent-interactive);
  background: var(--color-surface);
}

:global(:root[data-theme='light'] .return-to-hero) {
  color: var(--color-accent);
  background: var(--color-surface);
  border-color: color-mix(
    in srgb,
    var(--color-accent) 32%,
    var(--color-border)
  );
}

.return-to-hero svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

@media (prefers-reduced-motion: reduce) {
  .return-to-hero {
    transition: none;
  }
}
</style>
