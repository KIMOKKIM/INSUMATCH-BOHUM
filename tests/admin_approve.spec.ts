import { test, expect } from '@playwright/test';

test.describe('Admin approve flow', () => {
  test('Admin can create job, approve it, and see it on main page', async ({ page, baseURL }) => {
    // ensure baseURL is provided by playwright config (http://localhost:3001)
    const unique = 'AUTO_UI_' + Date.now().toString().slice(-6);
    const expectedTitle = unique + ' 회사명 테스트';

    // Login as admin via main login (this will call admin login API and set cookie)
    await page.goto('/login');
    await page.fill('input[placeholder="아이디"]', 'teomok1');
    await page.fill('input[placeholder="비밀번호"]', 'teomok$123');
    await page.click('button:has-text("로그인")');

    // go to admin new job page
    await page.goto('/admin/jobs/new');
    await expect(page.locator('text=새 채용공고 등록')).toBeVisible();

    // fill form
    await page.fill('input[placeholder="예: 삼성화재 강남지점 신입 FC 모집"]', unique + ' 회사명 테스트');
    await page.fill('input[placeholder="회사명 입력"]', '테스트회사 ' + unique);
    await page.fill('input[placeholder="예: 서울 강남구"]', '서울 강남구');
    await page.selectOption('select', 'GENERAL'); // jobType or level - first select is jobType in markup order
    // description textarea
    await page.fill('textarea[placeholder="채용 상세 내용을 입력하세요..."]', '자동화 테스트용 설명');
    await page.fill('input[placeholder="예: 010-1234-5678"]', '010-0000-0000').catch(()=>{});

    // submit - handle one dialog if it appears
    page.once('dialog', async dialog => { await dialog.accept(); });
    await Promise.all([
      page.waitForNavigation(),
      page.click('button:has-text("공고 등록하기")'),
    ]);

    // Verify redirected to admin jobs list
    await expect(page).toHaveURL(/\/admin\/jobs/);

    // Find the created job row by title and click 승인
    const row = page.locator('table').locator('tr').filter({ has: page.locator(`text=${expectedTitle}`) }).first();
    await expect(row).toBeVisible();
    const approveBtn = row.locator('button:has-text("승인")');
    await expect(approveBtn).toBeVisible();
    // handle confirm dialog once and wait for PUT response
    const [putResponse] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/jobs/') && resp.request().method() === 'PUT' && resp.status() === 200, { timeout: 5000 }),
      page.once('dialog', async dialog => { await dialog.accept(); }),
      approveBtn.click(),
    ]);
    expect(putResponse.ok()).toBeTruthy();
    // refresh table data and wait for status change
    await page.waitForTimeout(500); // short wait for client refresh
    await expect(row.locator('text=진행중')).toBeVisible({ timeout: 5000 });

    // Go to main page and check the job title appears
    await page.goto('/');
    await expect(page.locator(`text=${expectedTitle}`).first()).toBeVisible({ timeout: 5000 });
  });
});

