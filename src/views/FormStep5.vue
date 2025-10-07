<script setup>
import FormStepBase from '@/components/FormStepBase.vue'
</script>

<template>
  <FormStepBase class="form__step--thank-you" aria-labelledby="form-heading-step5">
    <h2 class="step__heading" id="form-heading-step5">Thank you!</h2>
    <p class="step__description">
      Thanks for confirming your subscription! We hope you have fun using our platform. If you ever
      need support, please feel free to email us at
      <a class="form__link" href="mailto:support@loremgaming.com">support@loremgaming.com</a>.
    </p>
    <img
      class="step__icon"
      src="/images/icon-thank-you.svg"
      alt=""
      role="presentation"
      width="80"
      height="80"
    />
  </FormStepBase>
</template>

<style scoped></style>
