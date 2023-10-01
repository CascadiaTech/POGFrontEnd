import { useState, useEffect } from 'react';

const EthereumRPC = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'; // Replace with your Infura project ID

interface BlockTimestampProps {
  blockTimestamp: number; // Replace 'number' with the actual type of blockTimestamp
}

function getCurrentBlockTimestamp() {
  const requestData = {
    jsonrpc: '2.0',
    method: 'eth_getBlockByNumber',
    params: ['latest', false], // 'latest' block and include transactions (false)
    id: 1,
  };

  return fetch(EthereumRPC, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.result) {
        const timestampHex = data.result.timestamp;
        const timestampInSeconds = parseInt(timestampHex, 16);
        return new Date(timestampInSeconds * 1000); // Convert to JavaScript Date
      } else {
        throw new Error('Error fetching block timestamp');
      }
    });
}

function BlockTimestamp({ blockTimestamp }: BlockTimestampProps) {
  const [currentBlockTimestamp, setCurrentBlockTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    if (blockTimestamp) {
      setCurrentBlockTimestamp(new Date(blockTimestamp));
    } else {
      getCurrentBlockTimestamp()
        .then((timestamp) => setCurrentBlockTimestamp(timestamp))
        .catch((error) => console.error(error));
    }
  }, [blockTimestamp]);

  return (
    <div>
      <h1>Current Block Timestamp:</h1>
      {currentBlockTimestamp ? <p>{currentBlockTimestamp.toString()}</p> : <p>Loading...</p>}
    </div>
  );
}

export default BlockTimestamp;
