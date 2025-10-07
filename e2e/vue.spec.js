import { test, expect } from '@playwright/test'

test.describe('Step 1 - Initial state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('The app root url loads', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Multi-step form')
    await expect(page.locator("h2[class='step__heading']")).toHaveText('Personal info')
  })

  test('Should have 3 text inputs', async ({ page }) => {
    await expect(page.getByRole('textbox')).toHaveCount(3)
  })

  test('The text inputs should be empty and focusable', async ({ page }) => {
    for (const input of await page.getByRole('textbox').all()) {
      await expect(input).toBeEmpty()
      await input.click()
      await expect(input).toBeFocused()
    }
  })
})

test.describe('Step 1 - Error state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator("input[aria-invalid='true']")).toHaveCount(0)
    await page.fill('input[name="name"]', '')
    await page.fill('input[name="email"]', 'user@')
    await page.fill('input[name="phone"]', '123')
    await page.getByRole('button', { name: 'Next Step' }).click()
  })

  test('The text inputs should each be labeled invalid', async ({ page }) => {
    await expect(page.locator("input[aria-invalid='true']")).toHaveCount(3)
  })
})

test.describe('Step 1 - Success state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator("input[aria-invalid='true']")).toHaveCount(0)
    await page.fill('input[name="name"]', 'User Test')
    await page.fill('input[name="email"]', 'user@email.com')
    await page.fill('input[name="phone"]', '123-456-7890')
  })

  test('The text inputs should all be labeled valid', async ({ page }) => {
    await expect(page.locator("input[aria-invalid='true']")).toHaveCount(0)
  })

  test('The text inputs should submit successfully and move to the next step in the form', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Next Step' }).click()
    await expect(page.locator("h2[class='step__heading']")).toHaveText('Select your plan')
  })
})
