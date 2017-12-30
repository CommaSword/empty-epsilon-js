# Empty Epsilon javascript driver
Empty Epsilon API for javascript.

This library helps connecting to an empty epsilon game server with an open HTTP API. 

It offers a low level javascript API, as well as a tool to automatically start and stop an EmptyEpsilon server, designed for automatic tests.

## API
(TBD)

### context
This driver was extracted from  [Daedalus](https://github.com/CommaSword/Daedalus/). This had a major affect on early design choices, test coverage etc. 

## Developer documentation

Suggestions and contributions are welcomed!

### how to build
We use [yarn](https://yarnpkg.com/en/) to manage this project's lifecycle. Install yarn by running `npm i -g yarn` and then follow the instructions in the [developer documentation](./resources/entries/daedalus-developer.md)

run `yarn build` to build this project.

### how to test

To test this project we use the provided server manager. In order to configure it to the local environment, there is a `empty-epsilon-config.json` file at the project root. 
Simply modify the `runServer`, `killServer`, and `serverAddress` fields according to your local setup, so that the tests can correctly manage a game server's lifecycle.
 
after configuring `empty-epsilon-config.json`, run `yarn build` to build and test this project.

Tests are still WIP.
