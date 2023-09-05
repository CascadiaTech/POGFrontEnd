import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const Web3ReactProvider = useWeb3React(getLibrary);
