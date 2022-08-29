import React, { useState } from "react";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import * as Web3 from 'web3';
let web3 = new Web3(window.ethereum);

export function ClaimButton() {
    const [claiming, setClaiming] = useState(false);
    const [p2ANS, setANS] = useState('');

    const abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amountInFinney",
                    "type": "uint256"
                }
            ],
            "name": "claim",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getScore1",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getScore2",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getScore3",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getScore4",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "proof",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "bytes32",
                    "name": "root",
                    "type": "bytes32"
                }
            ],
            "name": "merkleProof",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_answer",
                    "type": "string"
                }
            ],
            "name": "QFwithZKP",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "_flag",
                    "type": "bool"
                }
            ],
            "name": "setOpening",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "claimed",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "deposited",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "hashes",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "opening",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "score",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "problem1",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "problem2",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "problem3",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "problem4",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const contractAddr = "0x847FB490b9255758738c1DBddD9E3049E9bC86c8"

    const handleChange = (event) => {
        setANS(event.target.value);
    };

    async function answerP2(_ans) {
        setClaiming(true);
        let user = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
                console.error(err);
            })
        
        let contractInstance = new web3.eth.Contract(abi, contractAddr, {
            from: user[0], // default from address
        });

        const GoP2 = await contractInstance.methods
            .QFwithZKP(p2ANS)
            .send({ from: user[0], gas: 4400000 })
            .once("error", (err) => {
                console.log(err)
            }).then((receipt) => {
                console.log(receipt)
            })
        setClaiming(false);
    }

    return (
        <div>
            <p>
                <FormControl fullWidth sx={{ m: 1, width: '20ch' }} variant="standard">
                    <InputLabel id="demo-simple-select-label">Problem 2</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={p2ANS}
                    label="p2ANS"
                    onChange={handleChange}
                    >
                        <MenuItem value={'Dark Forest'}>1. Dark Forest</MenuItem>
                        <MenuItem value={'Plonk'}>2. Plonk</MenuItem>
                        <MenuItem value={'MACI'}>3. MACI</MenuItem>
                        <MenuItem value={'Bulletproof'}>4. Bulletproof</MenuItem>
                        <MenuItem value={'Sonic'}>5. Sonic</MenuItem>
                        <MenuItem value={'Marlin'}>6. Marlin</MenuItem>
                        <MenuItem value={'ECDSA'}>7. ECDSA</MenuItem>
                    </Select>
                </FormControl>
            </p>
            <Button
                variant="outlined"
                style={{
                    borderRadius: 35,
                    backgroundColor: "#F1F0CC",
                    padding: "8px 16px",
                    fontSize: "6px"
                }}
                disabled={claiming}
                onClick={(e) => {
                    e.preventDefault();
                    answerP2(p2ANS);
                }} >
                {claiming ? "Submitting Now..." : "Submit Problem 2 ans!"}
            </Button>
        </div>
    );
}