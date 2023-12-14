The website for Urbit is maintained by the Urbit Foundation and the Urbit community. Issues and contributions are welcome.

## Getting Started

1. Fork the [Urbit site repository](https://github.com/urbit/urbit.org).

2. [Create a local clone](https://help.github.com/articles/cloning-a-repository/) of your fork.

3. Navigate to the `urbit.org` directory and install Node 14 using [nvm](https://github.com/nvm-sh/nvm):

    ```shell
    cd urbit.org
    nvm install 14
    ```
    You can then run `nvm use` whenever in the repository (or automate it with a script - see [here](https://github.com/nvm-sh/nvm#deeper-shell-integration)).

4. Install our dependencies:

    ```shell
    npm install
    ```

    If running an arm64 Mac (M1 or later), you may need to install some dependencies to compile canvas, one of our dependencies. Assuming you have [Homebrew](https://brew.sh):

    ```shell
    arch -arm64 brew install pkg-config cairo pango libpng jpeg giflib librsvg
    ```

5. Run the development server:

    ```shell
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To learn more about contributing, see GitHub's [documentation](https://docs.github.com/en/get-started/quickstart/contributing-to-projects).

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
