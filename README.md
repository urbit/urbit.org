The website for Urbit.

## Getting Started

Install Node 14. [nvm](https://github.com/nvm-sh/nvm) should handle this by running `nvm install 14`, then `nvm use` whenever in the repository (or automate it with a script - see [here](https://github.com/nvm-sh/nvm#deeper-shell-integration)).

Install our dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Framework and Library Documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Tailwind CSS, take a look at the docs:

- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Docs

## Deployment

We deploy using Vercel. All pull requests will show a deployment preview via the same.

## Upgrades

The `/scripts` contains scripts used to programmatically upgrade site content data.
