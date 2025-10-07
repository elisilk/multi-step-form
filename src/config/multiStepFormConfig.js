export const monthsPerYear = 12
export const monthsFreeIfBillYearly = 2

export const formSteps = [
  { id: 1, description: 'Your info', type: 'input' },
  { id: 2, description: 'Select plan', type: 'input' },
  { id: 3, description: 'Add-ons', type: 'input' },
  { id: 4, description: 'Summary', type: 'confirmation' },
  { id: 5, description: 'Thank you', type: 'thank-you', stepperStepId: 4 },
]

// Escape some of the characters in the pattern match
// In particular, only escape a '-' if preceded by a '[' --> so escape '[-s.]' but not '[0-9]'
const escapeRegExp = (str) => str.replace(/[.+s()]|(?<=\[)-/g, '\\$&')

export const formTextInputs = [
  {
    name: 'name',
    type: 'text',
    id: 'form-input-name',
    label: 'Name',
    placeholder: 'e.g. Stephen King',
    autocomplete: 'name',
    required: true,
    errorMessages: {
      badInput: 'Must be a name',
      valueMissing: 'This field is required',
    },
  },
  {
    name: 'email',
    type: 'email',
    id: 'form-input-email',
    label: 'Email Address',
    placeholder: 'e.g. stephenking@lorem.com',
    autocomplete: 'email',
    required: true,
    errorMessages: {
      badInput: 'Enter an email address',
      patternMismatch: 'Must be a valid email address',
      typeMismatch: 'Must be a valid email type',
      valueMissing: 'This field is required',
    },
  },
  {
    name: 'phone',
    type: 'tel',
    id: 'form-input-phone',
    label: 'Phone Number',
    placeholder: 'e.g. +1 234 567 8901',
    autocomplete: 'tel',
    required: true,
    pattern: escapeRegExp('[+]?[0-9]?[-s.]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4}'),
    errorMessages: {
      badInput: 'Enter a phone number',
      patternMismatch: 'Must be a valid phone number',
      typeMismatch: 'Must be a valid phone number type',
      valueMissing: 'This field is required',
    },
  },
]

export const billingFrequencyOptions = [
  {
    id: 'monthly',
    name: 'Monthly',
    abbreviation: 'mo',
    description: 'per month',
    monthsFreePerYear: 0,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    abbreviation: 'yr',
    description: 'per year',
    monthsFreePerYear: monthsFreeIfBillYearly,
  },
]

export const planLevelOptions = [
  { id: 'arcade', name: 'Arcade', pricePerMonth: 9, icon: 'images/icon-arcade.svg' },
  { id: 'advanced', name: 'Advanced', pricePerMonth: 12, icon: 'images/icon-advanced.svg' },
  { id: 'pro', name: 'Pro', pricePerMonth: 15, icon: 'images/icon-pro.svg' },
]

export const addOnOptions = [
  {
    name: 'onlineService',
    label: 'Online service',
    description: 'Access to multiplayer games',
    pricePerMonth: 1,
  },
  {
    name: 'largerStorage',
    label: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    pricePerMonth: 2,
  },
  {
    name: 'customizableProfile',
    label: 'Customizable profile',
    description: 'Custom theme on your profile',
    pricePerMonth: 2,
  },
]

export const defaultAddOnSelections = addOnOptions.reduce((acc, curr) => {
  acc[curr.name] = false
  return acc
}, {})
