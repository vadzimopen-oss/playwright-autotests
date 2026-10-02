import { test, expect, Page, Locator } from '@playwright/test';

const elements: { locator: (page: Page) => Locator; name: string}[] = [
  {
    locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'API' }),
    name: 'API'
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server'
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
    await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText('Playwright');
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toContainText('MCP');
    await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toContainText('CLI');
    await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
  });

  test('href attribute check', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute('href', '/');
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
    await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toHaveAttribute('href', '/mcp/introduction');
    await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toHaveAttribute('href', '/agent-cli/introduction');
    await expect.soft(page.getByRole('link', { name: 'API' })).toHaveAttribute('href', '/docs/api/class-playwright');
    await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute('href', 'https://github.com/microsoft/playwright');
    await expect.soft(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute('href', 'https://aka.ms/playwright/discord');
  });

  test('Dark mode switch test', async ({ page }) => {
    await page.getByRole('button', { name: /Switch between dark and light mode/ }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme-choice', 'light');
    await page.getByRole('button', { name: /Switch between dark and light mode/ }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Page title check', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.');
  });

  test('Get started button check', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect.soft(page.getByRole('link', {name: 'Get started'})).toHaveAttribute('href', '/docs/intro');
  });
});