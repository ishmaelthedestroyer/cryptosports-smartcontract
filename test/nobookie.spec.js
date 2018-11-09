const NoBookie = artifacts.require("./NoBookie");

contract('NoBookie', function(accounts) {
  it("Initial NoBookie settings should match", async () => {
    let
      nobookie = await NoBookie.deployed(),
      owner = await nobookie.owner.call();

    assert.equal(owner.valueOf(), accounts[0]);
  });

  it("Should be able to create and accept a bet", async () => {
    let
      nobookie = await NoBookie.deployed(),
      addStatus = await nobookie.addBet.call('123', {
        from: accounts[1],
        value: 100,
      }),
      acceptStatus = await nobookie.acceptBet.call('123', {
        from: accounts[2],
        value: 100,
      });

    assert(addStatus);
  });

  it("Should be able to disburse winnings", async () => {
    let
      nobookie = await NoBookie.deployed(),
      addStatus = await nobookie.addBet.call('456', {
        from: accounts[1],
        value: 100,
      }),
      acceptStatus = await nobookie.acceptBet.call('456', {
        from: accounts[2],
        value: 100,
      });
      // disburseStatus = await nobookie.disburseBet.call('123', accounts[2], {
      //   from: accounts[0],
      // });

    assert(addStatus && acceptStatus && disburseStatus);
  });
});
