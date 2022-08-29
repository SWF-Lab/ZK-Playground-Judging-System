const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256");

const tree = new MerkleTree(dataArray, keccak256, { hashLeaves: true, sortPairs: true })
const root = tree.getHexRoot()
const leaf = keccak256("zkplayground")
const proof1 = tree.getHexProof(leaf)
console.log(leaf)
console.log("0x760785a457f46af4582b62962c4d96be98c68df9619556fa20af3c286343bf81")
console.log(tree.getHexRoot())
console.log(tree.getHexProof(leaf))
console.log(tree.verify(proof1, leaf, root))


/**
 * root:"0xe2de7e936cd2e3b398a5b5b89726a8d72148b93050d271cf91ffec3cc5598577"
 * 
 * proof: 
[
    "0x2098ddd01d6035049de112333af26442bb3009ea06b6df66fccfadf8adee9914",
    "0xb4435d3d2bb4863bffe2dd7c4a217641efe9da99b177cef8693fe26910a2bf04",
    "0x7c8d8e6486e95d2eaff942ec8eb9b732d53596cb06548b62ff4841438a25a5d4"
]
 */