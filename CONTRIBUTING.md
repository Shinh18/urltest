# Urltester

Command-line tool for finding and reporting dead links (e.g., broken URLs) in a file

#### Intsallation

- Fork this repository
- Clone the forked repository to your local device
- `npm i -g https://github.com/Shinh18/urltester.git`

#### Intsall Formatter - Prettier

- Using command line - `npm install --save-dev --save-exact prettier`

#### Usage - Prettier

- Format all files - `npm run prettier`
- Check if files are formatted - `npm run prettier-check`

#### Intsall Linter - ESLint

- Using command line - `npm install eslint --save-dev`

#### Usage - ESLint

- Check all files with Linter - `npm run lint`
- Check all files with Linter and fix issues - `npm run eslint-fix`

#### Testing Guidelines

- Jest is the testing framework used for writing tests. 
- Install dependency - `npm install --save-dev jest` 

##### Unit tests

 - `jest-fetch-mock` is used to mock the fetch functionality
 -  New test suite can be created in utils folder 
 -  Namind conventions should be followed - originalFileName.test.js
 -  Run unit test of specific module - `npm run test checkUrl.test.js`
 -  Run all test suite - `npm run test`

##### E2E tests

 - Files required are located in test folder
 - Run E2E tests - `npm run test e2e`

##### Test coverage

 - Makes sure that all code is covered
 - Run using - `npm run coverage`
