# Building Backend for dApp with Truffle, Node.js, and Webpack

<!-- MDTOC maxdepth:6 firsth1:1 numbering:1 flatten:0 bullets:0 updateOnSave:1 -->

1. [Building Backend for dApp with Truffle, Node.js, and Webpack](#building-backend-for-dapp-with-truffle-nodejs-and-webpack)  
   &emsp;1.1. [The Big Picture](#the-big-picture)  
   &emsp;1.2. [The Goal of the Tutorial](#the-goal-of-the-tutorial)  
   &emsp;1.3. [Developer Tools](#developer-tools)  
   &emsp;&emsp;1.3.1. [[Truffle Framework](https://www.trufflesuite.com/)](#truffle-framework)  
   &emsp;&emsp;1.3.2. [[Ganache](https://www.trufflesuite.com/ganache)](#ganache)  
   &emsp;&emsp;1.3.3. [[Solidity Prettier Plugin](https://www.npmjs.com/package/prettier-plugin-solidity)](#solidity-prettier-plugin)  
   &emsp;&emsp;1.3.4. [Linter - [Solhint](https://protofire.github.io/solhint/)](#linter-solhinthttpsprotofiregithubiosolhint)  
   &emsp;&emsp;1.3.5. [Truffle Unit Test](#truffle-unit-test)  
   &emsp;&emsp;1.3.6. [[Solidity Code Coverage](https://github.com/sc-forks/solidity-coverage)](#solidity-code-coverage)  
   &emsp;&emsp;1.3.7. [Gas Cost Estimation](#gas-cost-estimation)  
   &emsp;1.4. [Prerequisites](#prerequisites)  
   &emsp;1.5. [Project Structure](#project-structure)  
   &emsp;1.6. [Smart Contract Development](#smart-contract-development)  
   &emsp;&emsp;1.6.1. [The Anatomy of the Smart Contract](#the-anatomy-of-the-smart-contract)  
   &emsp;&emsp;1.6.2. [Solidity Linting and Prettier](#solidity-linting-and-prettier)  
   &emsp;1.7. [Truffle Unit Tests](#truffle-unit-tests)  
   &emsp;&emsp;1.7.1. [Writing Migrations](#writing-migrations)  
   &emsp;&emsp;1.7.2. [Config Development Network](#config-development-network)  
   &emsp;&emsp;1.7.3. [Solidity Code Coverage](#solidity-code-coverage)  
   &emsp;&emsp;1.7.4. [Eth Gas Reporter](#eth-gas-reporter)  
   &emsp;1.8. [Backend Development](#backend-development)  
   &emsp;&emsp;1.8.1. [Deploy Contract](#deploy-contract)  
   &emsp;&emsp;1.8.2. [Modules](#modules)  
   &emsp;1.9. [Webpack Integration](#webpack-integration)  
   &emsp;&emsp;1.9.1. [Webpack Main Points](#webpack-main-points)  
   &emsp;&emsp;1.9.2. [Webpack Configurations](#webpack-configurations)

<!-- /MDTOC -->

Blockchain is a relatively young technology that is under continuous development. Similarly, applications built on the top of the blockchain are also still evolving. As a result, there are several tools and best practices to streamline the development process. This tutorial will guide you through the steps to build a node.js backend for a Decentralized Application (dApp). The tutorial introduces different developer tools and best practices and demonstrates how can we use them to boost the development experience.

## The Big Picture

A Decentralized Application (dApp) is a kind of web application whose backend runs on a decentralized network such as Blockchain. The dApp has a traditional frontend built with HTML, CSS, and JavaScript. However, instead of connecting with a backend server, the dApp is connected to a blockchain node. The backend code of the dApp is written in the form of a smart contract using the Solidity programming language. The smart contract is a piece of program that contains the core logic of a dApp and is an integral part of the blockchain. The smart contracts are deployed using a locally running blockchain node and resides on the blockchain network.

The communication between the frontend and the backend is done through a Web3 JavaScript library. The Web3 is a collection of libraries which contains functionality to interact with the Ethereum ecosystem. The communication is essentially involved reading and writing the data from the blockchain through the smart contracts. A Web3 provider can be set up in both the frontend and the backend to send the transaction and listen to the blockchain events.

## The Goal of the Tutorial

The goal of the tutorial is to define a project structure to built a backend for the dApp using node.js, truffle, and webpack. We will write a simple smart contract that will send some info to the blockchain and emit an event in the response of a successful transaction.

The backend will perform two main functions:

1. Publish transactions to the blockchain network
2. Listen to the blockchain events

## Developer Tools

We will make use of the following tools:

### [Truffle Framework](https://www.trufflesuite.com/)

We are using Truffle framework for the development of smart contracts. The Truffle provides a suite of tools to write smart contracts in Solidity, perform unit tests using Mocha and Chai, and deploy contracts on the Blockchain. Some of the most useful and frequently used truffle commands are:

- Compile - `truffle compile`
- Migrate - `truffle migrate`
- Test contracts - `truffle test`

You can find more from the official [docs](http://www.truffleframework.com/docs)

### [Ganache](https://www.trufflesuite.com/ganache)

We will make use of ganache to set up a private blockchain for the smart contract development, testing, and to speed up the overall iteration process. Furthermore, ganache comes with a built-in block explorer to examine blocks, transactions, contracts, and events to gain insight about what's happening under the hood.

### [Solidity Prettier Plugin](https://www.npmjs.com/package/prettier-plugin-solidity)

Solidity Prettier automatically formats the Solidity files according to a predefined style guide.

The use of Solidity prettier in combination with Solhint is quite effective as the prettier automatically fix many of the errors that Solhint finds, such as indentation and code styles.

### Linter - [Solhint](https://protofire.github.io/solhint/)

The Solhint is a great tool and library for the static analysis of Solidity code. The use of Solhint will help us in automatic syntax checking and detect security vulnerabilities of the Solidity code.

Alternatively, you can use [Ethlint](https://github.com/duaraghav8/Ethlint).

### Truffle Unit Test

We will be using the truffle unit testing to test the core functionality of our smart contract. Under the hood, Truffle uses the Mocha testing framework and Chai assertion library to write the tests in JavaScript.

### [Solidity Code Coverage](https://github.com/sc-forks/solidity-coverage)

The Solidity coverage tool shows how much of the code-base has been covered and tested by the unit tests.

### Gas Cost Estimation

We will use [ETH Gas Reporter](https://www.npmjs.com/package/eth-gas-reporter) to calculate gas and cost for the execution of functions and contract deployment. The market price data is fetched from [Coin Market Cap](https://coinmarketcap.com/) and gas price is fetched from [Eth Gas Station](https://ethgasstation.info/).

## Prerequisites

Install the following dependencies globally:

- [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) >= v5.0.41 (`$ npm i truffle -g`)
- [Node](https://nodejs.org/en/download/) >= v10.16.3

We will be using the [CoinGecko](https://www.coingecko.com/en/api) free API to fetch the cryptocurrency prices.

## Project Structure

We will start with creating a new empty project directory `dApp-nodeJS-webpack` and inside the directory, we will initiate a `npm` project.

1. In your terminal type the following commands:

```
$ mkdir dApp-nodeJS-webpack && cd $_
$ npm init
```

This will create a `package.json` file that holds the metadata about the project such as project dependencies, purpose, version, and scripts, etc.

2. create a new file `index.js` in the root directory. This file will call the overall functionality of the app by requiring the other modules.

```
$ touch index.js
```

Add the following log statement to the newly created file:

```
console.log('Hello world!')
```

3. To execute the functionality from the `index.js` file, add the following command to the `scripts` section of `package.json` file:

```
"scripts": {
    "app": "node index.js"
  },
```

Now open a terminal inside the root directory and type the following command:

```
npm run app
```

If you see the "Hello world!" in the console, you are good to go!

4. Inside the root directory, create a new directory `app` and inside that initiate a truffle project:

```
$ mkdir app && cd $_
$ truffle init
```

The result will look like the following terminal output:

```
Starting unbox...
=================

✔ Preparing to download box
✔ Downloading
✔ cleaning up temporary files
✔ Setting up box

Unbox successful, sweet!

Commands:

  Compile:        truffle compile
  Migrate:        truffle migrate
  Test contracts: truffle test

```

At this point, your project should resemble to this GitHub [commit](https://github.com/olisystems/dApp-nodeJS-webpack/tree/0325ec125ccdbb8ae13f3925ad3c2ea01930430e).

## Smart Contract Development

For the demo purpose, we are going to develop a simple Registration smart contract. The contract will allow the owner to register new users and only registered users will be able to send their values to the blockchain. Additionally, events will be emitted in the response of each successful transaction for user registration and send values.

### The Anatomy of the Smart Contract

The smart contract will start with specifying the version pragma. The `pragma` will specify the compiler version and is important to avoid the compatibility issues:

```
pragma solidity >=0.5.0 <0.7.0;
```

Next, we can start by defining the contract itself. The first state variable we have to declare is the `address` to store the Ethereum address of the contract owner. We have specified the visibility of the variable as `public` to let other contracts to access it. We will assign the deployer address to the `owner` using `constructor`. The `constructor` will be executed only once at the time when the contract is created.

```
contract Registration {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }
}
```

We create a struct `User` that has a bunch of attributes with which we will register a user.

```
struct User {
        string name;
        uint8 age;
        bool registered;
    }
```

We will declare two events `NewUser` and `NewValue`. These events will be triggered once the functions `registerUser` and `send` are executed respectively.

```
event NewUser(address userAddress, string name, uint8 age);
event NewValue(address userAddress, uint256 value);

```

The contract will use a mapping `users` to assign Ethereum address to `User` struct.

```
mapping(address => User) public users;
```

We define a modifier `onlyOwner` to check if the function executes as expected or not. The use of `onlyOwner` modifier will allow only owner of the contract to register the new user.

```
modifier onlyOwner {
        require(msg.sender == owner, "Only owner can register a user.");
        _;
    }
```

The contract contains two functions, `registerUser` and `send`. The `registerUser` will register a new user with the information specified in the `User` struct and bind the Ethereum address of the user with the struct. An event `NewUser` will be emitted if the function execution goes successful.

```
function registerUser(
        address _address,
        string memory _name,
        uint8 _age
    ) public onlyOwner {
        users[_address] = User(_name, _age, true);
        emit NewUser(_address, _name, _age);
    }

```

The `send` function will allow only registered users to send some random values to the blockchain by emitting an event on a successful transaction.

```
function send(uint256 _value) public {
        require(
            users[msg.sender].registered == true,
            "Caller is not registered."
        );
        emit NewValue(msg.sender, _value);
    }
```

### Solidity Linting and Prettier

To boost the smart contract development experience, we will use Solidity linting and prettier tools. For dependency management, we will use `node` and `npm`. To do that, we will init a `npm` project inside the `app` directory using the command `npm init`. After that run the following command to install the `solhint`, `prettier` and `prettier-plugin-solidity`:

```
$ npm install solhint --save-dev
$ npm install --save-dev prettier prettier-plugin-solidity
```

Next, we need to add the following script to `package.json` file located inside the `app` directory to run the prettier on all the contracts inside the `contracts` directory:

```
"prettier": "prettier --write **/*.sol"
```

After that, run the following command to apply prettier to our smart contracts:

```
$ npm run prettier
```

The output will look like the following:

```
> prettier --write **/*.sol

contracts/Migrations.sol 246ms
contracts/Registration.sol 199ms
```

For linting, we can use a `.solhint.json` file to configure Solhint linter for the whole project. Type the following command to generate a sample `.solhint.json` file:

```
$ npx solhint --init
```

Populate the newly created JSON file with the following rulesets:

```
{
"extends": "solhint:recommended",
"plugins": [],
"rules": {
    "avoid-suicide": "error",
    "avoid-sha3": "warn"
}
}

```

Finally, add the following script to the `package.json` file:

```
"slint": "solhint \"contracts/**/*.sol\""
```

Run the following command to apply the linting:

```
$ npm run slint
```

The output of the above will look be like this:

```
> solhint "contracts/**/*.sol"


contracts/Migrations.sol
  6:20  warning  Variable name must be in mixedCase  var-name-mixedcase

✖ 1 problem (0 errors, 1 warning)
```

## Truffle Unit Tests

Unit tests are an integral part of the development to test if a smart contract is working as expected or not. We will be writing a truffle unit test in JavaScript. Under the hood, truffle uses [Mocha](https://mochajs.org/) testing framework and [Chai](https://www.chaijs.com/) assertion library. We will also use some additional assertions and utilities, especially for testing the events, by using [truffle-assertions](https://www.npmjs.com/package/truffle-assertions) package.

We will start by creating an empty JavaScript file `registration.js` inside the `test` directory.

1. Install the truffle-assertion library and include this, along with contract artifacts, in the `registration.js` test file:

```
$ npm i truffle-assertions --save-dev
```

and inside the test file, include these line:

```
const Registration = artifacts.require('Registration')
const truffleAssert = require('truffle-assertions')

```

2. Create basic layout of the test file as given below:

```
contract('Registration', (accounts) => {

})
```

3. We will set up some test variable and create a global instance of our smart contract before executing the tests:

```
// test variables
let contract
const owner = accounts[0]
const user = accounts[1]
const notOwner = accounts[2]
const unregistered = accounts[3]
const name = 'John Doe'
const age = 25
const value = 100

// global contract instance
before('setup contract', async () => {
    contract = await Registration.deployed()
})
```

4. Next, we are going to test the following functionality of the contract:

- `registerUser` function should be executed only by the owner and it should emit the `NewUser` event:

```
it('should register a new user', async () => {
    let result = await contract.registerUser(user, name, age, {
        from: owner,
    })
    // test event
    truffleAssert.eventEmitted(result, 'NewUser', (ev) => {
        return ev.userAddress == user && ev.name == name && ev.age == age
    })
})
```

- The `registerUser` function should fail if caller is not the owner:

```
it('should fail to register by non-owner', async () => {
    await truffleAssert.reverts(
        contract.registerUser(user, name, age, {
        from: notOwner,
        }),
    )
})
```

- A registered user should be able to call the `send` function:

```
it('should send the random value', async () => {
    // register user
    await contract.registerUser(user, name, age, {
        from: owner,
    })
    // send the production value
    let result = await contract.send(value, {
        from: user,
    })
    // test event
    truffleAssert.eventEmitted(result, 'NewValue', (ev) => {
        return ev.userAddress == user && ev.value == value
    })
})

```

- An un-registered user should not allow to call the `send` function:

```
it('should fail to send value from un-registered user', async () => {
    await truffleAssert.reverts(
        contract.send(value, {
        from: unregistered,
        }),
    )
})
```

### Writing Migrations

Create a new file `2_deploy_contracts.js` inside the `migrations` directory and add the following contents to it:

```
const Registration = artifacts.require('Registration')

module.exports = function (deployer) {
  deployer.deploy(Registration)
}
```

The above migration is short and clean. However, we will look another way to export the contract `ADDRESS` and `ABI` during the migration so that we can use this metadata later to create a contract instance. This is useful especially in the case while calling the contract methods.

Add the following code block to the migrations file and it will create a `Metadata.js` file in the `src` directory:

```
const Registration = artifacts.require('Registration')
const fs = require('fs')

const path = '/../src/Metadata.js'

module.exports = function (deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Registration).then(() => {
    fs.writeFile(
      __dirname + path,
      'const ADDRESS = ' + "'" + Registration.address + "';",
      (err) => {
        if (err) {
          console.log(err)
        } else {
        }
      },
    )

    fs.appendFile(
      __dirname + path,
      '\nconst ABI = ' + JSON.stringify(Registration.abi) + ';',
      (err) => {
        if (err) {
          console.log(err)
        } else {
          fs.appendFile(
            __dirname + path,
            '\nmodule.exports = { ADDRESS, ABI };',
            (err) => {
              if (err) {
                console.log(err)
              }
            },
          )
        }
      },
    )
  })
}
```

### Config Development Network

1. Uncomment following lines inside the `truffle-config.js` file to setup a local development network:

```
// development: {
//  host: "127.0.0.1",     // Localhost (default: none)
//  port: 8545,            // Standard Ethereum port (default: none)
//  network_id: "*",       // Any network (default: none)
// },
```

2. We need to install and run [ganache-cli](https://github.com/trufflesuite/ganache-cli) before executing the tests. Run the following command to install the ganache-cli as a development dependency:

```
$ npm i ganache-cli --save-dev
```

and then add the following scripts to the `package.json` file to run the `ganache` and `test` through `npm`:

```
"ganache": "ganache-cli -m 'electric gift gold bitter boring surface stumble swift peanut adult horse dish'",
"test": "truffle test"
```

3. Now open two terminals inside the `app` directory and then first run the `ganache-cli`:

```
$ npm run ganache
```

In the second terminal, run the test file:

```
$ npm run test
```

The result of the above command should look like this:

```
> truffle test


Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Registration.sol
> Artifacts written to /tmp/test-2020624-17282-p51y4j.t7yra
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

  Contract: Registration
    ✓ should register a new user (97ms)
    ✓ should fail to register by non-owner (80ms)
    ✓ should send the random value (143ms)
    ✓ should fail to send value from un-registered user (71ms)


  4 passing (478ms)

```

### Solidity Code Coverage

Install the Solidity code coverage:

```
$ npm install --save-dev solidity-coverage
```

and add this to the `plugin` array of `truffle-config.js` file:

```
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

Add the following script to `scripts` in the `package.json` file:

```
"coverage": "truffle run coverage"
```

Finally, run the command:

```
$ npm run coverage
```

The output will contain the following code coverage metrics:

```
-------------------|----------|----------|----------|----------|----------------|
File               |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------|----------|----------|----------|----------|----------------|
 contracts/        |      100 |      100 |      100 |      100 |                |
  Registration.sol |      100 |      100 |      100 |      100 |                |
-------------------|----------|----------|----------|----------|----------------|
All files          |      100 |      100 |      100 |      100 |                |
-------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
> solidity-coverage cleaning up, shutting down ganache server
```

### Eth Gas Reporter

Install the Eth gas reporter by running the following command:

```
$ npm install --save-dev eth-gas-reporter
```

config the reporter in the `truffle-config.js` file as:

```
mocha: {
    // timeout: 100000
    reporter: 'eth-gas-reporter',
    reporterOptions: {
        excludeContracts: ['Migrations'],
    },
},

```

Now again run the `npm run test` command and the output will be like this:

```

·----------------------------------------|----------------------------|-------------|----------------------------·
|  Solc version: 0.5.16+commit.9c3226ce  ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 6721975 gas  │
·········································|····························|·············|·····························
|  Methods                                                                                                       │
·····················|···················|··············|·············|·············|··············|··············
|  Contract          ·  Method           ·  Min         ·  Max        ·  Avg        ·  # calls     ·  eur (avg)  │
·····················|···················|··············|·············|·············|··············|··············
|  Registration      ·  registerUser     ·       32474  ·      70017  ·      57503  ·           3  ·          -  │
·····················|···················|··············|·············|·············|··············|··············
|  Registration      ·  send             ·           -  ·          -  ·      23827  ·           2  ·          -  │
·····················|···················|··············|·············|·············|··············|··············
|  Deployments                           ·                                          ·  % of limit  ·             │
·········································|··············|·············|·············|··············|··············
|  Registration                          ·           -  ·          -  ·     516161  ·       7.7 %  ·          -  │
·----------------------------------------|--------------|-------------|-------------|--------------|-------------·

```

At this point, your project may look like to this GitHub [commit](https://github.com/olisystems/dApp-nodeJS-webpack/tree/e35cfddf93721954b0d9b31e6f90f748521a1b01).

## Backend Development

The backend of the application is developed as a Node.js application. The application is developed using
the JavaScript `class` and `ES6` syntax. The following snippet shows the node.js modules developed for the backend.

### Deploy Contract

Run the following command inside the `app` directory:

```
truffle migrate --reset --compile-all
```

The above command will generate the `Metadata.js` file in the `src` directory. The contains contract `ADDRESS` and `ABI`.

### Modules

Let's create another directory `src` inside the `app` directory that will serve as a container for our modules. The backend will contain the following modules:

- `Provider`: A web3 provider is required to set up a connection with an Ethereum node, create the instance of the contract, and to call the methods from the smart contract. For that, install `web3` as project dependency by running the following command:

```
$ npm install web3
```

Create a new file `Provider.js` and add the following code block to that:

```
const Web3 = require('web3')

class Provider {
  constructor() {
    //setup web3 provider
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545'),
    )
  }
}

module.exports = Provider
```

- `Contract.js`: This module will return the instance of the smart contract. Create and add the following block of code to `Contract.js` file:

```
const Provider = require('./Provider')
const provider = new Provider()
const { ADDRESS, ABI } = require('./Metadata')

class Contract {
  constructor() {
    this.web3 = provider.web3
  }
  // create contract instance
  initContract() {
    const instance = new this.web3.eth.Contract(ABI, ADDRESS)
    return instance
  }
}

module.exports = Contract
```

- `Methods`: This module will contain the functions to call the methods from the smart contract. For the demo purpose, we will call the `send` method at a 30 seconds time interval. The contents of `Methods.js` will look like the following:

```
const Contract = require('./Contract')
const Provider = require('./Provider')

const provider = new Provider()
const contract = new Contract()
const web3 = provider.web3
const instance = contract.initContract()

class Registration {
  // register user
  async registerUser() {
    let accounts = await web3.eth.getAccounts()
    instance.methods
      .registerUser(accounts[1], 'John Doe', 30)
      .send({ from: accounts[0] })
      .then((receipt) => console.log(receipt.transactionHash))
  }

  // send the values
  async send() {
    let accounts = await web3.eth.getAccounts()
    instance.methods
      .send(100)
      .send({ from: accounts[1] })
      .then((receipt) => console.log(receipt.transactionHash))
  }

  sendDataInterval() {
    setInterval(this.send, 3000)
  }
}
module.exports = Registration

```

- `index.js`: Finall call the contract methods from the `index.js` file:

```
const Registration = require('./app/src/Methods')
const registration = new Registration()
registration.registerUser()
registration.sendDataInterval()
```

Let's open a terminal inside the root directory and run the following command:

```
npm run app
```

As a result, you should see the transaction hash in the console.

The complete code can be found [here](https://github.com/olisystems/dApp-nodeJS-webpack/tree/3960541a294b236e52eb05c1d4db09feb0a23f15).

## Webpack Integration

A webpack is a static modular bundler which treats all files and assets as modules and relies on a dependency graph. Using the dependency graph, webpack statistically traverses all modules and their dependencies to build the graph and finally generate a single JavaScipt file that contains code from all modules in the correct order.

### Webpack Main Points

To integrate webpack into the project, let's have a brief look at the main points of the webpack:

- **Entry**: This is the module that webpack uses to start building its internal dependency graph. From this module, webpack determines all other modules and libraries for the entry module and includes them in the graph until no dependency is left. For the current project, the entry point is `index.js` file.

- **Output**: This property defines a location where webpack will generate the bundle and a name for the bundle file.

- **Loaders**: This is the property that webpack uses to transform the source code of non-JavaScript modules before they are added to the dependency graph.

- **Plugins**: Plugins are helpful to do the tasks that loaders can't do such as asset management, bundle minimization, and optimization, etc.

- **Mode**: Mode property specifies built-in optimizations corresponding to each environment such as production, development or none.

### Webpack Configurations

Webpack uses a special configuration file, `webpack.config.js`, that specifies how assets and files will be transformed to generate the specified output. From the configurations, the webpack starts from the entry point and resolves each module it encounters while building the dependency graph. The final output will be a small bundle of all the modules of the project.

First, we need to install `webpack` and `webpack-cli` as project dependency. Run the following command inside the root directory of the project:

```
$ npm install webpack webpack-cli --save-dev
```

In the `package.json` file, we can create webpack tasks in the `scripts` section as follows:

```
"dev": "webpack --mode development",
"build": "webpack --mode production"
```

In the above scripts, we have used `--mode` flag to create `development` and `production` builds. Finally, add the following minimum configurations to the `webpack.config.js` file:

```
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

Run the `$ npm run dev` command inside the root directory and notices `dist` directory as a result.
Change the directory to `dist` and run the bundle using the following command:

```
$ node bundle.js
```

Make sure you have `ganache` running and the artifacts are updated.
If you could see the same output as before (transaction hashes), congratulations! you are all done👋👋👋.

Let's tweak some more configurations to make the development experience a breeze.

- Add `watch` flag to enable hot reload every time a file change. Change the `dev` script from

```
"dev": "webpack --mode development",
```

to

```
"dev": "webpack --mode development --w",
```

- Clean the `dist` folder before each build. For this, we need to install and configure the `clean-webpack-plugin` by using the following command:

```
$ npm install --save-dev clean-webpack-plugin
```

Update the `webpack.config.js` by adding the following lines:

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// other config, removed for brevity

plugins: [
  new CleanWebpackPlugin()
],

```

The complete project code can be found [here](https://github.com/olisystems/dApp-nodeJS-webpack.git).

Happy coding👋👋👋
