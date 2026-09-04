<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import ContactSection from '~/components/home/ContactSection.vue'
import ProfessionalHistory from '~/components/home/ProfessionalHistory.vue'
import SelectedProject from '~/components/home/SelectedProject.vue'
import TechStack from '~/components/home/TechStack.vue'
import WorkApproach from '~/components/home/WorkApproach.vue'
import Aurora from '~/components/ui/Aurora.vue'

const { resolvedTheme } = useTheme()
const { pendingHomeSection } = useNavigateToHomeSection()
const homeScrollSpyRevision = useState('home-scroll-spy-revision', () => 0)

let pendingSectionFrame: number | null = null

const scrollToPendingSection = () => {
  const sectionId = pendingHomeSection.value
  if (!sectionId) return

  pendingHomeSection.value = null
  pendingSectionFrame = window.requestAnimationFrame(() => {
    pendingSectionFrame = window.requestAnimationFrame(() => {
      const target = document.getElementById(sectionId)
      if (!target) {
        pendingSectionFrame = null
        return
      }

      const scrollPadding =
        Number.parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingBlockStart,
        ) || 0
      const top =
        window.scrollY + target.getBoundingClientRect().top - scrollPadding
      window.scrollTo({ top: Math.max(0, top), behavior: 'instant' })
      pendingSectionFrame = null
      // AppHeader persists across routes — rebind/resync spy after alignment.
      homeScrollSpyRevision.value += 1
    })
  })
}

const scheduleHomeScrollSpySync = () => {
  // Same settle timing as pending-section scroll so the spy binds to live nodes
  // after Home section trees finish mounting (e.g. detail → LB → Hero).
  pendingSectionFrame = window.requestAnimationFrame(() => {
    pendingSectionFrame = window.requestAnimationFrame(() => {
      pendingSectionFrame = null
      homeScrollSpyRevision.value += 1
    })
  })
}

onMounted(async () => {
  await nextTick()
  if (pendingHomeSection.value) {
    scrollToPendingSection()
    return
  }

  scheduleHomeScrollSpySync()
})

onBeforeUnmount(() => {
  if (pendingSectionFrame !== null) {
    window.cancelAnimationFrame(pendingSectionFrame)
  }
})

const auroraConfig = computed(() =>
  resolvedTheme.value === 'light'
    ? {
        colorStops: ['#F7FAFF', '#DCE8FF', '#EEF4FF'],
        speed: 0.12,
        blend: 0.78,
        amplitude: 0.42,
      }
    : {
        colorStops: ['#071426', '#123A73', '#0A1F3F'],
        speed: 0.16,
        blend: 0.72,
        amplitude: 0.5,
      },
)
</script>

<template>
  <div>
    <HomeHero />

    <div class="post-hero">
      <div class="post-hero__ambient" data-post-hero-ambient aria-hidden="true">
        <Aurora
          :color-stops="auroraConfig.colorStops"
          :speed="auroraConfig.speed"
          :blend="auroraConfig.blend"
          :amplitude="auroraConfig.amplitude"
        />
      </div>

      <div class="post-hero__content">
        <SelectedProject />
        <ProfessionalHistory />
        <TechStack />
        <WorkApproach />
        <ContactSection />
      </div>
    </div>

    <LayoutAppFooter />
  </div>
</template>

<style scoped>
.post-hero {
  position: relative;
  isolation: isolate;
  background: var(--color-post-hero-canvas);
}

.post-hero::before {
  position: absolute;
  z-index: 1;
  inset: 0 0 auto;
  height: clamp(16rem, 30vw, 28rem);
  content: '';
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    var(--color-post-hero-canvas),
    color-mix(in srgb, var(--color-post-hero-canvas) 86%, transparent) 56%,
    transparent
  );
}

.post-hero__ambient {
  position: sticky;
  z-index: 0;
  inset-block-start: 0;
  width: 100%;
  height: 100vh;
  height: 100svh;
  margin-block-end: -100vh;
  margin-block-end: -100svh;
  overflow: hidden;
  pointer-events: none;
  --post-hero-aurora-opacity: 0.32;
  --aurora-fallback-start: #071426;
  --aurora-fallback-middle: #123a73;
  --aurora-fallback-end: #0a1f3f;

  opacity: var(--post-hero-aurora-opacity);
}

:global(html[data-theme='light'] .post-hero__ambient) {
  --post-hero-aurora-opacity: 0.1;
  --aurora-fallback-start: #f7faff;
  --aurora-fallback-middle: #dce8ff;
  --aurora-fallback-end: #eef4ff;
}

.post-hero__content {
  position: relative;
  z-index: 2;
}
</style>
