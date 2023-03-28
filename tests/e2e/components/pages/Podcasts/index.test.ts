import { test, expect } from '@playwright/test';
import { server } from '../../../../../mocks/server';

const { beforeEach, beforeAll, afterAll, afterEach, describe } = test;

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => server.resetHandlers())

beforeEach(async({ page })=>{
  await page.goto('http://localhost:3000');
})

describe('Podcasts page', () => {
  test('Should display the title text', async ({ page }) => {
    const titleText = await page.getByText('Podcaster');
    await expect(titleText).toBeVisible();
  });

  test('Should display the podcasts', async ({ page }) => {
    await page.waitForSelector('div#podcasts')
    const itemCount = await page.$$eval('.podcastListItem', items => items.length);
    expect(itemCount).toBe(100);
  })

  test('Should display the filtered podcasts', async ({ page }) => {
    await page.waitForSelector('div#podcasts')
    await page.fill('input#podcast-search', 'to')
    const itemCount = await page.$$eval('.podcastListItem', items => items.length);
    expect(itemCount).toBe(8);
  });
})

afterAll(() => server.close());
