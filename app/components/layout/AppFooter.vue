<template>
  <footer class="site-footer">
    <div class="site-footer__layout layout-container">
      <div class="site-footer__identity">
        <span
          class="site-footer__monogram"
          data-footer-monogram
          aria-hidden="true"
        >
          LB
        </span>
        <span data-footer-name>Leonardo Blauth</span>
      </div>
      <p data-footer-copyright>© 2026</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-block-start: 1px solid var(--color-border);
}

.site-footer__layout {
  display: flex;
  gap: var(--space-8);
  align-items: center;
  justify-content: space-between;
  min-block-size: 8rem;
  padding-block: var(--space-8);
}

.site-footer__identity {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  font-weight: var(--font-weight-semibold);
}

.site-footer__monogram {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.04em;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
}

.site-footer p {
  margin: 0;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 32rem) {
  .site-footer__layout {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--space-5);
  }
}
</style>
