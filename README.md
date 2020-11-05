# Feeds

A replica of [feeds.chain.link](https://feeds.chain.link)

## Local development

- Update [webpack.config.json](webpack.config.json) with your valid projectId from [Infura](https://infura.io/)

To start the project quickly use `yarn && yarn start`, which will run on `http://localhost:8080`.

## Linting

We use `eslint` and `prettier`, as well as validating our types.
You can lint your code by running `yarn lint`.

## Testing

We use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) along with [Jest](https://jestjs.io/) to write and run our test.
You can run all test with `yarn test`.

## Styling

The project uses [styled-components](https://www.styled-components.com/) and [material-ui](https://material-ui.com/) to apply visual styling to components.

### Further reading

This project is still in progress - here's the living list of todo's i've compiled along the way:

- finish styling
- fix currency icons
- handle loading states
- fix `any` warnings
- e2e & integration tests
- create a mock store for tests
- deploy
- restrict api access
- storybook
