<script setup>
import { inject, watch } from 'vue'
import { useInputValidation } from '@/composables/inputValidation'

const model = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
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

const { isInvalid, errorMessage, resetErrors, validate } = useInputValidation(
  props.id,
  props.errorMessages,
)

// watch for (and emit) changes in this component

const emit = defineEmits(['validated'])

watch(isInvalid, () => {
  emit('validated', isInvalid.value, errorMessage.value)
})

// watch for (and react to) changes in the parents

const showValidation = inject('showValidation')
const radioGroupInvalidated = inject('radioGroupInvalidated')

watch(showValidation, (newValue) => (newValue ? validate() : resetErrors()))
watch(radioGroupInvalidated, validate)
</script>

<template>
  <div class="input__container input__container--radio">
    <label class="input__label input__label--radio" :for="id">
      <slot name="label">{{ id }}</slot>
    </label>
    <input
      class="input input--radio"
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      :required="required"
      :aria-invalid="isInvalid ? true : null"
      :ref="id"
      v-model="model"
      @input="validate"
      @blur="validate"
    />
  </div>
</template>

<style scoped>
.input__container--radio {
  position: relative;
}

.input--radio {
  cursor: pointer;
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
}

.input__label--radio {
  display: grid;
  grid-template-areas:
    'icon title'
    'icon price'
    'icon discount';
  align-items: center;
  grid-template-columns: auto 1fr;
  padding: var(--space-200);
  column-gap: var(--space-200);
  border: 1px solid var(--input-border-color);
  border-radius: var(--br-300);
}

.input__container--radio:has(:hover) .input__label--radio,
.input__container--radio:has(:focus-visible) .input__label--radio {
  border: 1px solid var(--input-border-color-active);
}

.input__container--radio:has(:focus-visible) .input__label--radio {
  outline: 1px dashed var(--input-border-color-active);
  outline-offset: 2px;
}

.input__container--radio:has(:checked) .input__label--radio {
  border: 1px solid var(--input-border-color-selected);
  background-color: var(--input-background-color-selected);
}

/* .input__container--radio:has(:user-invalid) .input__label--radio { */
.input__container--radio:has([aria-invalid='true']) .input__label--radio {
  border: 1px solid var(--input-border-color-error);
}

/* viewport: mobile -> tablet */
@media (min-width: 26rem) {
  .input__label--radio {
    grid-template-areas:
      'icon title discount'
      'icon price discount';
  }
}

/* viewport: mobile -> tablet */
@media (min-width: 46rem) {
  .input__label--radio {
    grid-template-areas:
      'icon title discount'
      'icon price discount';
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .input__label--radio {
    inline-size: 138px;
    block-size: 160px;
    grid-template-areas:
      'icon'
      'title'
      'price'
      'discount';
    grid-template-columns: auto;
    grid-template-rows: 1fr auto auto auto;
  }
}
</style>
