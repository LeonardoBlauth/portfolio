<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'

export type ScrollRevealVariant = 'block' | 'words'

interface ScrollRevealProps {
  as?: string
  variant?: ScrollRevealVariant
  scrollContainerRef?: Ref<HTMLElement | null> | HTMLElement | null
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  rotationEnd?: string
  wordAnimationEnd?: string
  start?: string
}

const props = withDefaults(defineProps<ScrollRevealProps>(), {
  as: 'div',
  variant: 'block',
  scrollContainerRef: null,
  enableBlur: true,
  baseOpacity: 0.18,
  baseRotation: 0,
  blurStrength: 8,
  rotationEnd: 'top 58%',
  wordAnimationEnd: 'top 58%',
  start: 'top bottom',
})

const slots = useSlots()
const { locale } = useI18n()
const containerRef = useTemplateRef<HTMLElement>('containerRef')
const compactViewport = ref(false)

const text = computed(() => {
  const extract = (
    nodes: ReturnType<NonNullable<typeof slots.default>>,
  ): string =>
    nodes
      .map((vnode) => {
        if (typeof vnode.children === 'string') return vnode.children
        if (Array.isArray(vnode.children)) {
          return extract(
            vnode.children as ReturnType<NonNullable<typeof slots.default>>,
          )
        }
        return ''
      })
      .join('')

  return extract(slots.default?.() ?? [])
})

const splitText = computed(() =>
  text.value.split(/(\s+)/).map((segment) => ({
    text: segment,
    isWord: !/^\s+$/.test(segment),
  })),
)

const resolvedBlurStrength = computed(() =>
  compactViewport.value ? Math.min(props.blurStrength, 4) : props.blurStrength,
)

const resolvedTranslate = computed(() => (compactViewport.value ? 18 : 28))

let pluginRegistered = false
let context: gsap.Context | undefined
let compactMediaQuery: MediaQueryList | null = null
let motionMediaQuery: MediaQueryList | null = null

const prefersReducedMotion = () => motionMediaQuery?.matches ?? false

const supportsCssViewTimeline = () =>
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline: view()')

const registerScrollTrigger = () => {
  if (pluginRegistered || !import.meta.client) return
  gsap.registerPlugin(ScrollTrigger)
  pluginRegistered = true
}

const resolveScroller = (
  scrollerRef: ScrollRevealProps['scrollContainerRef'],
): HTMLElement | Window => {
  if (!scrollerRef) return window
  if (scrollerRef instanceof HTMLElement) return scrollerRef
  return scrollerRef.value ?? window
}

const teardown = () => {
  context?.revert()
  context = undefined
}

const setup = async () => {
  teardown()
  if (!import.meta.client) return
  if (prefersReducedMotion()) return

  await nextTick()

  const element = containerRef.value
  if (!element) return

  if (props.variant === 'block' && supportsCssViewTimeline()) {
    return
  }

  registerScrollTrigger()

  const scroller = resolveScroller(props.scrollContainerRef)
  const targets =
    props.variant === 'words'
      ? element.querySelectorAll<HTMLElement>('.scroll-reveal-word')
      : [element]

  if (targets.length === 0) return

  const from: gsap.TweenVars = {
    opacity: props.baseOpacity,
    y: resolvedTranslate.value,
    transformOrigin: '50% 100%',
    willChange: 'opacity, filter, transform',
  }
  const to: gsap.TweenVars = {
    ease: 'none',
    opacity: 1,
    y: 0,
    stagger: props.variant === 'words' ? 0.04 : 0,
    scrollTrigger: {
      trigger: element,
      scroller,
      start: props.start,
      end: props.wordAnimationEnd,
      scrub: true,
      invalidateOnRefresh: true,
    },
    onComplete: () => {
      gsap.set(targets, { willChange: 'auto' })
    },
  }

  if (props.enableBlur) {
    from.filter = `blur(${resolvedBlurStrength.value}px)`
    to.filter = 'blur(0px)'
  }

  if (props.baseRotation !== 0) {
    from.rotate = props.baseRotation
    to.rotate = 0
  }

  context = gsap.context(() => {
    gsap.fromTo(targets, from, to)
  }, element)
}

const syncCompactViewport = () => {
  compactViewport.value = compactMediaQuery?.matches ?? false
}

const handleCompactViewportChange = () => {
  syncCompactViewport()
  void setup()
}

const handleMotionPreferenceChange = () => {
  void setup()
}

watch(
  [
    () => props.variant,
    () => props.baseOpacity,
    () => props.enableBlur,
    () => text.value,
    locale,
  ],
  () => {
    void setup()
  },
)

onMounted(() => {
  compactMediaQuery = window.matchMedia('(width < 52rem)')
  motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncCompactViewport()
  compactMediaQuery.addEventListener('change', handleCompactViewportChange)
  motionMediaQuery.addEventListener('change', handleMotionPreferenceChange)
  void setup()
})

onBeforeUnmount(() => {
  compactMediaQuery?.removeEventListener('change', handleCompactViewportChange)
  motionMediaQuery?.removeEventListener('change', handleMotionPreferenceChange)
  motionMediaQuery = null
  teardown()
})
</script>

<template>
  <component
    :is="as"
    ref="containerRef"
    class="scroll-reveal"
    :class="{
      'scroll-reveal--words': variant === 'words',
      'scroll-reveal--css': variant === 'block' && enableBlur,
      'scroll-reveal--css-fade': variant === 'block' && !enableBlur,
    }"
    :data-scroll-reveal="variant"
  >
    <template v-if="variant === 'words'">
      <template v-for="(segment, index) in splitText" :key="index">
        <span v-if="segment.isWord" class="scroll-reveal-word word">{{
          segment.text
        }}</span>
        <template v-else>{{ segment.text }}</template>
      </template>
    </template>
    <slot v-else />
  </component>
</template>

<style scoped>
.scroll-reveal-word {
  display: inline-block;
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .scroll-reveal--css,
    .scroll-reveal--css-fade {
      animation: scroll-reveal-block linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 70%;
    }

    .scroll-reveal--css-fade {
      animation-name: scroll-reveal-block-fade;
      animation-range: entry 0% entry 40%;
    }
  }

  @keyframes scroll-reveal-block {
    from {
      opacity: 0.18;
      filter: blur(8px);
      transform: translate3d(0, 1.75rem, 0);
    }

    to {
      opacity: 1;
      filter: blur(0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes scroll-reveal-block-fade {
    from {
      opacity: 0.18;
      transform: translate3d(0, 1.75rem, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @media (width < 52rem) {
    @media (prefers-reduced-motion: no-preference) {
      .scroll-reveal--css,
      .scroll-reveal--css-fade {
        animation-range: entry 0% entry 55%;
      }
    }

    @keyframes scroll-reveal-block {
      from {
        opacity: 0.28;
        filter: blur(4px);
        transform: translate3d(0, 1.125rem, 0);
      }

      to {
        opacity: 1;
        filter: blur(0);
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes scroll-reveal-block-fade {
      from {
        opacity: 0.28;
        transform: translate3d(0, 1.125rem, 0);
      }

      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal,
  .scroll-reveal-word {
    animation: none !important;
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>
