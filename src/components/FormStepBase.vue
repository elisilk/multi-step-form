<script setup>
import { useTemplateRef, onMounted } from 'vue'

const stepSection = useTemplateRef('step-section')

onMounted(() => {
  stepSection.value.focus()
})
</script>

<template>
  <section class="form__step" ref="step-section" tabindex="-1">
    <header v-if="$slots.header" class="step__header">
      <slot name="header"></slot>
    </header>

    <div class="step__main">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.form__step {
  outline: 0;
}
</style>
