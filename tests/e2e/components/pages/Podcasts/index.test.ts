import {expect, test} from '@playwright/test';

const {beforeEach, describe} = test;

beforeEach(async ({page}) => {
  await page.goto('http://localhost:3000');
});

describe('Podcasts page', () => {
  test('Should display the title text', async ({page}) => {
    const titleText = await page.getByText('Podcaster');
    await expect(titleText).toBeVisible();
  });

  test('Should display all podcasts', async ({page}) => {
    await page.waitForSelector('div#podcasts');
    const itemCount = await page.$$eval('.podcastListItem', (items) => items.length);
    expect(itemCount).toBe(10);
  });

  test('Should display only the filtered podcasts', async ({page}) => {
    await page.waitForSelector('div#podcasts');
    await page.fill('input#podcast-search', 'Podcast 1');
    const itemCount = await page.$$eval('.podcastListItem', (items) => items.length);
    expect(itemCount).toBe(1);
  });
});
