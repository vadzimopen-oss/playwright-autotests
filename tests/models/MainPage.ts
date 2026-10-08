import test, { expect, Locator, Page } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    href: string;
  };
}

export class MainPage {
    readonly page: Page;
    readonly elements: Elements[];

    constructor(page: Page) {
        this.page = page;
        this.elements = [
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
    }

    async openMainPage() {
        await this.page.goto('https://playwright.dev/');
    }
    async checkElementsVisability() {
        for (const { locator, name } of this.elements) {
            test.step(`Check visibility of ${name}`, async () => {
            await expect.soft(locator(this.page)).toBeVisible();
            });
        }
    }
}