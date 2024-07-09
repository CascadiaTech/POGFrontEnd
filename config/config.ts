import getConfig from "next/config";
import { goerli, mainnet, sepolia } from "wagmi/chains";
// import { FeeAmount } from "@uniswap/v3-sdk";
// import { CONTRACT_NAMES } from "../constants/contractReferences";
// import { ProtocolVersion } from "../constants/uniswap";

const { publicRuntimeConfig } = getConfig();
const { ENABLE_TESTNETS, NEXT_PUBLIC_ALCHEMY_API_KEY } = publicRuntimeConfig;
// const HTTP_LOCAL_RPC: string = "http://localhost:8545";
const HTTP_MAINNET_RPC: string = "https://sepolia.infura.io/v3/bb5aba038922440d98997c4e3dc568f2";
const WSS_SEPOLIA_RPC: string =
  "wss://sepolia.infura.io/ws/v3/bb5aba038922440d98997c4e3dc568f2";
export const ALCHEMY_MAINNET_RPC: string =
  "https://eth-mainnet.g.alchemy.com/v2/";
export const ALCHEMY_TESTNET_RPC: string =
  "https://eth-goerli.g.alchemy.com/v2/";

export const SEPOLIA_RPC: string = "https://sepolia.infura.io/v3/bb5aba038922440d98997c4e3dc568f2";

export type RPCServer = {
  chainId: number;
  RPCServer: string;
  WebSocket: string;
};

interface AppConfig {
  appName: string;
  projectId: string;
  wagmiProviderConfig: {
    networks: any[];
    alchemyApiKey: any;
    infuraApiKey: string;
    RPCServerAddress: RPCServer[];
  };
}



const networks: any[] = ENABLE_TESTNETS ? [mainnet] : [sepolia];

console.log("Configured networks:", networks);

const appConfig: AppConfig = {
  appName: "KURVE",
  projectId: "e860804a2106941d3e0efee245ad7d7a",
  wagmiProviderConfig: {
    networks,
    alchemyApiKey: NEXT_PUBLIC_ALCHEMY_API_KEY,
    infuraApiKey: "e860804a2106941d3e0efee245ad7d7a",
    RPCServerAddress: [
      {
        chainId: sepolia.id,
        RPCServer: SEPOLIA_RPC,
        WebSocket: WSS_SEPOLIA_RPC,
        
      },
    ],
  },
};


export default appConfig;
