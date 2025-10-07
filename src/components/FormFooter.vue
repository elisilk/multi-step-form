<script setup>
import { useMultiStepFormStore } from '@/stores/multiStepForm'
const multiStepFormStore = useMultiStepFormStore()

const emit = defineEmits(['previousStep', 'nextStep', 'submit'])
</script>

<template>
  <footer v-if="!multiStepFormStore.isThankYouStep" class="form__footer">
    <button
      v-if="!multiStepFormStore.isConfirmationStep"
      class="button button--next"
      type="submit"
      @click="emit('nextStep')"
    >
      Next Step
    </button>

    <button
      v-else
      class="button button--confirm button--highlight"
      type="submit"
      @click="emit('submit')"
    >
      Confirm
    </button>

    <button
      v-if="!multiStepFormStore.isFirstStep"
      class="button button--previous button--inverted"
      type="button"
      @click="emit('previousStep')"
    >
      Go Back
    </button>
  </footer>
</template>

<style scoped>
.form__footer {
  padding: var(--space-200);
  background-color: var(--form-color-background);

  display: grid;
  grid-template-areas: 'previous next';
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
}

.button {
  border-radius: var(--br-200);
  block-size: var(--space-500); /* (m) 40px -> (t) 48px */
  min-inline-size: 97px; /* (m) 97px -> (t) 123px */
  padding-inline: var(--space-200);
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  font-size: var(--fs-300);
  font-weight: var(--fw-medium);
  line-height: var(--lh-400);
}

.button--previous {
  grid-area: previous;
}

.button--next,
.button--confirm {
  grid-area: next;
}

.button:hover,
.button:focus-visible {
  background-color: var(--button-background-color-active);
}

.button:focus-visible {
  outline: 1px dashed var(--button-background-color-active);
  outline-offset: 2px;
}

.button--highlight {
  background-color: var(--button-background-color-highlight);
}

.button--highlight:hover,
.button--highlight:focus-visible {
  background-color: var(--button-background-color-highlight-active);
}

.button--highlight:focus-visible {
  outline: 1px dashed var(--button-background-color-highlight-active);
  outline-offset: 2px;
}

.button--inverted {
  background-color: transparent;
  color: var(--button-text-color-inverted);
  font-size: var(--fs-400);
  line-height: var(--lh-300);
}

.button--inverted:hover,
.button--inverted:focus-visible {
  background-color: transparent;
  color: var(--button-text-color-inverted-active);
}

/* viewport: mobile -> tablet */
@media (min-width: 46rem) {
  .form__footer {
    background-color: transparent;
    padding: 0;
  }

  .button {
    border-radius: var(--br-300);
    block-size: var(--space-600); /* (m) 40px -> (t) 48px */
    min-inline-size: 123px; /* (m) 97px -> (t) 123px */
    font-size: var(--fs-400);
  }
}
</style>
