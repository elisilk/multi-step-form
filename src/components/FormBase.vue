<script setup>
import { ref, useTemplateRef, provide } from 'vue'

import FormHeader from '@/components/FormHeader.vue'
import FormFooter from '@/components/FormFooter.vue'

import { useRouter } from 'vue-router'
import { useMultiStepFormStore } from '@/stores/multiStepForm'

const router = useRouter()
const multiStepFormStore = useMultiStepFormStore()
const form = useTemplateRef('form')

const showValidation = ref(false)
provide('showValidation', showValidation)

function setRouterToCurrentStepNumber() {
  router.replace('/' + multiStepFormStore.currentStepNumber)
}

// event handler for a submit event
function handleFormSubmit() {
  // console.log('form submitted')

  // check if on the confirmation step
  if (!multiStepFormStore.isConfirmationStep) return false

  // check if the entire form is valid
  if (form.value.checkValidity() === false) {
    console.log('Form Base (invalid) --> submit cancelled')
    return false
  }

  // if all true, then submit the data to the server
  console.log('Form Base --> form complete & submitted!')

  // and then advance to the next step (the thank you step)
  multiStepFormStore.currentStepNumber++
  setRouterToCurrentStepNumber()
}

// event handler for a submit event
function handleFormChangePlan() {
  console.log('Form Base --> change plan executing')

  multiStepFormStore.currentStepNumber = 2
  setRouterToCurrentStepNumber()
}

// event handler for a previous step event
const handleFormPreviousStep = () => {
  // if first step, then do nothing
  if (multiStepFormStore.isFirstStep) return

  // else, go back to the previous step
  console.log('Form Base --> previous step executing')
  multiStepFormStore.currentStepNumber--
  setRouterToCurrentStepNumber()
}

// event handler for a next step event
const handleFormNextStep = () => {
  // if already at the last step, then do nothing
  if (multiStepFormStore.isLastStep) return false

  // validate current step
  showValidation.value = true

  // if form (or current step?) is currently invalid, then cancel the move to next step request
  if (form.value.checkValidity() === false) {
    console.log('Form Base (invalid) --> next step cancelled')

    // reset the focus to the first invalid input
    form.value.querySelector('input:user-invalid')?.focus()

    return false
  }

  // else, advance to the next step
  console.log('Form Base (valid) --> next step executing')
  showValidation.value = false
  multiStepFormStore.currentStepNumber++
  setRouterToCurrentStepNumber()
}
</script>

<template>
  <form class="app__form" id="app__form" novalidate @submit.prevent="handleFormSubmit" ref="form">
    <div class="form__container">
      <FormHeader class="form__header" />

      <main class="form__main" aria-label="Multi-Step Form">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" @change-plan="handleFormChangePlan" />
          </transition>
        </router-view>
      </main>

      <FormFooter
        class="form__footer"
        @previous-step="handleFormPreviousStep"
        @next-step="handleFormNextStep"
        @submit="handleFormSubmit"
      />
    </div>
  </form>
</template>

<style scoped>
.form__container {
  min-block-size: 100dvh;
  display: grid;
  grid-template-rows:
    auto calc(var(--main-block-size-overlap) + var(--main-block-size-gap))
    auto 1fr;
  grid-template-areas:
    'header'
    'main'
    'main'
    'footer';
}

.form__header {
  grid-area: header;
  grid-row: 1 / span 2;
}

.form__main {
  grid-area: main;
  margin-block-start: var(--main-block-size-gap);
  margin-inline: var(--space-200);
}

.form__footer {
  grid-area: footer;
  align-self: end;
  margin-block-start: var(--main-block-size-gap);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* viewport: mobile -> tablet */
@media (min-width: 46rem) {
  .app__form {
    min-block-size: 100dvh;
    padding-block: var(--main-inline-size-gutter);
    inline-size: min(var(--main-inline-size-max), 100% - 2 * var(--main-inline-size-gutter));
    margin-inline: auto;
    display: grid;
    align-content: center;
  }

  .form__container {
    min-block-size: 600px;
    grid-template-areas:
      'header main'
      'header footer';
    grid-template-rows: 1fr auto;
    grid-template-columns: var(--form-col1-inline-size) var(--form-col2-inline-size);
    padding-inline-end: var(--form-padding-inline-end);
    justify-content: space-between;

    background-color: var(--form-color-background);
    border-radius: var(--br-500);
    box-shadow: var(--shadow1);
  }

  .form__header {
    margin: var(--space-200);
  }

  .form__main {
    margin-block-start: var(--form-padding-block-start);
    margin-inline: 0;
  }

  .form__footer {
    margin-block-end: var(--form-padding-block-end);
  }
}
</style>
