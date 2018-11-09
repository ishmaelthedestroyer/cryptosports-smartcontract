const Migrations = artifacts.require('./Migrations.sol');
const NoBookie = artifacts.require('./NoBookie.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(NoBookie);
};
