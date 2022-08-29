import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { Claim } from "../Claim";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import * as Web3 from 'web3';
let web3 = new Web3(window.ethereum);

const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256");

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Hello! Log-in with Metamask!';
const CONNECTED_TEXT = 'Sign Up Now!';

export function OnboardingButton() {
    const [isLoging, setIsLoging] = useState(false);
    const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const onboarding = React.useRef();

    const [score, setScore] = useState(0);
    const [P1, setP1] = useState(false);
    const [P2, setP2] = useState(false);
    const [P3, setP3] = useState(false);
    const [P4, setP4] = useState(false);


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


    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                // CONNECTED_TEXT = `Your Account is: ${accounts[0]}`;
                setButtonText(CONNECTED_TEXT);
                setDisabled(true);
                setIsLoging(true);
                onboarding.current.stopOnboarding();
            } else {
                setButtonText(CONNECT_TEXT);
                setDisabled(false);
            }
        }
    }, [accounts]);

    useEffect(() => {
        function handleNewAccounts(newAccounts) {
            setAccounts(newAccounts);
        }
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleNewAccounts)
            window.ethereum.on('accountsChanged', handleNewAccounts);
            console.log(accounts[0]);
        }
    }, []);

    const refresh = async () => {
        
        let user = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
                console.error(err);
            })

        let contractInstance = new web3.eth.Contract(abi, contractAddr, {
            from: user[0], // default from address
        });

        var refetch = await contractInstance.methods.score(user[0]).call()

        var refetchP1 = await refetch["problem1"]
        var refetchP2 = await refetch["problem2"]
        var refetchP3 = await refetch["problem3"]
        var refetchP4 = await refetch["problem4"]

        setP1(refetchP1)
        setP2(refetchP2)
        setP3(refetchP3)
        setP4(refetchP4)

        var temp = 0
        if (P1){ temp += 1 }
        if (P2){ temp += 2 }
        if (P3){ temp += 3 }
        if (P4){ temp += 3 }
        setScore(`${temp} / 9`)
    }

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

    const searchAccount = async (addr) => {
        let contractInstance = new web3.eth.Contract(abi, contractAddr, {
            from: addr, // default from address
        });

        var refetch = await contractInstance.methods.score(addr).call()

        var refetchP1 = await refetch["problem1"]
        var refetchP2 = await refetch["problem2"]
        var refetchP3 = await refetch["problem3"]
        var refetchP4 = await refetch["problem4"]

        var temp = 0
        if (refetchP1) { temp += 1 }
        if (refetchP2) { temp += 2 }
        if (refetchP3) { temp += 3 }
        if (refetchP4) { temp += 3 }

        console.log(`Score: ${temp} \n P1: ${refetchP1} \n P2: ${refetchP2} \n P3: ${refetchP3} \n refetchP4: ${refetchP4} \n`)
        setSearch(`【Score】 ${temp} 【P1】 ${refetchP1} 【P2】  ${refetchP2} 【P3】 ${refetchP3} 【P4】 ${refetchP4} \n`)
    }

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((newAccounts) => setAccounts(newAccounts));
        } else {
            onboarding.current.startOnboarding();
        }
    };

    const [search, setSearch] = useState(0);
    const [values, setValues] = useState({
        id: ""
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div>
            {!isLoging &&
                <Button variant="outlined"
                    disabled={isDisabled} onClick={onClick}
                    style={{
                        borderRadius: 35,
                        backgroundColor: "#F1F0CC",
                        padding: "12px 24px",
                        fontSize: "9px"
                    }}>
                    {buttonText}
                </Button>
            }

            {isLoging &&
                <Container sx={{ py: 2.8 }} maxWidth="md">
                    <Card sx={{ maxWidth: 555 }}>
                        <CardHeader
                            avatar={
                                P1 && P2 && P3 && P4 ?
                                    <Avatar sx={{ bgcolor: "#23967F" }} aria-label="recipe">
                                        <DoneIcon />
                                    </Avatar>
                                    :
                                    <Avatar sx={{ bgcolor: "#A63446" }} aria-label="recipe">
                                        <ClearIcon />
                                    </Avatar>
                            }
                            title={accounts}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                <b>Total Score: </b>{score}
                                <ul>
                                    <li><b>Problem 1: </b>{P1 ? "Accepted" : "Error"}</li>
                                    <li><b>Problem 2: </b>{P2 ? "Accepted" : "Error"}</li>
                                    <li><b>Problem 3: </b>{P3 ? "Accepted" : "Error"}</li>
                                    <li><b>Problem 4: </b>{P4 ? "Accepted" : "Error"}</li>
                                    <li><a href="https://goerli.etherscan.io/address/0x847FB490b9255758738c1DBddD9E3049E9bC86c8" target="blank" >Contract Address on Goerli</a></li>
                                </ul>
                            </Typography>
                            <Button variant="outlined"
                                onClick={() => 
                                    refresh()
                                }
                                style={{
                                    borderRadius: 35,
                                    backgroundColor: "#F1F0CC",
                                    padding: "8px 16px",
                                    fontSize: "6px"
                                }}>
                                Refresh
                            </Button>
                            

                        </CardContent>
                    </ Card>
                </Container>
            }
            
            {isLoging && !P2 &&
                <Claim />
            }

            {/* <Button variant="outlined"
                onClick={() => part3()}
                style={{
                    borderRadius: 35,
                    backgroundColor: "#F1F0CC",
                    padding: "8px 16px",
                    fontSize: "6px"
                }}>
                Part 3
            </Button>
            <Button variant="outlined"
                onClick={() => part4()}
                style={{
                    borderRadius: 35,
                    backgroundColor: "#F1F0CC",
                    padding: "8px 16px",
                    fontSize: "6px"
                }}>
                Part 4
            </Button> */}

            <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-id">Address</InputLabel>
                <Input
                    id="standard-adornment-id"
                    value={values.id}
                    onChange={handleChange('id')}
                    startAdornment={<InputAdornment position="start"> - </InputAdornment>}
                />
            </FormControl>
            <Button variant="outlined"
                onClick={() => searchAccount(values.id)}
                style={{
                    borderRadius: 35,
                    backgroundColor: "#F1F0CC",
                    padding: "8px 16px",
                    fontSize: "6px"
                }}>
                Search
            </Button>
            <Typography variant="body2" color="text.secondary">
                {search}
            </Typography>
        </div>
    );
}