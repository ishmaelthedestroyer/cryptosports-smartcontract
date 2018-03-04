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
    ) public returns (bool success) {
    if (msg.sender != owner) {
      return false;
    }

    Bet memory bet = Bet(creator, challenger, amount);
    bets[betId] = bet;

    return true;
  }
}
