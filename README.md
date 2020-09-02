# Building Backend for dApp with Truffle, Node.js, and Webpack

Building Backend for dApp with Truffle, Node.js and Webpack

[Tutorial](https://medium.com/oli-systems/building-dapps-backend-with-node-js-and-webpack-311cda224da5)

## Table of Contents

- [Built With](#built-with)
- [Installation](#installation)
  - [Deploy Smart Contract](#deploy-smart-contract)
- [Contributing](#contributing)
- [License](#license)

## Built With

- [Solidity](https://solidity.readthedocs.io/en/v0.6.12/)
- [Truffle](https://www.trufflesuite.com/)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Node.js](https://nodejs.org/en/)
- [Webpack](https://webpack.js.org/)

## Installation

Install the `node.js` and `truffle` globally.

1. Install the code on your local system

   1. Fork this repository (click 'Fork' button in top right corner)
   2. Clone the forked repository on your local file system

   ```
   $ cd /path/to/install/location

   $ git clone https://github.com/olisystems/dApp-nodeJS-webpack.git
   ```

2. Change directory into the local clone of the repository

   ```
   $ cd dApp-nodeJS-webpack
   ```

3. Install dependencies

   ```
   $ npm install
   ```

### Deploy Smart Contract

    ```
    $ cd app && npm i
    $ npm run ganache
    $ npm run migrate
    ```

### Create Build

Chnage project directory to the root of the project:

    ```
    $ cd dApp-nodeJS-webpack
    $ npm run dev // create devlopment build
    $ npm run build // create production build
    ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository.
2. Create your new feature branch: `git checkout -b new-feature-branch`
3. Stage your changes: `git add .`
4. Commit the changes: `git commit -m "add commit message"`
5. `push` to the branch: `git push origin new-feature-branch`
6. Submit a `pull request`.

## License

This project is licensed under the [MIT](./LICENSE) License.
