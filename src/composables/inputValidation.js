import { useTemplateRef, ref, computed, toValue } from 'vue'

export function useInputValidation(inputRefId, errors) {
  const thisInput = useTemplateRef(toValue(inputRefId))
  const errorMessages = toValue(errors)

  // A dummy reactive value to trigger the reevaluation of computed properties
  const updated = ref(0)

  // flag if the input has been interacted with yet
  const dirty = ref(false)

  // currently evaluated errors on the input
  const error = ref(null)

  // reactive function to return a particular input's current error message
  const errorMessage = computed(() => errorMessages[error.value])

  // reactive function to check if this input is currently invalid
  const isInvalid = computed(
    () => !!thisInput.value && !!updated.value && dirty.value && !thisInput.value.validity.valid,
  )

  const isValid = computed(() => !isInvalid.value)

  function identifyError() {
    if (!thisInput.value || !thisInput.value.validity) return

    if (thisInput.value.validity.valid) return null

    // special case where can be both 'badInput' and 'valueMissing', so choosing to return 'badInput' first
    if (thisInput.value.validity.badInput) return 'badInput'

    for (const key in thisInput.value.validity) if (thisInput.value.validity[key]) return key

    return 'unknown'
  }

  // remove any existing errors
  function resetErrors() {
    error.value = null
  }

  // check if input is valid and then add/delete that input's error messages to the global list of currently evaluated errors
  function validate() {
    // if not yet mounted
    if (!thisInput.value || !thisInput.value.validity) return

    // update dummy trigger so that computed properties are also updated
    updated.value++

    // input now interacted with
    dirty.value = true

    isValid.value
      ? resetErrors() // input is valid, so clear error
      : (error.value = identifyError()) // input not valid, so save the error type
  }

  return {
    isValid,
    isInvalid,
    errorMessage,
    resetErrors,
    validate,
  }
}
