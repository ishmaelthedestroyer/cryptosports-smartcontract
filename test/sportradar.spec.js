const SportRadar = artifacts.require("./SportRadar");

contract('SportRadar', function(accounts) {
  it("Initial SportRadar settings should match", async () => {
    let
      sportradar = await SportRadar.deployed(),
      owner = await sportradar.owner.call();

    assert.equal(owner.valueOf(), accounts[0]);
  });
});
