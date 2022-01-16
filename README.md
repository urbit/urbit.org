The website for Urbit.

## Getting Started

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

### Errors with Digital Envelope Routines

Gatsby v4 is not compatible with Webpack v4. If you're building with Node.js v17 or greater, you may experience some issues when building [urbit.org](https://urbit.org). The incompatibility between Gatsby and Webpack will present as the following error message on `yarn dev` or `npm run dev`:

```bash
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:130:10)
    at module.exports.__webpack_modules__.15660.module.exports (~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:111680:62)
    at NormalModule._initBuildHash (~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:85092:16)
    at handleParseError (~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:85146:10)
    at ~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:85178:5
    at ~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:85033:12
    at ~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:51096:3
    at iterateNormalLoaders (~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:50937:10)
    at Array.<anonymous> (~/urbit.org/node_modules/next/dist/compiled/webpack/bundle4.js:50928:4) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```

To work around this error, you can take the following steps:

```bash
npm install gatsby
# then
export NODE_OPTIONS=--openssl-legacy-provider
```

Adding the `openssl-legacy-provider` option should allow you to build the site successfully.

## Framework and Library Documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Tailwind CSS, take a look at the docs:

- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Docs

## Deployment

WIP

## Upgrades

The `/scripts` contains scripts used to programmatically upgrade site content data.
