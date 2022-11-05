# ZK-Playground-Judging-System
#4-This dapp is for the ZK-Playground(EF-Grants) Homework 0.

# ZK Playground Homework 0

###### tags: `ZK-Playground`
> ***HW Designer & Testing Data: [ChiHaoLu](https://chihaolu.me)***
> *Final Updated: 2022/8/17*

### ZK Playground
![](https://i.imgur.com/aQDHq2Cm.jpg)

* [Official Website](https://zkplayground.tw/)
* [Homework 0 Spec.](https://hackmd.io/@ChiHaoLu/ZKPlayground-HW0)
* [Online Judge Dapp](https://zkplayground-hw0.web.app)
* [Contract in Goerli](https://goerli.etherscan.io/address/0x847FB490b9255758738c1DBddD9E3049E9bC86c8)



### HW Statement
- 此作業（四題共九分）視為「報名加分題」，每位參賽者可以自行選擇是否要參與這份作業。**每組只要交一份即可。**
- 這份作業的截止時間是 **8 月 28 號晚上十二點**。預計於 9 月2 號晚上 12 點前完成審核並以Email通知結果。
- 做這份作業之前務必到此 **Google 表單** 填寫你的「錢包地址」與資料，請注意這個錢包地址將作為「回答 HW0 的智能合約題目」和「查詢你的 HW0 成績」用。
- 請注意每道題目的要求都須符合，例如：以太幣數量、合約地址與網路、**你的錢包地址（與上述表單填寫相符）** 都須正確無誤才算分。
- 如果做作業遇到任何困難可以搜尋任何參考資料，與任何人討論，但請不要抄襲，這份作業可以替自己檢驗是否能夠基本負荷 workshop 的課程內容。

:::warning
### Please note
> 1. 可以在此 [Dapp](https://zkplayground-hw0.web.app) 查看自己當前每題的分數。
> 1. 有題意不清或錯誤的疑慮可以使用 [電子信箱](mailto:b08303113@ntu.edu.tw) 詢問。
> 1. 若是因故遺失了自己的錢包私鑰想要換一個地址，可以使用上方信箱寄信要求重填表單（每人限一次）。
> 1. 完成本次作業不需要合約 ABI，只需要看本份文件提供之程式碼即可作答，來信詢問相關問題則不予回覆。
:::

---

## Problem 1 Basic Transaction
（一分）

本題請各位發起交易，發送 **0.001 goerliEther** 到此 [**合約地址**](https://goerli.etherscan.io/address/0x847FB490b9255758738c1DBddD9E3049E9bC86c8)。

## Problem 2 Quadratic Funding with ZKP
（二分）

本題將請各位回答在說明會時提到的，在 Quadratic Funding 專案合約中通常會使用「何種密碼學、零知識證明技術或相關概念」，來生產投票用的 Key 並達到最小化反共謀、反賄選、反勾結的目的。

單選題，請從以下選項中選擇最符合題意的答案：

1. Dark Forest
1. Plonk
1. MACI
1. Bulletproof
1. Sonic
1. Marlin
1. ECDSA

請利用此 [**Dapp 中的 Problem 2 答題選項及按鈕**](https://zkplayground-hw0.web.app) 與指定合約中的指定函式進行互動，送出一筆交易回答你這題的答案（你可以重複發送交易直到回答正確）。

## Problem 3 Contract Interaction
（三分）

本題請各位發起交易，與此 [**合約**](https://goerli.etherscan.io/address/0x847FB490b9255758738c1DBddD9E3049E9bC86c8) 的函式互動以領回你在 Problem 1 存入的 **0.001 goerliEther**。

請在完成 Problem 1 之後，閱讀以下在合約中的程式碼，以適當的 Input Parameter 送出交易完成題目要求。

```solidity
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
```

> 發起交易與合約互動的方式有非常多種，請各位任意選擇自己習慣的做法完成題目。

## Problem 4 Merkle Proof
（三分）

第四題請各位完成一連串的步驟：
1. 從此 [**合約**](https://goerli.etherscan.io/address/0x847FB490b9255758738c1DBddD9E3049E9bC86c8) 中 Fetch 一個名叫 `hashes` 的 `bytes32` 陣列。
    * 此資料結構中儲存了 merkle tree 之 leaves 的 hash 值
    * 已知其 hash 方式為：`keccak256(abi.encodePacked("<leafValueInStr>")`
    * `keccak256(abi.encodePacked("zkpoison")` <->`777726d7bfa53f1c91ec1485ed098db792c3e326b98ece6bd9761a43315b7cf3`
3. 根據規定架構製作此 Merkle Tree 的 Merkle Root，以及  `"zkplayground"` 這個字串之哈希存在在此 Merkle Tree 的 merkle proof。
    * 換句話說你需要提出一個 `keccak256(abi.encodePacked("zkplayground")` 存在在 `hashes` 中的證明。
5. 與合約中的函式 `function merkleProof(bytes32[] memory proof) public` 互動並通過所有的 verify 與 `require`。

**請注意 Merkle Tree 的架構為：**
```
└─ Root: e2de7e936cd2e3b398a5b5b89726a8d72148b93050d271cf91ffec3cc5598577
   ├── hash(...)
   │   ├── hash(hash(zkplayground) <-> hash(zkpenguin))
   │   │    ├─ hash(zkplayground)
   │   │    └─ hash(zkpenguin)
   │   └── hash(hash(zkpancake) <-> hash(zkpolice))
   │        ├─ hash(zkpancake)
   │        └─ hash(zkpolice)
   └── hash(...)
       ├── hash(hash(zkpig) <-> hash(zkpigeon))
       │    ├─ hash(zkpig)
       │    └─ hash(zkpigeon)
       └── hash(zkpoison)
            └─ hash(zkpoison)
```

本題在合約中程式碼如下：
```solidity
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
```

* 提示：如果不知道怎麼 fetch `hashes` 的話，你可以直接複製上方程式碼中的 `tx` 字串陣列生產需要的 hash。。

---

> Special Thanks to [狸貓](https://limaois.me) for Review.

---

### ZK Playground
![](https://i.imgur.com/aQDHq2Cm.jpg)

* [Official Website](https://zkplayground.tw/)
* [Homework 0 Spec.](https://hackmd.io/@ChiHaoLu/ZKPlayground-HW0)
* [Online Judge Dapp](https://zkplayground-hw0.web.app)
* [Contract in Goerli](https://goerli.etherscan.io/address/0x847FB490b9255758738c1DBddD9E3049E9bC86c8)

### Answer For 3 and 4:
```
    const part3 = async () => {

        const abi = [
            {
                "inputs": [
                    {
                        "name": "_amountInFinney",
                        "type": "uint256"
                    }
                ],
                "name": "claim",
                "stateMutability": "payable",
                "type": "function"
            }
        ]

        let user = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
                console.error(err);
            })

        let contractInstance = new web3.eth.Contract(abi, contractAddr, {
            from: user[0], // default from address
        });

        // const p3 = await contractInstance.methods.claim(1)
        //     .send({ from: user[0], gas: 4400000 })
        //     .once("error", (err) => {
        //         console.log(err)
        //     }).then((receipt) => {
        //         console.log(receipt)
        //     })
    }

    const part4 = async () => {

        const abi = [
            {
                "inputs": [
                    {
                        "name": "proof",
                        "type": "bytes32[]"
                    }
                ],
                "name": "merkleProof",
                "type": "function"
            }
        ]

        let user = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
                console.error(err);
            })

        let contractInstance = new web3.eth.Contract(abi, contractAddr, {
            from: user[0], // default from address
        });

        const dataArray = [
            "zkplayground",
            "zkpenguin",
            "zkpancake",
            "zkpolice",
            "zkpig",
            "zkpigeon",
            "zkpoison"
        ]

        // const tree = new MerkleTree(dataArray, keccak256, { hashLeaves: true, sortPairs: true })
        // const root = tree.getHexRoot()
        // const leaf = keccak256("zkplayground")
        // const proof = tree.getHexProof(leaf)
        // console.log(tree.getHexRoot())
        // console.log(tree.getHexProof(leaf))
        // console.log(tree.verify(proof, leaf, root))
        //
        // const p4 = await contractInstance.methods.merkleProof(proof)
        //     .send({ from: user[0], gas: 4400000 })
        //     .once("error", (err) => {
        //         console.log(err)
        //     }).then((receipt) => {
        //         console.log(receipt)
        //     })
    }
```
