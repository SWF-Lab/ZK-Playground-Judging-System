// SPDX-License-Identifier: MIT
/**
Problem Designer & Testing Data: ChiHaoLu
Final Updated: 2022/8/29
*/
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Claim is Ownable {
    struct ProblemStatus {
        bool problem1;
        bool problem2;
    }
    bool public opening;
    mapping(address => bool) public deposited;
    mapping(address => bool) public claimed;
    mapping(address => ProblemStatus) public score;

    function setOpening(bool _flag) public onlyOwner {
        opening = _flag;
    }

    /**Problem 1: Basic Transaction */

    fallback() external payable {
        if (msg.value == 0.001 ether) {
            require(opening, "Exceed the Deadline!");
            deposited[msg.sender] = true;
            score[msg.sender].problem1 = true;
        }
    }

    /**Problem 2: Contract Interaction */
    
    function claim(uint256 _amountInFinney) public payable {
        require(opening, "Exceed the Deadline!");
        require(deposited[msg.sender], "You have not completed the Problem 1!");
        require(!claimed[msg.sender], "You have been claimed!");
        require(_amountInFinney == 1, "The input amount is incorrect!");

        claimed[msg.sender] = true;

        uint256 amountInEther = 0.001 ether;
        (bool sent, bytes memory data) = payable(msg.sender).call{
            value: amountInEther
        }("");
        require(sent, "Failed to withdraw Ether");
        score[msg.sender].problem2 = true;
    }
}
