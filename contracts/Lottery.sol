pragma solidity ^0.4.8;

contract Lottery {
    
    uint nonce = 1000;
    enum LotteryState { Accepting, Finished }
    LotteryState state; 
    address owner;
    constructor() public {
        owner = msg.sender;
        state = LotteryState.Accepting;
    }
    function random() public returns (uint){
        nonce += 1;
        return uint(keccak256(abi.encodePacked(nonce)));
    }

    function deterWinner() public returns (uint) {
        state = LotteryState.Finished;
        uint winningNumber = random();
        return winningNumber;
    }
}