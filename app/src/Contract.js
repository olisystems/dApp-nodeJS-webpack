const artifacts = require('../build/contracts/Registration')
const Provider = require('./Provider')

class Contract {
  constructor() {
    this.provider = new Provider()
    this.web3 = this.provider.web3
  }

  async initContract() {
    // Retrieve the network ID
    const networkId = await this.web3.eth.net.getId()
    // Retrieve the Network configuration
    const deployedNetwork = artifacts.networks[networkId]
    // Initializing the contract
    const instance = new this.web3.eth.Contract(
      artifacts.abi,
      deployedNetwork.address,
    )
    return instance
  }
}

module.exports = Contract
