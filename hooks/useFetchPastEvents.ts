import React, { useState, useEffect } from "react";
import POGAbi from "../abi/Pot_Of_Greed.mjs";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import web3 from "web3";

const contract = "0x7fB3b2E60F75289f59b2A95Bb204fC648C97b5E6";
const { address, isConnected } = useAccount();
let current_chain = 1;
const [amount, setAmount] = useState("");
const [hasAllowance, setHasAllowance] = useState(false);
const amountToBurn = ethers.parseUnits("1000", 18);
const [participantCountNumber, setParticipantCountNumber] = useState(Number);
const [getRoundState, setRoundState] = useState(false);
const [state, setState] = useState(true);

const [pogPotDropData, setPogPotDropData] = useState<{ LPDROP: string }[]>([]);
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/828ea3605e46462dac5189cc7a852d79');
const pogContractInstance = new ethers.Contract(contract, POGAbi, provider)

const useFetchPastEvents = () => {
    const { address, isConnected } = useAccount();
    const [totalBurned, setTotalBurned] = useState(0);
    
    const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/828ea3605e46462dac5189cc7a852d79');
    const pogContractInstance = new ethers.Contract(contract, POGAbi, provider);

    useEffect(() => {
        const getTotalBurnedTokens = async () => {
            try {
                // Query for Transfer events with 'to' = burn address
                const filter = pogContractInstance.filters.Transfer(
                    null, // from (null to get any address)
                    '0x0000000000000000000000000000000000000000' // burn address
                );
                
                const events = await pogContractInstance.queryFilter(filter);
                
                const totalBurnedAmount = events.reduce((sum, event) => {
                    return sum + event.args.value.toBigInt();
                }, 0n);

                setTotalBurned(ethers.utils.formatUnits(totalBurnedAmount, 18));
                console.log(`Total Burned POG Tokens: ${totalBurnedAmount.toString()} POG`);
            } catch (error) {
                console.error("Error fetching burned tokens:", error);
            }
        };

        if (isConnected) {
            getTotalBurnedTokens();
        }
    }, [isConnected, pogContractInstance]);

    return totalBurned;
};

export default useFetchPastEvents;