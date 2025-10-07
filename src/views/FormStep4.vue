<script setup>
import { computed } from 'vue'

import FormStepBase from '@/components/FormStepBase.vue'

import { useMultiStepFormStore } from '@/stores/multiStepForm'
const multiStepFormStore = useMultiStepFormStore()

const billingFrequency = computed(() => multiStepFormStore.getBilling)

const itemPrice = (item) => multiStepFormStore.calculateItemPrice(item)

const emit = defineEmits(['changePlan'])
</script>

<template>
  <FormStepBase aria-labelledby="form-heading-step4">
    <template #header>
      <h2 class="step__heading" id="form-heading-step4">Finishing up</h2>
      <p class="step__description">Double-check everything looks OK before confirming.</p>
    </template>

    <template #default v-if="multiStepFormStore.areTotalsCalculable">
      <fieldset class="form__fieldset form__fieldset--summary-itemized">
        <div class="output__container output__container--plan">
          <label class="output__label output__label--plan" for="form-output-plan">
            <span>{{ multiStepFormStore.getPlan.name }} ({{ billingFrequency.name }})</span>
            <button class="button button--change" type="button" @click="emit('changePlan')">
              Change
            </button>
          </label>
          <output class="output output--plan" name="form-output-plan" id="form-output-plan"
            >${{ itemPrice(multiStepFormStore.getPlan) }}/{{
              billingFrequency.abbreviation
            }}</output
          >
        </div>

        <div
          v-for="addOn in multiStepFormStore.getAddOns"
          :key="'output-add-on-option-' + addOn.name"
          class="output__container output__container--add-on"
        >
          <label
            class="output__label output__label--add-on"
            :for="'form-output-add-on-' + addOn.name"
            >{{ addOn.label }}</label
          >
          <output
            class="output output--add-on"
            :name="'form-output-add-on-' + addOn.name"
            :id="'form-output-add-on-' + addOn.name"
            >+${{ itemPrice(addOn) }}/{{ billingFrequency.abbreviation }}</output
          >
        </div>
      </fieldset>

      <fieldset class="form__fieldset form__fieldset--summary-total">
        <div class="output__container">
          <label class="output__label output__label--total" for="form-output-total"
            >Total ({{ billingFrequency.description }})</label
          >
          <output class="output output--total" name="form-output-total" id="form-output-total"
            >+${{ multiStepFormStore.calculateTotalPrice }}/{{
              billingFrequency.abbreviation
            }}</output
          >
        </div>
      </fieldset>
    </template>

    <template #default v-else>
      <output
        id="form-output-not-yet-valid"
        name="form-output-not-yet-valid"
        for="form-input-plan-level-arcade
          form-input-plan-level-advanced
          form-input-plan-level-pro form-input-billing-frequency-monthly form-input-billing-frequency-yearly"
        >Your total will be calculated after you choose a plan.</output
      >
    </template>
  </FormStepBase>
</template>

<style scoped></style>
