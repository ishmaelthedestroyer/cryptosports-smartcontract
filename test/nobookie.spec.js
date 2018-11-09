const NoBookie = artifacts.require("./NoBookie");

contract('NoBookie', function(accounts) {
  const amount = 1;
  const feePercent = 0.03;
  const fee = amount * feePercent;
  const value = web3.toWei(amount, 'ether');

  it("Initial NoBookie settings should match", async () => {
    let
      nobookie = await NoBookie.deployed(),
      owner = await nobookie.owner.call();

    assert.equal(owner.valueOf(), accounts[0]);
  });

  it("Should be able to create and accept a bet", async () => {
    let
      nobookie = await NoBookie.deployed(),
      addStatus = await nobookie.addBet('123', {
        from: accounts[1],
        value
      }),
      acceptStatus = await nobookie.acceptBet('123', {
        from: accounts[2],
        value
      });

    assert(addStatus);
  });

  it("Should be able to disburse winnings", async () => {
    let
      nobookie = await NoBookie.deployed(),
      addStatus = await nobookie.addBet('456', {
        from: accounts[1],
        value
      }),
      acceptStatus = await nobookie.acceptBet('456', {
        from: accounts[2],
        value
      }),
      disburseStatus = await nobookie.disburseBet.call('123', accounts[2], fee, {
        from: accounts[0],
      });

    assert(addStatus && acceptStatus && disburseStatus);
  });
});
