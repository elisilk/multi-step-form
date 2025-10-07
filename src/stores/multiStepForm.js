import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  monthsPerYear,
  formSteps,
  billingFrequencyOptions,
  planLevelOptions,
  addOnOptions,
  defaultAddOnSelections,
} from '@/config/multiStepFormConfig'

export const useMultiStepFormStore = defineStore('multiStepForm', () => {
  // state properties

  const info = ref({
    name: null,
    email: null,
    phone: null,
  })

  const plan = ref({
    level: null,
    billingFrequency: 'monthly',
  })

  const addOns = ref({ ...defaultAddOnSelections })

  const currentStepNumber = ref(1)

  const inputNamesByStep = ref([
    ['name', 'email', 'phone'],
    ['planLevel', 'billingFrequency'],
    ['onlineService', 'largerStorage', 'customizableProfile'],
  ])

  // getters

  const getStep = computed(() => formSteps.find((step) => step.id === currentStepNumber.value))

  const getDisplayStep = computed(() =>
    getStep.value.stepperStepId ? getStep.value.stepperStepId : getStep.value.id,
  )

  const minStepId = computed(() =>
    formSteps.reduce((prevMin, currEl) => (currEl.id < prevMin ? currEl.id : prevMin), Infinity),
  )

  const maxStepId = computed(() =>
    formSteps.reduce((prevMax, currEl) => (currEl.id > prevMax ? currEl.id : prevMax), -Infinity),
  )

  const isFirstStep = computed(() => currentStepNumber.value === minStepId.value)

  const isLastStep = computed(() => currentStepNumber.value === maxStepId.value)

  const isConfirmationStep = computed(() => getStep.value.type === 'confirmation')

  const isThankYouStep = computed(() => getStep.value.type === 'thank-you')

  const getBilling = computed(() =>
    billingFrequencyOptions.find((option) => option.id === plan.value.billingFrequency),
  )

  const getPlan = computed(() => planLevelOptions.find((option) => option.id === plan.value.level))

  const getAddOns = computed(() => addOnOptions.filter((option) => addOns.value[option.name]))

  const isBillingYearly = computed(() => plan.value.billingFrequency === 'yearly')

  const areTotalsCalculable = computed(
    () => getBilling.value !== undefined && getPlan.value !== undefined,
  )

  const calculateItemPrice = computed(
    () => (item) =>
      plan.value.billingFrequency === 'monthly'
        ? item.pricePerMonth
        : (monthsPerYear - getBilling.value.monthsFreePerYear) * item.pricePerMonth,
  )

  const calculateTotalPrice = computed(() => {
    // if no billing or plan yet selected, then return null
    if (!areTotalsCalculable.value) return null

    // add in plan costs
    let runningTotal = calculateItemPrice.value(getPlan.value)

    // add in add-on costs
    getAddOns.value.forEach((addOn) => (runningTotal += calculateItemPrice.value(addOn)))

    // return the total price
    return runningTotal
  })

  return {
    // state properties
    info,
    plan,
    addOns,
    currentStepNumber,
    inputNamesByStep,

    // getters
    getStep,
    getDisplayStep,
    isFirstStep,
    isLastStep,
    isConfirmationStep,
    isThankYouStep,
    getBilling,
    getPlan,
    getAddOns,
    isBillingYearly,
    areTotalsCalculable,
    calculateItemPrice,
    calculateTotalPrice,

    // actions
  }
})
