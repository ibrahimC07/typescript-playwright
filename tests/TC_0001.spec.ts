import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test.describe('Blog', () => {
    test('login page', async ({ loginPage, page }) => {
    
      await loginPage.navigate();
      await loginPage.login();
      await expect(page).toHaveURL(/.*dashboard/)
      
    })
})
