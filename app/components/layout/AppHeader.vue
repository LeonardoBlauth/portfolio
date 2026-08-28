<script setup lang="ts">
import { localizedRoutes } from '~/data/localized-routes'
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

const currentLocale = computed<SupportedLocale>(() =>
  locale.value === 'en' ? 'en' : 'pt-BR',
)
const targetLocale = computed<SupportedLocale>(() =>
  currentLocale.value === 'pt-BR' ? 'en' : 'pt-BR',
)
const homePath = computed(() => localizedRoutes.home.paths[currentLocale.value])
const targetLocalePath = computed(
  () => switchLocalePath(targetLocale.value).split('#', 1)[0] || '/',
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
const handleLocaleSwitch = (event: MouseEvent) => {
  writeLocalePreference(targetLocale.value)

  if (!route.hash) return

  event.preventDefault()
  void navigateTo({ path: targetLocalePath.value, hash: route.hash })
}
const toggleTheme = () => setTheme(targetTheme.value)

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
  menuTrigger.value?.focus()
}

const closeMenu = () => {
  if (!menuOpen.value) return

  if (dialog.value?.open) {
    dialog.value.close()
  } else {
    void handleDialogClose()
  }
}

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

onBeforeUnmount(() => {
  if (dialog.value?.open) dialog.value.close()
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__bar layout-container">
      <NuxtLink
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
        <a
          v-for="item in navigationItems"
          :key="item.id"
          :href="sectionHref(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="site-header__controls">
        <NuxtLink
          class="site-header__control site-header__locale"
          :to="targetLocalePath"
          :hreflang="targetLocale"
          :lang="targetLocale"
          :aria-label="
            t('controls.locale', {
              locale: targetLocale === 'en' ? 'English' : 'português',
            })
          "
          @click="handleLocaleSwitch"
        >
          {{ targetLocale === 'en' ? 'EN' : 'PT' }}
        </NuxtLink>

        <button
          class="site-header__control"
          type="button"
          :aria-label="t('controls.theme.toggle')"
          @click="toggleTheme"
        >
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

    <dialog
      id="mobile-navigation"
      ref="mobileDialog"
      class="mobile-navigation"
      :aria-label="t('navigation.mobile')"
      @cancel.prevent="closeMenu"
      @close="handleDialogClose"
      @click.self="closeMenu"
      @keydown="handleDialogKeydown"
    >
      <div class="mobile-navigation__heading">
        <span>{{ t('navigation.menu') }}</span>
        <button
          ref="menuClose"
          class="site-header__control"
          type="button"
          :aria-label="t('controls.menu.close')"
          @click="closeMenu"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <nav :aria-label="t('navigation.mobile')">
        <a
          v-for="item in navigationItems"
          :key="item.id"
          :href="sectionHref(item.id)"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </nav>
    </dialog>
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
  background: var(--color-surface);
  background: color-mix(in srgb, var(--color-surface) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-border) 74%, transparent);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-subtle);
  backdrop-filter: blur(1rem);
  pointer-events: auto;
}

.site-header__brand,
.site-header__control {
  display: inline-grid;
  min-width: 2.75rem;
  min-height: 2.75rem;
  place-items: center;
  border-radius: var(--radius-md);
}

.site-header__brand {
  color: inherit;
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
:global(:root[data-theme='light']) .site-header__mark-dark {
  display: none;
}
:global(:root[data-theme='light']) .site-header__mark-light {
  display: block;
}

.site-header__desktop-nav {
  display: none;
  justify-self: center;
  align-items: center;
  gap: clamp(var(--space-4), 2.4vw, var(--space-8));
}

.site-header__desktop-nav a {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition: color var(--motion-duration-fast) var(--motion-ease-standard);
}

.site-header__desktop-nav a:hover {
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

:global(:root[data-theme='light']) .site-header__theme-icon--light {
  display: none;
}

:global(:root[data-theme='light']) .site-header__theme-icon--dark {
  display: block;
}

.site-header__locale {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
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

.mobile-navigation nav a {
  min-height: 3rem;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  background: var(--color-surface-elevated);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
}

.mobile-navigation nav a:hover {
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
</style>
