# dominicegginton-dev-api

The API source code that powers [dominicegginton.dev](https://dominicegginton.dev), my personal piece of the internet, feel free to check it out.

## Development

### Environment Variables

| Variable Name | Description                  | Required | Default |
| ------------- | ---------------------------- | -------- | ------- |
| PORT          | API port                     | no       | 3000    |
| GITHUB_TOKEN  | Personal GitHub Access token | yes      |         |

## Local Development

```sh
npm install # Install dependencies
npm start # Run production server
npm run dev # Run development server
npm run build # Build for production
npm run clean # Remove built production files
npm run lint # Analyzes source code for linting errors
npm run lint:fix # Auto-fix source code linting errors
npm run prettier # Analyzes file formatting
npm run prettier:fix # Auto-fix file formatting
```

## GitHub Actions

| Workflow                                                 | Description                                                 | Runs                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| [Continuous Integration](.github/workflows/ci.yml)       | Analyzes file formatting and source code for linting errors | On push and pull requests to **main**                       |
| [CodeQL Analysis](.github/workflows/codeql-analysis.yml) | Analyzes source code for know security issues               | On push and pull requests to **main** & at 00:00 UTC on Sun |
| [Build](.github/workflows/build.yml)                     | Builds and pushes docker container to ghcr.io and gcr.io    | On new releases                                             |

## Linked Repositories

- [dominicegginton/dominicegginton-dev-frontend](https://github.com/dominicegginton/dominicegginton-dev-frontend)
- [dominicegginton/dominicegginton-dev-api](https://github.com/dominicegginton/dominicegginton-dev-api)
