<script setup>
import { ref } from 'vue'

import FormStepBase from '@/components/FormStepBase.vue'
import FormInputText from '@/components/FormInputText.vue'

import { formTextInputs } from '@/config/multiStepFormConfig'

import { useMultiStepFormStore } from '@/stores/multiStepForm'
const multiStepFormStore = useMultiStepFormStore()

const formTextInputRefs = ref([...formTextInputs])
</script>

<template>
  <FormStepBase aria-labelledby="form-heading-step1">
    <template #header>
      <h2 class="step__heading" id="form-heading-step1">Personal info</h2>
      <p class="step__description">Please provide your name, email address, and phone number.</p>
    </template>

    <template #default>
      <fieldset class="form__fieldset form__fieldset--textgroup">
        <legend class="sr-only">Personal information</legend>

        <FormInputText
          v-for="input in formTextInputRefs"
          :key="input.id"
          :type="input.type"
          :id="input.id"
          :name="input.name"
          :label="input.label"
          :placeholder="input.placeholder"
          :autocomplete="input.autocomplete"
          :required="input.required"
          :pattern="input.pattern"
          :errorMessages="input.errorMessages"
          v-model="multiStepFormStore.info[input.name]"
        />
      </fieldset>
    </template>
  </FormStepBase>
</template>

<style scoped></style>
