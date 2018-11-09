var NoBookie = artifacts.require("./NoBookie.sol");

module.exports = function(deployer) {
  deployer.deploy(NoBookie);
};
