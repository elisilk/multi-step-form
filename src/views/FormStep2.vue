<script setup>
import { computed, ref, provide } from 'vue'

import FormStepBase from '@/components/FormStepBase.vue'
import FormInputRadio from '@/components/FormInputRadio.vue'
import FormInputError from '@/components/FormInputError.vue'
import FormInputSwitch from '@/components/FormInputSwitch.vue'

import { planLevelOptions } from '@/config/multiStepFormConfig'

import { useMultiStepFormStore } from '@/stores/multiStepForm'
const multiStepFormStore = useMultiStepFormStore()

const billingFrequency = computed(() => multiStepFormStore.getBilling)

const itemPrice = (item) => multiStepFormStore.calculateItemPrice(item)

const radioInputErrorMessages = {
  valueMissing: 'This field is required',
}

const isRadioGroupInvalid = ref(false)
const radioGroupErrorMessage = ref('')

provide('radioGroupInvalidated', isRadioGroupInvalid)

function handleRadioInputValidated(invalid, message) {
  isRadioGroupInvalid.value = invalid
  radioGroupErrorMessage.value = message
}
</script>

<template>
  <FormStepBase aria-labelledby="form-heading-step2">
    <template #header>
      <h2 class="step__heading" id="form-heading-step2">Select your plan</h2>
      <p class="step__description">You have the option of monthly or yearly billing.</p>
    </template>

    <template #default>
      <fieldset class="form__fieldset form__fieldset--radiogroup" ref="input-plan-level">
        <legend class="sr-only">Plan levels</legend>

        <FormInputRadio
          v-for="plan in planLevelOptions"
          :key="'input-plan-level-option-' + plan.id"
          :id="'form-input-plan-level-' + plan.id"
          name="planLevel"
          :value="plan.id"
          :required="true"
          :errorMessages="radioInputErrorMessages"
          v-model="multiStepFormStore.plan.level"
          @validated="handleRadioInputValidated"
        >
          <template #label>
            <span class="label__title">{{ plan.name }}</span>
            <span class="label__price"
              >${{ itemPrice(plan) }}/{{ billingFrequency.abbreviation }}</span
            >
            <span v-if="multiStepFormStore.isBillingYearly" class="label__discount"
              >2 months free</span
            >
            <img
              class="label__icon"
              :src="`/multi-step-form/${plan.icon}`"
              alt=""
              role="presentation"
              width="40"
              height="40"
            />
          </template>
        </FormInputRadio>

        <FormInputError v-if="isRadioGroupInvalid" class="input__error--radiogroup">{{
          radioGroupErrorMessage
        }}</FormInputError>
      </fieldset>

      <fieldset class="form__fieldset form__fieldset--switchgroup">
        <legend class="sr-only">Billing frequency</legend>
        <FormInputSwitch v-model="multiStepFormStore.plan.billingFrequency" />
      </fieldset>
    </template>
  </FormStepBase>
</template>

<style scoped>
.form__fieldset--radiogroup {
  display: grid;
}

.form__fieldset--switchgroup {
  border-radius: var(--br-300);
  background-color: var(--input-background-color-selected);
  block-size: 48px;
  display: grid;
  place-content: center;
}

.form__fieldset--radiogroup > .input__container + .input__container {
  margin-block-start: var(--space-100); /* (m) 8px -> (d) 0px */
}

.input__error--radiogroup {
  grid-row: 1;
  grid-column: 1 / -1;
  margin-block-end: var(--space-100);
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .form__fieldset--radiogroup {
    grid-template-columns: repeat(3, 138px);
    justify-content: space-between;
    column-gap: var(--space-200);
  }

  .form__fieldset--radiogroup > .input__container + .input__container {
    margin-block-start: 0; /* (m) 8px -> (d) 0px */
  }
}
</style>
