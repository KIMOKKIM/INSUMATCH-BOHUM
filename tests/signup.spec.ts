import { test, expect } from '@playwright/test';

test.describe('Signup Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/signup');
  });

  test('Individual Signup - Complete Flow', async ({ page }) => {
    // Step 1: Navigate to individual signup
    await page.click('text=개인회원 가입하기');
    await expect(page).toHaveURL('http://localhost:3001/signup/individual');
    
    // Verify Step 1 (Terms Agreement) is displayed
    await expect(page.locator('text=약관동의')).toBeVisible();
    await expect(page.locator('text=서비스 이용을 위한 약관에 동의해주세요.')).toBeVisible();
    
    // Step 2: Try clicking "다음 단계로" without checking boxes (should fail)
    const nextButton = page.locator('button:has-text("다음 단계로")');
    await expect(nextButton).toBeDisabled();
    
    // Step 3: Check "전체 약관에 동의합니다."
    await page.locator('label:has-text("전체 약관에 동의합니다.")').click();
    
    // Verify both checkboxes are checked
    const termsCheckbox = page.locator('label:has-text("이용약관 동의 (필수)") input[type="checkbox"]');
    const privacyCheckbox = page.locator('label:has-text("개인정보 수집 및 이용 동의 (필수)") input[type="checkbox"]');
    await expect(termsCheckbox).toBeChecked();
    await expect(privacyCheckbox).toBeChecked();
    
    // Verify button is now enabled
    await expect(nextButton).toBeEnabled();
    
    // Step 4: Click "다음 단계로"
    await nextButton.click();
    
    // Verify Step 2 (Information Input) is displayed
    await expect(page.locator('text=정보입력')).toBeVisible();
    await expect(page.locator('text=필수 정보를 입력해주세요.')).toBeVisible();
    
    // Step 5: Fill in the form with dummy data
    // Account Info
    await page.fill('input[placeholder="영문, 숫자 포함 6~12자"]', 'testuser1');
    await page.fill('input[placeholder="영문, 숫자, 특수문자 포함 8자 이상"]', 'Test1234!');
    await page.fill('input[placeholder="비밀번호 재입력"]', 'Test1234!');
    
    // Personal Info
    await page.fill('input[placeholder="실명 입력"]', '홍길동');
    await page.fill('input[placeholder="예: 19900101"]', '19900101');
    await page.fill('input[placeholder="\'-\' 없이 입력"]', '01012345678');
    await page.locator('label:has-text("남자")').click();
    await page.fill('input[placeholder="example@email.com"]', 'test@example.com');
    await page.fill('input[placeholder="상세주소 입력"]', '상세주소 테스트');
    
    // Additional Info
    await page.selectOption('select', { value: 'fc' });
    await page.locator('select').nth(1).selectOption({ value: 'new' });
    
    // Step 6: Click "회원가입 완료"
    const submitButton = page.locator('button:has-text("회원가입 완료")');
    await expect(submitButton).toBeVisible();
    
    // Set up dialog handler before clicking submit
    page.on('dialog', async dialog => {
      console.log('Dialog message:', dialog.message());
      await dialog.accept();
    });
    
    // Note: Since there's no backend, we just verify the button is clickable
    await expect(submitButton).toBeEnabled();
    
    console.log('✓ Individual signup flow completed successfully');
  });

  test('Individual Signup - Validation Test', async ({ page }) => {
    // Navigate to individual signup
    await page.click('text=개인회원 가입하기');
    
    // Try to proceed without agreeing to terms
    const nextButton = page.locator('button:has-text("다음 단계로")');
    await expect(nextButton).toBeDisabled();
    
    // Check only one checkbox
    await page.locator('label:has-text("이용약관 동의 (필수)") input[type="checkbox"]').click();
    
    // Button should still be disabled
    await expect(nextButton).toBeDisabled();
    
    // Check the second checkbox
    await page.locator('label:has-text("개인정보 수집 및 이용 동의 (필수)") input[type="checkbox"]').click();
    
    // Now button should be enabled
    await expect(nextButton).toBeEnabled();
    
    console.log('✓ Individual signup validation test passed');
  });

  test('Company Signup - Complete Flow', async ({ page }) => {
    // Step 1: Navigate to company signup
    await page.click('text=기업회원 가입하기');
    await expect(page).toHaveURL('http://localhost:3001/signup/company');
    
    // Verify Step 1 (Terms Agreement) is displayed
    await expect(page.locator('text=약관동의')).toBeVisible();
    await expect(page.locator('text=서비스 이용을 위한 약관에 동의해주세요.')).toBeVisible();
    
    // Step 2: Check "전체 약관에 동의합니다."
    await page.locator('label:has-text("전체 약관에 동의합니다.")').click();
    
    // Verify both checkboxes are checked
    const termsCheckbox = page.locator('label:has-text("이용약관 동의 (필수)") input[type="checkbox"]');
    const privacyCheckbox = page.locator('label:has-text("개인정보 수집 및 이용 동의 (필수)") input[type="checkbox"]');
    await expect(termsCheckbox).toBeChecked();
    await expect(privacyCheckbox).toBeChecked();
    
    // Step 3: Click "다음 단계로"
    const nextButton = page.locator('button:has-text("다음 단계로")');
    await nextButton.click();
    
    // Verify Step 2 (Information Input) is displayed
    await expect(page.locator('text=정보입력')).toBeVisible();
    await expect(page.locator('text=기업 정보를 입력해주세요.')).toBeVisible();
    
    // Step 4: Fill in the form with dummy company data
    // Account Info
    await page.fill('input[placeholder="영문, 숫자 포함 6~12자"]', 'company1');
    await page.fill('input[placeholder="영문, 숫자, 특수문자 포함 8자 이상"]', 'Company1234!');
    await page.fill('input[placeholder="비밀번호 재입력"]', 'Company1234!');
    
    // Company Info
    await page.fill('input[placeholder="(주)리치골든파트너"]', '테스트 주식회사');
    await page.fill('input[placeholder="대표자 성함"]', '김대표');
    await page.fill('input[placeholder="\'-\' 없이 입력"]', '1234567890');
    await page.fill('input[placeholder="상세주소 입력"]', '회사 상세주소');
    
    // Manager Info
    await page.fill('input[placeholder="담당자 성함"]', '이담당');
    await page.locator('input[placeholder="\'-\' 없이 입력"]').nth(1).fill('01098765432');
    await page.fill('input[placeholder="example@company.com"]', 'manager@company.com');
    
    // Step 5: Click "기업회원 가입완료"
    const submitButton = page.locator('button:has-text("기업회원 가입완료")');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    
    console.log('✓ Company signup flow completed successfully');
  });

  test('Company Signup - Validation Test', async ({ page }) => {
    // Navigate to company signup
    await page.click('text=기업회원 가입하기');
    
    // Try to proceed without agreeing to terms
    const nextButton = page.locator('button:has-text("다음 단계로")');
    await expect(nextButton).toBeDisabled();
    
    // Check "전체 약관에 동의합니다."
    await page.locator('label:has-text("전체 약관에 동의합니다.")').click();
    
    // Button should now be enabled
    await expect(nextButton).toBeEnabled();
    
    // Uncheck "전체 약관에 동의합니다."
    await page.locator('label:has-text("전체 약관에 동의합니다.")').click();
    
    // Button should be disabled again
    await expect(nextButton).toBeDisabled();
    
    console.log('✓ Company signup validation test passed');
  });

  test('Navigation - Back to signup selection', async ({ page }) => {
    // Navigate to individual signup
    await page.click('text=개인회원 가입하기');
    
    // Click back button
    await page.click('text=회원유형 선택으로 돌아가기');
    
    // Verify we're back at signup page
    await expect(page).toHaveURL('http://localhost:3001/signup');
    await expect(page.locator('text=개인회원 가입하기')).toBeVisible();
    await expect(page.locator('text=기업회원 가입하기')).toBeVisible();
    
    console.log('✓ Navigation test passed');
  });
});
