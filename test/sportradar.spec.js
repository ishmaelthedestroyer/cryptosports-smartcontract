const SportRadar = artifacts.require("./SportRadar");

contract('SportRadar', function(accounts) {
  it("Initial SportRadar settings should match", async () => {
    let
      sportradar = await SportRadar.deployed(),
      owner = await sportradar.owner.call();

    assert.equal(owner.valueOf(), accounts[0]);
  });

  it("Should be able to create and add a bet", async () => {
    let
      sportradar = await SportRadar.deployed(),
      betId = await sportradar.addBet.call('123', accounts[0], accounts[1], 100);

    assert(betId.valueOf(), '123');
  });
});
