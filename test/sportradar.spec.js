const SportRadar = artifacts.require("./SportRadar");

contract('SportRadar', function(accounts) {
  it("Initial SportRadar settings should match", async () => {
    let
      sportradar = await SportRadar.deployed(),
      owner = await sportradar.owner.call();

    assert.equal(owner.valueOf(), accounts[0]);
  });

  it("Should be able to create and accept a bet", async () => {
    let
      sportradar = await SportRadar.deployed(),
      addStatus = await sportradar.addBet.call('123', accounts[0], accounts[1], 100, {
        from: accounts[0],
        value: 100,
      });

    assert(addStatus);
  });

  it("Should be able to disburse winnings", async () => {
    let
      sportradar = await SportRadar.deployed(),
      addStatus = await sportradar.addBet.call('123', accounts[1], accounts[2], 100, {
        from: accounts[1],
        value: 100,
      }),
      acceptStatus = await sportradar.acceptBet.call('123', accounts[2], 100, {
        from: accounts[2],
        value: 100,
      }),
      disburseStatus = await sportradar.disburseBet.call('123', accounts[2], {
        from: accounts[0],
      });

    assert(addStatus && acceptStatus && disburseStatus);
  });
});
