pragma solidity ^0.5.0;

contract Deed {
    address public lawyer;  //lawyer's address
    address payable public beneficiary; //beneficiary's address
    uint public earliest;   //earliest time before payments can be made
    
    //constructor function passes the various addresses and earliest withdrawal time on deployment
    constructor(address _lawyer, address payable _beneficiary, uint fromNow) payable public {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliest = now + fromNow;
    }
    
    //function for withdrawal of funds
    function withdraw() public {
        //Lawyer must be the caller
        require(msg.sender == lawyer, 'only lawyer can call this');
        //cannot make call before thestipulated time
        require(now >= earliest, 'too early to make call');
        //transfers funds from smart contract to beneficiary
        beneficiary.transfer(address(this).balance);
    }
}

