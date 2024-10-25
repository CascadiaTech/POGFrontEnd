// import { useEffect, useState } from "react";
// import { Contract, ethers, JsonRpcProvider } from "ethers";
// import { useAccount } from "wagmi";
// import POGAbi from "../abi/Pot_Of_Greed.mjs";

// const provider = new JsonRpcProvider('https://mainnet.infura.io/v3/828ea3605e46462dac5189cc7a852d79');

// export function useFetchLogs(contractAddress:Contract, abi:any, fromBlock:any, batchSize = 2) {
//   const [logsData, setLogsData] = useState<{ LPDROP: string }[]>([]);
//   const contract = "0x7fB3b2E60F75289f59b2A95Bb204fC648C97b5E6";
//   const { address, isConnected } = useAccount();
//   let current_chain = 1;
//   const [amount, setAmount] = useState("");
//   const [hasAllowance, setHasAllowance] = useState(false);
//   const amountToBurn = ethers.parseUnits("1000", 18);
//   const [participantCountNumber, setParticipantCountNumber] = useState(Number);
//   const [getRoundState, setRoundState] = useState(false);
//   const [state, setState] = useState(true);

//   const [pogPotDropData, setPogPotDropData] = useState<{ LPDROP: string }[]>([]);
//   const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/828ea3605e46462dac5189cc7a852d79');
//   const pogContractInstance = new ethers.Contract(contract, POGAbi, provider)

//   // Helper function to fetch logs in batches
//   const fetchLogsInBatches = async (startBlock: number, endBlock: number) => {
//     const filter = {
//       fromBlock: startBlock,
//       toBlock: endBlock,
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer event signature
//         '0x000000000000000000000000301a22208f19be432f9eb90eafbaa7390097e63d', // from address
//         '0x0000000000000000000000007fb3b2e60f75289f59b2a95bb204fc648c97b5e6', // to address
//       ],
//     };

//     let allLogs = [];

//     // Iterate through the blocks in batches
//     for (let block = startBlock; block <= endBlock; block += batchSize) {
//       const nextBlock = Math.min(block + batchSize - 1, endBlock);
//       console.log(`Fetching logs from block ${block} to ${nextBlock}`);

//       try {
//         const batchLogs = await provider.getLogs({ ...filter, fromBlock: block, toBlock: nextBlock });
//         allLogs.push(...batchLogs);
//       } catch (error) {
//         console.error(`Error fetching logs from block ${block} to ${nextBlock}:`, error);
//       }
//     }

//     return allLogs;
//   };

//   // Fetch and parse logs on mount
//   useEffect(() => {
//     const fetchLogs = async () => {
//       const latestBlock = await provider.getBlockNumber();
//       const logs = await fetchLogsInBatches(fromBlock, latestBlock);

//       const parsedLogs = logs.map((log) => pogContractInstance.interface.parseLog(log));
//       const formattedLogs = parsedLogs.map((log: any) => ({
//         LPDROP: ethers.formatEther(log.args.LPDROP),
//       }));

//       setLogsData(formattedLogs);
//     };

//     fetchLogs();
//   }, [contractAddress, fromBlock, abi, batchSize]);

//   return logsData;
// }
