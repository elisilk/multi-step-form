<script setup></script>

<template>
  <span class="input__error" aria-live="polite">
    <slot />
  </span>
</template>

<style scoped>
.input__error {
  grid-area: error;
  justify-self: end;
  color: var(--input-text-error);
  font-size: var(--fs-200); /* (m) 12px -> (t) 14px */
  font-weight: var(--fw-bold);
  line-height: var(--lh-300);
  letter-spacing: var(--ls-500);
}

/* viewport: mobile -> tablet */
@media (min-width: 46rem) {
  .input__error {
    font-size: var(--fs-300); /* (m) 12px -> (t) 14px */
  }
}
</style>
