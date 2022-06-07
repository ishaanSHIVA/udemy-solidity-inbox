pragma solidity ^0.4.17;

// linter warnings (red underline) about pragma version can igonored!

// contract code will go here
contract Inbox {
    string public message;

    constructor(string memory _memory) public {
        message = _memory;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory _memory) public {
        message = _memory;
    }
}
