<script setup>
const model = defineModel()
</script>
<template>
  <div class="input__container input__container--switch radio-switch">
    <input
      class="input input--switch"
      type="radio"
      name="billingFrequency"
      id="form-input-billing-frequency-monthly"
      value="monthly"
      required
      v-model="model"
    />
    <label class="input__label input__label--switch" for="form-input-billing-frequency-monthly"
      >Monthly</label
    >

    <input
      class="input input--switch"
      type="radio"
      name="billingFrequency"
      id="form-input-billing-frequency-yearly"
      value="yearly"
      required
      v-model="model"
    />
    <label class="input__label input__label--switch" for="form-input-billing-frequency-yearly"
      >Yearly</label
    >
  </div>
</template>

<style scoped>
.input__container--switch {
  position: relative;
  display: inline-block;
}

.input__label--switch {
  color: var(--input-text-sublabel);
  font-size: var(--fs-300);
  font-weight: var(--fw-medium);
  line-height: var(--lh-400);
}

/* switch parameters (custom properties) */

.radio-switch {
  --switch-bkg-clr: var(--switch-background-color);
  --switch-bkg-clr-active: var(--switch-background-color-active);
  --switch-bkg-size-inline: 38px;
  --switch-bkg-size-block: 20px;
  --switch-bkg-border-radius: var(--br-400);
  --switch-bkg-padding-inline: 4px;
  --switch-toggle-size: 12px;
  --switch-toggle-clr: var(--switch-toggle-color);
  --switch-margin-inline: var(--space-300); /* 24px */
  --switch-total-size-inline: calc(var(--switch-bkg-size-inline) + 2 * var(--switch-margin-inline));
}

.radio-switch input:checked + label {
  color: var(--input-text-label);
}

.radio-switch input:not(:checked):hover + label {
  /* text-decoration: underline; */
  color: var(--input-text-label);
}

.radio-switch label {
  display: inline-block;
  position: relative;
  z-index: 2;
}

.radio-switch input {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: none;
  margin: 0;
  height: 100%;
  opacity: 0.00001;
  position: absolute;
  top: 0;
  width: 30%;
  z-index: 3;
}

.radio-switch input:not(:checked) {
  cursor: pointer;
}

.radio-switch input:first-of-type {
  left: 0;
}

.radio-switch input:last-of-type {
  right: 0;
}

.radio-switch label:first-of-type {
  padding-inline-end: var(--switch-total-size-inline);
}

.radio-switch label:last-child {
  margin-left: calc(-1 * var(--switch-total-size-inline));
  padding-inline-start: var(--switch-total-size-inline);
}

/* the larger toggle background for the switch UI */
.radio-switch label:first-of-type:after {
  content: '';
  overflow: hidden;
  pointer-events: none;

  block-size: var(--switch-bkg-size-block);
  inline-size: var(--switch-bkg-size-inline);
  border-radius: var(--switch-bkg-border-radius);
  background: var(--switch-bkg-clr);

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  margin: 0 var(--switch-margin-inline);
  transition: background 0.2s ease-in-out;
}

.radio-switch:hover label:first-of-type:after {
  background: var(--switch-bkg-clr-active);
}

.radio-switch:focus-within label:first-of-type:after {
  background: var(--switch-bkg-clr-active);
  outline: 1px dashed var(--switch-bkg-clr-active);
  outline-offset: 2px;
  /* box-shadow:
    0 0 0 2px var(--switch-toggle-clr),
    0 0 0 4px var(--switch-bkg-clr); */
}

/* the small toggle circle inside the switch UI */
.radio-switch label:first-of-type:before {
  content: '';
  overflow: hidden;
  pointer-events: none;
  position: absolute;

  block-size: var(--switch-toggle-size);
  inline-size: var(--switch-toggle-size);
  border-radius: 100%;
  background: var(--switch-toggle-clr);

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: calc(var(--switch-margin-inline) + var(--switch-bkg-padding-inline));

  transition: right 0.2s ease-in-out;
  z-index: 2;
}

.radio-switch input:first-of-type:checked ~ label:first-of-type:before {
  right: calc(
    var(--switch-margin-inline) + var(--switch-bkg-size-inline) - var(--switch-toggle-size) -
      var(--switch-bkg-padding-inline)
  );
}

.radio-switch input:last-of-type:checked ~ label:last-of-type {
  z-index: 1;
}
</style>
