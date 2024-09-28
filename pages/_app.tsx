import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/fonts.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import getConfig from "next/config";
import { publicProvider } from "wagmi/providers/public";
import {} from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { mainnet, sepolia } from "@wagmi/chains";
import { useRouter } from "next/router";

export const SEPOLIA_RPC: string =
  "https://sepolia.infura.io/v3/bb5aba038922440d98997c4e3dc568f2";

const { publicRuntimeConfig } = getConfig();
const { ENABLE_TESTNETS, NEXT_PUBLIC_ALCHEMY_API_KEY } = publicRuntimeConfig;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    infuraProvider({ apiKey: "bb5aba038922440d98997c4e3dc568f2" }),
    // alchemyProvider({ apiKey: '5jrjQqMxKrCo4j8_vJmS2CnLAkwQBNbW' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "LinqTest",
  projectId: "e860804a2106941d3e0efee245ad7d7a",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 1.5 } },
  };
  const router = useRouter();

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor:
            "linear-gradient(135deg, #131313 0%, #2A2A2A 27%, #060606 100%)",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
        chains={chains}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
