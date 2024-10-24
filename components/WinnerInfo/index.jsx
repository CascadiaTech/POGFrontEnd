import { useEffect, useState } from 'react';
import { useContractEvent } from 'wagmi';
import { ethers } from 'ethers';

// Contract ABI (Ensure it contains the event PogPotDrop)
const contractAbi = [
  "event PogPotDrop(uint256 indexed LPDROP)"
];

export default function PogPotDropEvent({ contractAddress }) {
  const [pogPotDropData, setPogPotDropData] = useState([]);

  // useContractEvent listens to the PogPotDrop event
  useContractEvent({
    address: contractAddress,
    abi: contractAbi,
    eventName: 'PogPotDrop',
    listener: (LPDROP) => {
      const formattedData = ethers.utils.formatEther(LPDROP);
      setPogPotDropData(prevData => [...prevData, formattedData]);
    },
  });

  return (
    <div>
      <h2>Pog Pot Drop Events</h2>
      {pogPotDropData.length > 0 ? (
        <ul>
          {pogPotDropData.map((data, index) => (
            <li key={index}>
              LPDROP Amount: {data} POG
            </li>
          ))}
        </ul>
      ) : (
        <p>No Pog Pot Drops recorded yet.</p>
      )}
    </div>
  );
}

//   // useContractEvent listens to the PogPotDrop event
//   useContractEvent({
//     address: contract,
//     abi: POGAbi,
//     eventName: 'PogPotDrop',
//     listener: (LPDROP) => {
//       console.log(LPDROP, "<---- here is my lp drop");
//     },
//   });

//   const fromBlock = 20943822; // Starting block
//   const toBlock = 20943824; //Ending Block
//   const batchSize = 5; // Set the size of block range to query at once

//   // Function to fetch logs in batches
//   const fetchLogsInBatches = async (startBlock: Number, endBlock: Number) => {
//       const filter = {
//         fromBlock: startBlock,
//         toBlock: endBlock,
//         topics: [
//           '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer event signature
//           '0x000000000000000000000000301a22208f19be432f9eb90eafbaa7390097e63d', // from address
//           '0x0000000000000000000000007fb3b2e60f75289f59b2a95bb204fc648c97b5e6', // to address
//         ],
//       };

//       provider.getLogs(filter).then((logs) => {
//         // Process the log array
//         console.log(logs);
//       });
//       const logs: any[] = [];
//       console.log(`Filter: ${JSON.stringify(filter)}`);

//       // Loop through block ranges
//       for (let block = startBlock; block <= endBlock; block += batchSize) {
//           const nextBlock = Math.min(block + batchSize - 1, endBlock); // Calculate the next block range
//           console.log(`Fetching logs from block ${block} to ${nextBlock}`);

//           try {
//               const batchLogs = await provider.getLogs({
//                   ...filter,
//                   fromBlock: block,
//                   toBlock: nextBlock,
//               });
//               logs.push(...batchLogs); // Add the logs to our main array
//           } catch (error) {
//               console.error(`Error fetching logs from block ${block} to ${nextBlock}:`, error);
//           }
//       }

//       return logs;
//   };

//   useEffect(() => {
//     const fetchLogs = async () => {
//         const latestBlock = await provider.getBlockNumber(); // Get the latest block number
//         const logs = await fetchLogsInBatches(fromBlock, latestBlock); // Fetch logs in batches
//         const parsedLogs = logs.map((log) => pogContractInstance.interface.parseLog(log));

//         // Process parsed logs
//         const pogPotDrops = parsedLogs.map((log:any) => ({
//             LPDROP: ethers.formatEther(log.args.LPDROP), // Format the LPDROP value
//         }));

//         setPogPotDropData(pogPotDrops);
//     };

//     fetchLogs();
// }, []);
