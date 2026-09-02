<template>
  <footer class="site-footer">
    <div class="site-footer__layout layout-container">
      <div class="site-footer__identity">
        <span
          class="site-footer__monogram"
          data-footer-monogram
          aria-hidden="true"
        >
          <img
            class="site-footer__monogram-dark"
            src="/brand/lb-monogram-color.svg"
            alt=""
            width="120"
            height="120"
          />
          <img
            class="site-footer__monogram-light"
            src="/brand/lb-monogram-cobalt.svg"
            alt=""
            width="120"
            height="120"
          />
        </span>
      </div>
      <p data-footer-copyright>© 2026</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  isolation: isolate;
  background: var(--color-footer-canvas);
}

.site-footer::before {
  position: absolute;
  z-index: 0;
  inset: 0 0 auto;
  width: 100%;
  height: min(4rem, 100%);
  content: '';
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    var(--color-post-hero-canvas),
    color-mix(
        in srgb,
        var(--color-post-hero-canvas) 52%,
        var(--color-footer-canvas)
      )
      50%,
    var(--color-footer-canvas)
  );
}

.site-footer__layout {
  position: relative;
  z-index: 1;
  display: flex;
  gap: var(--space-8);
  align-items: center;
  justify-content: space-between;
  min-block-size: 6rem;
  padding-block: var(--space-5);
}

.site-footer__identity {
  display: flex;
  align-items: center;
}

.site-footer__monogram {
  position: relative;
  display: block;
  width: 2.5rem;
  height: 2.5rem;
}

.site-footer__monogram img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.site-footer__monogram-light {
  display: none;
}

:global(:root[data-theme='light'] .site-footer__monogram-dark) {
  display: none;
}

:global(:root[data-theme='light'] .site-footer__monogram-light) {
  display: block;
}

.site-footer p {
  margin: 0;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
