async function fetchData() {
    const response = await fetch('https://gateway-arbitrum.network.thegraph.com/api/YOUR_API_KEY/subgraphs/id/5gByjbCu558gLVwzvWiYD8JPQC8KLk6PSe9AVFy8LC69', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            lockers(first: 5) {
              id
              totalLocks
              totalTokens
              feeWhitelist {
                id
              }
              fees {
                flatRate
                percentage
                minFee
                maxFee
              }
            }
          }
        `,
        variables: {},
      }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
  
    const data = await response.json();
    console.log(data);
  }
  
  fetchData();
  