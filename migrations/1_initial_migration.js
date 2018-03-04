const Migrations = artifacts.require('./Migrations.sol'),
  SportRadar = artifacts.require('./SportRadar.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SportRadar);
};
