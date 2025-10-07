<script setup>
import { computed } from 'vue'

import FormStepBase from '@/components/FormStepBase.vue'

import { addOnOptions } from '@/config/multiStepFormConfig'

import { useMultiStepFormStore } from '@/stores/multiStepForm'
const multiStepFormStore = useMultiStepFormStore()

const billingFrequency = computed(() => multiStepFormStore.getBilling)

const itemPrice = (item) => multiStepFormStore.calculateItemPrice(item)
</script>

<template>
  <FormStepBase aria-labelledby="form-heading-step3">
    <template #header>
      <h2 class="step__heading" id="form-heading-step3">Pick add-ons</h2>
      <p class="step__description">Add-ons help enhance your gaming experience.</p>
    </template>

    <template #default>
      <fieldset class="form__fieldset form__fieldset--checkboxgroup">
        <legend class="sr-only">Add-ons</legend>

        <div
          v-for="addOn in addOnOptions"
          :key="'input-add-on-option-' + addOn.name"
          class="input__container input__container--checkbox"
        >
          <label
            class="input__label input__label--checkbox"
            :for="'form-input-add-on-' + addOn.name"
          >
            <span class="label__title">{{ addOn.label }}</span>
            <span class="label__details">{{ addOn.description }}</span>
            <span class="label__price"
              >+${{ itemPrice(addOn) }}/{{ billingFrequency.abbreviation }}</span
            >
            <span class="label__checkbox">
              <svg
                class="label__checkbox-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 9"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path fill="none" stroke-width="2" d="m1 4 3.433 3.433L10.866 1" />
              </svg>
            </span>
          </label>
          <input
            class="input input--checkbox"
            type="checkbox"
            :name="addOn.name"
            :id="'form-input-add-on-' + addOn.name"
            v-model="multiStepFormStore.addOns[addOn.name]"
          />
        </div>
      </fieldset>
    </template>
  </FormStepBase>
</template>

<style scoped>
.form__fieldset--checkboxgroup > .input__container + .input__container {
  margin-block-start: var(--space-100); /* (m) 8px -> (t) 16px */
}

.input__container--checkbox {
  position: relative;
}

.input--checkbox {
  cursor: pointer;
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  outline: none;
}

.input__label--checkbox {
  cursor: pointer;
  display: grid;
  grid-template-areas:
    'checkbox title price'
    'checkbox details price';
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: var(--space-200);
  column-gap: var(--space-200);
  border: 1px solid var(--input-border-color);
  border-radius: var(--br-300);
}

.input__container--checkbox:has(:hover) .input__label--checkbox,
.input__container--checkbox:has(:focus-visible) .input__label--checkbox {
  border: 1px solid var(--input-border-color-active);
}

.input__container--checkbox:has(:focus-visible) .input__label--checkbox {
  outline: 1px dashed var(--input-border-color-active);
  outline-offset: 2px;
}

.label__details {
  grid-area: details;
}

.input__label--checkbox .label__title {
  font-size: var(--fs-300);
  font-weight: var(--fw-medium);
  line-height: var(--lh-400);
}

.input__label--checkbox .label__details {
  color: var(--input-text-sublabel);
  font-size: var(--fs-200);
  line-height: var(--lh-300);
}

.input__label--checkbox .label__price {
  color: var(--checkbox-text-color-price);
  font-size: var(--fs-200);
  line-height: var(--lh-300);
}

.label__checkbox {
  grid-area: checkbox;
  aspect-ratio: 1 / 1;
  inline-size: 1.25rem;
  padding: 3px;
  color: var(--checkbox-color);
  background-color: var(--checkbox-background-color);
  border-radius: var(--br-200);
  border: 1px solid var(--checkbox-color);
  display: grid;
  place-content: center;
}

.label__checkbox-icon {
  display: none;
  inline-size: 100%;
  block-size: auto;
}

.input__container--checkbox:has(:checked) .input__label--checkbox {
  background-color: var(--input-background-color-selected);
}

.input__container--checkbox:has(:checked) .label__checkbox {
  color: var(--checkbox-color-selected);
  background-color: var(--checkbox-background-color-selected);
  border: 1px solid var(--checkbox-background-color-selected);
}

.input__container--checkbox:has(:checked) .label__checkbox-icon {
  display: block;
}
</style>
