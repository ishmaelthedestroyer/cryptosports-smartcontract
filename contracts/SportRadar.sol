pragma solidity ^0.4.19;

contract SportRadar {
  address public owner;

  struct Bet {
    address creator;
    address challenger;
    uint amount;
  }

  mapping (string => Bet) bets;

  event Deposit(address _from, uint _amount);
  event Refund(address _to, uint _amount);

  function SportRadar() public {
    owner = msg.sender;
  }

  function addBet(
      string betId,
      address creator,
      address challenger,
      uint amount
    ) public payable returns (bool success) {
    if (msg.sender != creator) {
      return false;
    }

    require(msg.value == amount);

    Bet memory bet = Bet(creator, challenger, amount);
    bets[betId] = bet;

    return true;
  }

  function acceptBet(
    string betId,
    address challenger,
    uint amount
  ) public returns (bool success) {
    if (msg.sender != challenger || bets[betId].challenger != challenger) {
      return false;
    }

    require(msg.value == amount);

    bets[betId].amount += amount;

    return true;
  }

  function disburseBet(
    string betId,
    address winner
  ) public returns (bool success) {
    if (msg.sender != owner) {
      return false;
    }

    if (bets[betId].creator == winner) {
      bets[betId].creator.transfer(bets[betId].amount);
    } else if (bets[betId].challenger == winner) {
      bets[betId].challenger.transfer(bets[betId].amount);
    } else {
      return false;
    }

    return true;
  }

  function cancelBet(string betId) public returns (bool success) {
    if (msg.sender != owner) {
      return false;
    }

    bets[betId].creator.transfer(bets[betId].amount / 2);
    bets[betId].challenger.transfer(bets[betId].amount / 2);

    Refund(bets[betId].creator, bets[betId].amount / 2);
    Refund(bets[betId].challenger, bets[betId].amount / 2);
    
    delete bets[betId];

    return true;
  }
}
