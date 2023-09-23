import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import "../styles/fonts.css";
import { darkTheme, getDefaultWallets, midnightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    goerli,
    zora,
    goerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);


const { connectors } = getDefaultWallets({
  appName: 'Linq',
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
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider    theme={darkTheme({
      accentColor: 'linear-gradient(135deg, #131313 0%, #2A2A2A 27%, #060606 100%);',
      accentColorForeground: 'white',
      borderRadius: 'large',
      fontStack: 'system',
      overlayBlur: 'small',
    })} chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
