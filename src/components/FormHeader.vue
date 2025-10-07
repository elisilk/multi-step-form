<script setup>
import { computed } from 'vue'

import { formSteps } from '@/config/multiStepFormConfig'

import { useMultiStepFormStore } from '@/stores/multiStepForm'
const multiStepFormStore = useMultiStepFormStore()

const stepperSteps = computed(() =>
  formSteps.filter((step) => step.stepperStepId === undefined || step.id === step.stepperStepId),
)
</script>

<template>
  <header class="form__header">
    <h1 class="sr-only">Multi-step form</h1>

    <!-- Sidebar start -->
    <nav class="form__nav" aria-labelledby="nav-heading">
      <h2 class="sr-only" id="nav-heading">Form steps</h2>

      <menu class="form__stepper" aria-label="Form steps">
        <li
          v-for="step in stepperSteps"
          :key="'step-' + step.id"
          class="stepper__item"
          :class="{ current: step.id === multiStepFormStore.getDisplayStep }"
          :data-step="step.id"
        >
          <span class="stepper__item-label">Step {{ step.id }}</span>
          <span class="stepper__item-description">{{ step.description }}</span>
        </li>
      </menu>
    </nav>
    <!-- Sidebar end -->
  </header>
</template>

<style scoped>
.form__header {
  padding-block-start: var(--main-block-size-gap);
  padding-block-end: calc(var(--main-block-size-overlap) + var(--main-block-size-gap));
  background-image: url('/images/bg-sidebar-mobile.svg');
  background-size: cover;
}

.form__stepper {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  list-style-type: none;
  gap: var(--space-200);
}

.stepper__item {
  color: var(--stepper-text-color);
  font-size: var(--fs-300);
  font-weight: var(--fw-bold);
  line-height: var(--lh-300);
  letter-spacing: var(--ls-500);
  text-transform: uppercase;
}

.stepper__item::before {
  content: attr(data-step);
  block-size: 33px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid currentColor;
}

.stepper__item.current::before {
  color: var(--stepper-text-color-current);
  background-color: var(--stepper-background-color-current);
  border: 1px solid var(--stepper-background-color-current);
}

.stepper__item-label,
.stepper__item-description {
  display: none;
}

.stepper__item-label {
  color: var(--stepper-text-color-accent);
  font-size: var(--fs-200);
  font-weight: var(--fw-regular);
  line-height: var(--lh-300);
  letter-spacing: var(--ls-400);
}

/* viewport: mobile -> tablet */
@media (min-width: 46rem) {
  .form__header {
    padding: var(--space-500) var(--space-300);
    border-radius: var(--br-500);
    background-color: var(--header-color-background);
    background-image: url('/images/bg-sidebar-desktop.svg');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: bottom;
  }

  .form__stepper {
    display: grid;
    row-gap: var(--space-400);
    justify-content: start;
  }

  .stepper__item {
    display: grid;
    grid-template-columns: 33px auto;
    grid-template-rows: repeat(2, auto);
    column-gap: var(--space-200);
  }

  .stepper__item::before {
    grid-row: 1 / -1;
  }

  .stepper__item-label,
  .stepper__item-description {
    display: block;
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .form__header {
    padding-inline: var(--space-400);
  }
}
</style>
