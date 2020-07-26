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
