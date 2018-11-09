const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'slide faith cradle suffer more toilet monkey squeeze pride april fault will';
const infuraURL = 'https://ropsten.infura.io/Cvr4R20I8eWayqlooYwR';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, infuraURL),
      network_id: 3
    }
  }
};
