// SPDX-License-Identifier: MIT
/**
HW Designer & Testing Data: ChiHaoLu
Final Updated: 2022/8/16
*/
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Claim is Ownable {
    struct ProblemStatus {
        bool problem1;
        bool problem2;
        bool problem3;
        bool problem4;
    }
    bool public opening;
    mapping(address => bool) public deposited;
    mapping(address => bool) public claimed;
    mapping(address => ProblemStatus) public score;

    function setOpening(bool _flag) public onlyOwner {
        opening = _flag;
    }

    function getScore1(address addr) public returns(bool){
        return score[addr].problem1;
    }
    function getScore2(address addr) public returns(bool){
        return score[addr].problem2;
    }
    function getScore3(address addr) public returns(bool){
        return score[addr].problem3;
    }
    function getScore4(address addr) public returns(bool){
        return score[addr].problem4;
    }

    /**Problem 1: Basic Transaction */

    fallback() external payable {
        if (msg.value == 0.001 ether) {
            require(opening, "Exceed the Deadline!");
            deposited[msg.sender] = true;
            score[msg.sender].problem1 = true;
        }
    }

    /**Problem 2: Quadratic Funding with ZKP */

    function QFwithZKP(string memory _answer) public returns (bool) {
        require(opening, "Exceed the Deadline!");
        if (
            keccak256(abi.encodePacked(_answer)) ==
            keccak256(abi.encodePacked("MACI"))
        ) {
            score[msg.sender].problem2 = true;
            return true;
        }
        return false;
    }

    /**Problem 3: Contract Interaction */
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
        score[msg.sender].problem3 = true;
    }

    /**Problem 4: Merkle Proof */
    bytes32[] public hashes;
    bytes32 root;

    constructor(bytes32 _root) {
        opening = true;
        root = _root;

        string[7] memory tx = [
            "zkpenguin",
            "zkpancake",
            "zkpolice",
            "zkpig",
            "zkplayground",
            "zkpigeon",
            "zkpoison"
        ];

        for (uint256 i = 0; i < tx.length; i++) {
            hashes.push(keccak256(abi.encodePacked(tx[i])));
        }
    }

    function merkleProof(bytes32[] memory proof) public {
        require(opening, "Exceed the Deadline!");
        bytes32 leaf = keccak256(abi.encodePacked("zkplayground"));
        require(verify(proof, root, leaf), "Your proof is incorrect!");
        score[msg.sender].problem4 = true;
    }

    function verify(
        bytes32[] memory proof,
        bytes32 _root,
        bytes32 leaf
    ) internal pure returns (bool) {
        return processProof(proof, leaf) == _root;
    }

    function processProof(bytes32[] memory proof, bytes32 leaf)
        internal
        pure
        returns (bytes32)
    {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = _hashPair(computedHash, proof[i]);
        }
        return computedHash;
    }

    function _hashPair(bytes32 a, bytes32 b) private pure returns (bytes32) {
        return a < b ? _efficientHash(a, b) : _efficientHash(b, a);
    }

    function _efficientHash(bytes32 a, bytes32 b)
        private
        pure
        returns (bytes32 value)
    {
        assembly {
            mstore(0x00, a)
            mstore(0x20, b)
            value := keccak256(0x00, 0x40)
        }
    }
}
