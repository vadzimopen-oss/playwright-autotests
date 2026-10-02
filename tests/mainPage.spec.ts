import { test, expect, Page, Locator } from '@playwright/test';

const elements: { locator: (page: Page) => Locator; name: string; text?: string; href?: string}[] = [
  {
    locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
    href: '/'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs',
    text: 'Docs',
    href: '/docs/intro'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP',
    text: 'MCP',
    href: '/mcp/introduction'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI',
    text: 'CLI',
    href: '/agent-cli/introduction'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'API' }),
    name: 'API',
    text: 'API',
    href: '/docs/api/class-playwright'
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js',
    text: 'Node.js'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository',
    href: 'https://github.com/microsoft/playwright'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server',
    href: 'https://aka.ms/playwright/discord'
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Dark mode switch'
  },
];


test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Navigation elements are visible header', async ({ page }) => {
    for (const { locator, name } of elements) {
      test.step(`Check visibility of ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    }
  });

  test('Navigation elements names test', async ({ page }) => {
    for (const {locator, name, text} of elements) {
      if (!text) continue;
      await test.step(`Check test of ${name}`, async () => {
        await expect.soft(locator(page)).toContainText(text);
      })  
    }
  });

  test('href attribute check', async ({ page }) => {
    for (const {locator, name, href} of elements) {
      if (!href) continue;
      await test.step(`Check href attribute of ${name}`, async () => {
        await expect.soft(locator(page)).toHaveAttribute('href', href);
      })
    }
  });

  test('Dark mode switch test', async ({ page }) => {
    await page.getByRole('button', { name: /Switch between dark and light mode/ }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme-choice', 'light');
    await page.getByRole('button', { name: /Switch between dark and light mode/ }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Page title check', async ({ page }) => {
    await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.');
  });

  test('Get started button check', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect.soft(page.getByRole('link', {name: 'Get started'})).toHaveAttribute('href', '/docs/intro');
  });
});