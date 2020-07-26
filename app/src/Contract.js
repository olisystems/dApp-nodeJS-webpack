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
