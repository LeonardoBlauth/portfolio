<script setup lang="ts">
import { localizedRoutes } from '~/data/localized-routes'
import LiquidGlass from '~/components/ui/LiquidGlass.vue'
import MorphingTabs from '~/components/ui/MorphingTabs.vue'
import UnderlineText from '~/components/ui/UnderlineText.vue'
import type { SupportedLocale } from '~/utils/locale'
import { writeLocalePreference } from '~/utils/locale'

const { locale, t } = useI18n()
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()
const { resolvedTheme, setTheme } = useTheme()

const dialog = useTemplateRef<HTMLDialogElement>('mobileDialog')
const menuTrigger = useTemplateRef<HTMLButtonElement>('menuTrigger')
const menuClose = useTemplateRef<HTMLButtonElement>('menuClose')
const menuOpen = ref(false)
const mounted = ref(false)
const currentHash = ref(route.hash)
const showReturnToHero = ref(false)
const activeSectionId = ref('')

let desktopMediaQuery: MediaQueryList | null = null
let restoreFocusAfterClose = true
let scrollAnimationFrame: number | null = null
let routeAlignmentFrame: number | null = null
let returnToHeroFrame: number | null = null
let sectionObserver: IntersectionObserver | null = null

const SECTION_SCROLL_DURATION_MS = 360

const currentLocale = computed<SupportedLocale>(() =>
  locale.value === 'en' ? 'en' : 'pt-BR',
)
const targetLocale = computed<SupportedLocale>(() =>
  currentLocale.value === 'pt-BR' ? 'en' : 'pt-BR',
)
const normalizePathname = (pathname: string) =>
  pathname === '/' ? pathname : pathname.replace(/\/+$/, '')
const homePath = computed(() => localizedRoutes.home.paths[currentLocale.value])
const isHomeRoute = computed(
  () => normalizePathname(route.path) === normalizePathname(homePath.value),
)
const targetLocalePath = computed(
  () => switchLocalePath(targetLocale.value).split('#', 1)[0] || '/',
)
const targetLocaleHref = computed(() =>
  mounted.value && currentHash.value
    ? `${targetLocalePath.value}${currentHash.value}`
    : targetLocalePath.value,
)
const targetTheme = computed(() =>
  resolvedTheme.value === 'dark' ? 'light' : 'dark',
)
const navigationItems = computed(() => [
  { id: 'projects', label: t('navigation.projects') },
  { id: 'experience', label: t('navigation.experience') },
  { id: 'stack', label: t('navigation.stack') },
  { id: 'contact', label: t('navigation.contact') },
])

const sectionHref = (id: string) => `${homePath.value}#${id}`
const handleLocaleSwitch = () => writeLocalePreference(targetLocale.value)
const toggleTheme = () => setTheme(targetTheme.value)
const cancelScrollAnimation = () => {
  if (scrollAnimationFrame === null) return

  window.cancelAnimationFrame(scrollAnimationFrame)
  scrollAnimationFrame = null
}
const cancelRouteAlignment = () => {
  if (routeAlignmentFrame === null) return

  window.cancelAnimationFrame(routeAlignmentFrame)
  routeAlignmentFrame = null
}
const alignRouteHash = async () => {
  if (!route.hash) return

  await nextTick()
  cancelRouteAlignment()
  routeAlignmentFrame = window.requestAnimationFrame(() => {
    routeAlignmentFrame = window.requestAnimationFrame(() => {
      const target = document.getElementById(
        decodeURIComponent(route.hash.slice(1)),
      )
      if (!target) return

      const scrollPadding = Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingBlockStart,
      )
      window.scrollTo({
        top: Math.max(
          0,
          window.scrollY + target.getBoundingClientRect().top - scrollPadding,
        ),
        behavior: 'instant',
      })
      routeAlignmentFrame = null
    })
  })
}
const scrollingKeys = new Set([
  'ArrowDown',
  'ArrowUp',
  'End',
  'Home',
  'PageDown',
  'PageUp',
  ' ',
])
const handleScrollKeydown = (event: KeyboardEvent) => {
  if (scrollingKeys.has(event.key)) cancelScrollAnimation()
}
const scrollToSection = (target: HTMLElement) => {
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
    const progress = Math.min(
      (timestamp - startedAt) / SECTION_SCROLL_DURATION_MS,
      1,
    )
    const easedProgress = 1 - Math.pow(1 - progress, 3)

    window.scrollTo({
      top: startY + distance * easedProgress,
      behavior: 'instant',
    })

    if (progress < 1) {
      scrollAnimationFrame = window.requestAnimationFrame(animateScroll)
    } else {
      scrollAnimationFrame = null
    }
  }

  scrollAnimationFrame = window.requestAnimationFrame(animateScroll)
}
const handleSectionControlNavigation = (id: string) => {
  const target = document.getElementById(id)
  if (target) scrollToSection(target)
}
const handleDesktopSectionNavigation = (event: MouseEvent, id: string) => {
  if (!isHomeRoute.value) return
  event.preventDefault()
  activeSectionId.value = id
  handleSectionControlNavigation(id)
}
const setupSectionObserver = () => {
  sectionObserver?.disconnect()
  if (!isHomeRoute.value) return
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) activeSectionId.value = visible.target.id
    },
    { rootMargin: '-18% 0px -52% 0px', threshold: [0.05, 0.25, 0.5] },
  )
  navigationItems.value.forEach(({ id }) => document.getElementById(id) && sectionObserver?.observe(document.getElementById(id)!))
}

const openMenu = async () => {
  if (menuOpen.value) return

  menuOpen.value = true
  await nextTick()
  dialog.value?.showModal()
  menuClose.value?.focus()
}

const handleDialogClose = async () => {
  menuOpen.value = false
  await nextTick()
  if (restoreFocusAfterClose) menuTrigger.value?.focus()
  restoreFocusAfterClose = true
}

const closeMenu = (options?: { restoreFocus?: boolean }) => {
  if (!menuOpen.value) return

  restoreFocusAfterClose = options?.restoreFocus ?? true

  if (dialog.value?.open) {
    dialog.value.close()
  } else {
    void handleDialogClose()
  }
}

const handleMobileSectionNavigation = (id: string) => {
  handleSectionControlNavigation(id)
  closeMenu()
}

const cancelReturnToHeroFrame = () => {
  if (returnToHeroFrame === null) return

  window.cancelAnimationFrame(returnToHeroFrame)
  returnToHeroFrame = null
}
const updateReturnToHeroVisibility = () => {
  if (!isHomeRoute.value) {
    showReturnToHero.value = false
    return
  }

  const hero = document.getElementById('top')
  if (!hero) {
    showReturnToHero.value = false
    return
  }

  const scrollPadding = Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingBlockStart,
  )
  showReturnToHero.value = hero.getBoundingClientRect().bottom <= scrollPadding
}
const syncReturnToHeroVisibility = async () => {
  await nextTick()
  updateReturnToHeroVisibility()
}
const handleViewportScroll = () => {
  if (returnToHeroFrame !== null) return

  returnToHeroFrame = window.requestAnimationFrame(() => {
    returnToHeroFrame = null
    updateReturnToHeroVisibility()
  })
}

const handleDesktopTransition = (event: MediaQueryListEvent) => {
  if (event.matches) closeMenu({ restoreFocus: false })
}

watch(
  () => route.fullPath,
  (fullPath, previousFullPath) => {
    currentHash.value = route.hash

    const currentPath = fullPath.split('#', 1)[0]
    const previousPath = previousFullPath?.split('#', 1)[0]
    if (route.hash && currentPath !== previousPath) void alignRouteHash()
    if (mounted.value) void syncReturnToHeroVisibility()
  },
)
watch(isHomeRoute, () => nextTick(setupSectionObserver))

const getDialogFocusableElements = () =>
  dialog.value
    ? Array.from(
        dialog.value.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
    : []

const handleDialogKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu()
    return
  }

  if (event.key !== 'Tab') return

  const focusableElements = getDialogFocusableElements()
  const firstElement = focusableElements[0]
  const lastElement = focusableElements.at(-1)

  if (!firstElement || !lastElement) {
    event.preventDefault()
  } else if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

onMounted(() => {
  mounted.value = true
  window.addEventListener('popstate', cancelScrollAnimation)
  window.addEventListener('hashchange', cancelScrollAnimation)
  window.addEventListener('wheel', cancelScrollAnimation, { passive: true })
  window.addEventListener('touchstart', cancelScrollAnimation, {
    passive: true,
  })
  window.addEventListener('keydown', handleScrollKeydown)
  window.addEventListener('scroll', handleViewportScroll, { passive: true })
  desktopMediaQuery = window.matchMedia('(min-width: 52rem)')
  desktopMediaQuery.addEventListener('change', handleDesktopTransition)
  if (desktopMediaQuery.matches) closeMenu({ restoreFocus: false })
  setupSectionObserver()
  void syncReturnToHeroVisibility()
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', cancelScrollAnimation)
  window.removeEventListener('hashchange', cancelScrollAnimation)
  window.removeEventListener('wheel', cancelScrollAnimation)
  window.removeEventListener('touchstart', cancelScrollAnimation)
  window.removeEventListener('keydown', handleScrollKeydown)
  window.removeEventListener('scroll', handleViewportScroll)
  desktopMediaQuery?.removeEventListener('change', handleDesktopTransition)
  sectionObserver?.disconnect()
  cancelReturnToHeroFrame()
  cancelRouteAlignment()
  cancelScrollAnimation()
  if (dialog.value?.open) dialog.value.close()
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__shell layout-container">
    <LiquidGlass :radius="16" :border="0.04" :lightness="50" blend="difference" :alpha="0.9" :blur="6" :scale="-70" :frost="0.08">
    <div class="site-header__bar">
      <button
        v-if="isHomeRoute"
        class="site-header__brand"
        type="button"
        aria-controls="top"
        :aria-label="t('navigation.home')"
        @click="handleSectionControlNavigation('top')"
      >
        <span class="site-header__mark" aria-hidden="true">
          <img
            class="site-header__mark-dark"
            src="/brand/lb-monogram-color.svg"
            alt=""
            width="120"
            height="120"
          />
          <img
            class="site-header__mark-light"
            src="/brand/lb-monogram-cobalt.svg"
            alt=""
            width="120"
            height="120"
          />
        </span>
      </button>
      <NuxtLink
        v-else
        class="site-header__brand"
        :to="`${homePath}#top`"
        :aria-label="t('navigation.home')"
      >
        <span class="site-header__mark" aria-hidden="true">
          <img
            class="site-header__mark-dark"
            src="/brand/lb-monogram-color.svg"
            alt=""
            width="120"
            height="120"
          />
          <img
            class="site-header__mark-light"
            src="/brand/lb-monogram-cobalt.svg"
            alt=""
            width="120"
            height="120"
          />
        </span>
      </NuxtLink>

      <nav
        class="site-header__desktop-nav"
        :aria-label="t('navigation.primary')"
      >
        <MorphingTabs :active-tab="activeSectionId" :margin="5" :blur-std-deviation="2">
          <UnderlineText
            v-for="item in navigationItems"
            :key="item.id"
            as="a"
            :href="sectionHref(item.id)"
            :data-tab-id="item.id"
            :active="activeSectionId === item.id"
            @click="handleDesktopSectionNavigation($event, item.id)"
          >
            {{ item.label }}
          </UnderlineText>
        </MorphingTabs>
      </nav>

      <div class="site-header__controls">
        <NuxtLink
          class="site-header__control site-header__locale"
          :to="targetLocaleHref"
          :hreflang="targetLocale"
          :aria-label="
            t('controls.locale', {
              locale: targetLocale === 'en' ? 'English' : 'português',
            })
          "
          @click="handleLocaleSwitch"
        >
          <span :lang="targetLocale">{{
            targetLocale === 'en' ? 'EN' : 'PT'
          }}</span>
        </NuxtLink>

        <button class="site-header__control" type="button" @click="toggleTheme">
          <span class="visually-hidden site-header__theme-label--light">
            {{ t('controls.theme.light') }}
          </span>
          <span class="visually-hidden site-header__theme-label--dark">
            {{ t('controls.theme.dark') }}
          </span>
          <svg
            class="site-header__theme-icon site-header__theme-icon--light"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            />
          </svg>
          <svg
            class="site-header__theme-icon site-header__theme-icon--dark"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"
            />
          </svg>
        </button>

        <button
          ref="menuTrigger"
          class="site-header__control site-header__menu-trigger"
          type="button"
          aria-controls="mobile-navigation"
          :aria-expanded="menuOpen"
          :aria-label="t('controls.menu.open')"
          data-testid="mobile-menu-trigger"
          @click="openMenu"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
    </LiquidGlass>
    </div>

    <dialog
      id="mobile-navigation"
      ref="mobileDialog"
      class="mobile-navigation"
      :aria-label="t('navigation.mobile')"
      @cancel.prevent="closeMenu()"
      @close="handleDialogClose"
      @click.self="closeMenu()"
      @keydown="handleDialogKeydown"
    >
      <div class="mobile-navigation__heading">
        <span>{{ t('navigation.menu') }}</span>
        <button
          ref="menuClose"
          class="site-header__control"
          type="button"
          :aria-label="t('controls.menu.close')"
          @click="closeMenu()"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <nav :aria-label="t('navigation.mobile')">
        <template v-if="isHomeRoute">
          <button
            v-for="item in navigationItems"
            :key="item.id"
            type="button"
            :aria-controls="item.id"
            @click="handleMobileSectionNavigation(item.id)"
          >
            {{ item.label }}
          </button>
        </template>
        <template v-else>
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.id"
            :to="sectionHref(item.id)"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>
    </dialog>

    <button
      v-if="isHomeRoute"
      class="return-to-hero"
      :class="{ 'return-to-hero--visible': showReturnToHero }"
      type="button"
      :aria-hidden="!showReturnToHero"
      :tabindex="showReturnToHero ? 0 : -1"
      :aria-label="t('controls.backToTop')"
      @click="handleSectionControlNavigation('top')"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5m0 0-5 5m5-5 5 5" />
      </svg>
    </button>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  z-index: 100;
  inset-block-start: var(--space-4);
  inset-inline: 0;
  pointer-events: none;
}

.site-header__bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  min-height: calc(var(--header-height) - var(--space-3));
  padding: var(--space-2);
  pointer-events: auto;
}

.site-header__shell { pointer-events: auto; }

.site-header__brand,
.site-header__control {
  display: inline-grid;
  min-width: 2.75rem;
  min-height: 2.75rem;
  place-items: center;
  border-radius: var(--radius-md);
}

.site-header__brand {
  padding: 0;
  color: inherit;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.site-header__mark {
  position: relative;
  display: block;
  width: 2rem;
  height: 2rem;
}

.site-header__mark img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.site-header__mark-light {
  display: none;
}
:global(:root[data-theme='light'] .site-header__mark-dark) {
  display: none;
}
:global(:root[data-theme='light'] .site-header__mark-light) {
  display: block;
}

.site-header__desktop-nav {
  display: none;
  justify-self: center;
  align-items: center;
  gap: clamp(var(--space-4), 2.4vw, var(--space-8));
}

.site-header__desktop-nav :deep(.morphing-tabs) {
  gap: clamp(var(--space-4), 2.4vw, var(--space-8));
}

.site-header__desktop-nav :is(a, button) {
  position: relative;
  z-index: 1;
  padding: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color var(--motion-duration-fast) var(--motion-ease-standard);
}

.site-header__desktop-nav :is(a, button):hover {
  color: var(--color-text-primary);
}

.site-header__controls {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: var(--space-1);
}

.site-header__control {
  padding: 0;
  color: var(--color-text-secondary);
  background: transparent;
  border: 0;
  cursor: pointer;
  text-decoration: none;
}

.site-header__control:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-elevated);
}

.site-header__control svg {
  width: 1.125rem;
  height: 1.125rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.site-header__theme-icon--dark {
  display: none;
}

.site-header__theme-label--dark {
  display: none;
}

:global(:root[data-theme='light'] .site-header__theme-icon--light) {
  display: none;
}

:global(:root[data-theme='light'] .site-header__theme-icon--dark) {
  display: block;
}

:global(:root[data-theme='light'] .site-header__theme-label--light) {
  display: none;
}

:global(:root[data-theme='light'] .site-header__theme-label--dark) {
  display: block;
}

.site-header__locale {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.return-to-hero {
  position: fixed;
  z-index: 101;
  inset-block-end: var(--space-6);
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

.mobile-navigation {
  position: fixed;
  inset: var(--space-4) var(--space-4) auto auto;
  width: min(22rem, calc(100% - (2 * var(--space-4))));
  max-height: calc(100dvh - (2 * var(--space-4)));
  padding: var(--space-4);
  margin: 0;
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
  pointer-events: auto;
}

.mobile-navigation::backdrop {
  background: rgb(0 0 0 / 56%);
  backdrop-filter: blur(0.2rem);
}

.mobile-navigation__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline-start: var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.mobile-navigation nav {
  display: grid;
  gap: var(--space-2);
  margin-block-start: var(--space-4);
}

.mobile-navigation nav :is(a, button) {
  width: 100%;
  min-height: 3rem;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  text-align: start;
  background: var(--color-surface-elevated);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.mobile-navigation nav :is(a, button):hover {
  color: var(--color-accent-interactive);
  border-color: var(--color-border);
}

@media (width >= 52rem) {
  .site-header__desktop-nav {
    display: flex;
  }
  .site-header__menu-trigger {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .return-to-hero {
    transition: none;
  }
}
</style>
