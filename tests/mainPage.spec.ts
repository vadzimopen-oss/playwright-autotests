import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    href: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
    attribute: {
      type: 'href',
      href: '/'
    }
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs',
    text: 'Docs',
    attribute: {
      type: 'href',
      href: '/docs/intro'
    }
  },
  {
    locator: (page) => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP',
    text: 'MCP',
    attribute: {
      type: 'href',
      href: '/mcp/introduction'
    }
  },
  {
    locator: (page) => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI',
    text: 'CLI',
    attribute: {
      type: 'href',
      href: '/agent-cli/introduction'
    }
  },
  {
    locator: (page) => page.getByRole('link', { name: 'API' }),
    name: 'API',
    text: 'API',
    attribute: {
      type: 'href',
      href: '/docs/api/class-playwright'
    }
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js',
    text: 'Node.js'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository',
    attribute: {
      type: 'href',
      href: 'https://github.com/microsoft/playwright'
    }
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server',
    attribute: {
      type: 'href',
      href: 'https://aka.ms/playwright/discord'
    }
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Dark mode switch'
  },
  {
    locator: (page) => page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Title',
    text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.'
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Get started' }),
    name: 'Get started button',
    attribute: {
      type: 'href',
      href: '/docs/intro'
    },
    text: 'Get started'
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
    for (const {locator, name, attribute} of elements) {
      if (!attribute?.href) continue;
      await test.step(`Check href attribute of ${name}`, async () => {
        await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.href);
      })
    }
  });

  test('Dark mode switch test', async ({ page }) => {
    await page.getByRole('button', { name: /Switch between dark and light mode/ }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme-choice', 'light');
    await page.getByRole('button', { name: /Switch between dark and light mode/ }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});