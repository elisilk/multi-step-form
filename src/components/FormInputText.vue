<script setup>
import { inject, watch } from 'vue'
import FormInputError from '@/components/FormInputError.vue'
import { useInputValidation } from '@/composables/inputValidation'

const model = defineModel()

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  pattern: {
    type: String,
  },
  autocomplete: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Object,
  },
})

// Input validation

const showValidation = inject('showValidation')

const { isInvalid, errorMessage, resetErrors, validate } = useInputValidation(
  props.id,
  props.errorMessages,
)

// watch for changes in the show validation prop
watch(showValidation, (newValue) => (newValue ? validate() : resetErrors()))
</script>

<template>
  <div class="input__container input__container--text">
    <label class="input__label input__label--text" :for="id">{{ label }}</label>
    <input
      class="input input--text"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :pattern="pattern"
      :autocomplete="autocomplete"
      :required="required"
      :aria-invalid="isInvalid ? true : null"
      :aria-errormessage="isInvalid ? id + '-error' : null"
      :ref="id"
      v-model="model"
      @blur="validate"
      @change="validate"
    />
    <FormInputError v-if="isInvalid">{{ errorMessage }}</FormInputError>
  </div>
</template>

<style scoped>
.input__container--text {
  display: grid;
  grid-template-areas:
    'label error'
    'input input';
  gap: var(--space-100);
}

.input__label {
  grid-area: label;
}

.input__label--text {
  display: block;
  color: var(--input-text-label);
  font-size: var(--fs-200); /* (m) 12px -> (t) 14px */
  line-height: var(--lh-300);
}

.input--text {
  grid-area: input;
  display: block;
  block-size: var(--space-500); /* (m) 40px -> (t) 48px */
  inline-size: 100%;
  padding-block: 0;
  padding-inline: var(--space-200);
  border-radius: var(--br-200);
  border: 1px solid var(--input-border-color);
  outline: 0;

  color: var(--input-text);
  font-size: var(--fs-300); /* (m) 14px -> (t) 16px */
  font-weight: var(--fw-medium);
  line-height: var(--lh-400);
}

.input--text::placeholder {
  color: var(--input-text-placeholder);
}

.input--text:hover,
.input--text:focus-visible {
  border: 1px solid var(--input-border-color-active);
}

.input--text:focus-visible {
  outline: 1px dashed var(--input-border-color-active);
  outline-offset: 2px;
}

.input--text[aria-invalid='true']:not(:focus):not(:hover),
.input--text:not(:placeholder-shown):not(:focus):user-invalid {
  border: 1px solid var(--input-border-color-error);
}

/* viewport: mobile -> tablet */
@media (min-width: 46rem) {
  .input__label {
    font-size: var(--fs-300); /* (m) 12px -> (t) 14px */
  }

  .input--text {
    block-size: var(--space-600); /* (m) 40px -> (t) 48px */
    font-size: var(--fs-400); /* (m) 14px -> (t) 16px */
    line-height: var(--lh-300);
  }
}
</style>
