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

<style scoped></style>
