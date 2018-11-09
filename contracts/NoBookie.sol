pragma solidity ^0.4.19;

contract NoBookie {

  struct Bet {
    address creator;
    address challenger;
    uint amount;
  }

  address public owner;

  mapping (string => Bet) bets;

  modifier ownerOnly {require(msg.sender == owner); _;}

  event Deposit(address _from, uint _amount);
  event Refund(address _to, uint _amount);
  event Disburse(address _to, uint amount, uint fee);

  constructor() public {
    owner = msg.sender;
  }

  function addBet(string betId) public payable returns (bool success) {
    require(msg.value > 0);

    Bet memory bet = Bet(msg.sender, 0x0, msg.value);
    bets[betId] = bet;

    return true;
  }

  function acceptBet(string betId) public payable returns (bool success) {
    require(msg.value == bets[betId].amount);

    bets[betId].challenger = msg.sender;
    bets[betId].amount += msg.value;

    return true;
  }

  function disburseBet(
    string betId,
    address winner
  ) ownerOnly public returns (bool success) {
    if (bets[betId].creator == winner) {
      bets[betId].creator.transfer(bets[betId].amount);
    } else if (bets[betId].challenger == winner) {
      bets[betId].challenger.transfer(bets[betId].amount);
    } else {
      return false;
    }

    delete bets[betId];
    return true;
  }

  function disburseBetMinusFee(
    string betId,
    address winner,
    uint fee
  ) ownerOnly public returns (bool success) {
    if (bets[betId].creator == winner) {
      bets[betId].creator.transfer(bets[betId].amount - fee);
      msg.sender.transfer(fee);
      emit Disburse(bets[betId].creator, bets[betId].amount - fee, fee);
    } else if (bets[betId].challenger == winner) {
      bets[betId].challenger.transfer(bets[betId].amount - fee);
      emit Disburse(bets[betId].challenger, bets[betId].amount - fee, fee);
      msg.sender.transfer(fee);
    } else {
      return false;
    }

    delete bets[betId];
    return true;
  }

  // when there's no challenger, the creator should get it all
  // when there is a challenger, the creator gets half and the challenger gets half
  function cancelBet(string betId) public returns (bool success) {
    require(msg.sender != bets[betId].creator && msg.sender != bets[betId].challenger);

    if (bets[betId].challenger == address(0)) {
      bets[betId].creator.transfer(bets[betId].amount);
      emit Refund(bets[betId].creator, bets[betId].amount / 2);
    } else {
      bets[betId].creator.transfer(bets[betId].amount / 2);
      bets[betId].challenger.transfer(bets[betId].amount / 2);
      emit Refund(bets[betId].creator, bets[betId].amount / 2);
      emit Refund(bets[betId].challenger, bets[betId].amount / 2);
    }

    delete bets[betId];

    return true;
  }
}
