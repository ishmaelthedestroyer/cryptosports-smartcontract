pragma solidity ^0.4.19;

contract SportRadar {
  address public owner;

  struct Bet {
    address creator;
    address challenger;
    uint pool;
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
      uint pool
    ) public {
    Bet memory bet = Bet(creator, challenger, pool);
    bets[betId] = bet;
  }
}
