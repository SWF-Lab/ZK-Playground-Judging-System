# ZK-Playground-Judging-System
#4-This dapp is for the ZK-Playground(EF-Grants) Homework 0.

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
