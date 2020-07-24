const Registration = artifacts.require('Registration')

module.exports = function (deployer) {
  deployer.deploy(Registration)
}