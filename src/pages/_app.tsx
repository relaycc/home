import { useEffect, useState } from "react";
import { GlobalStyles } from "@/components/GlobalStyles";
import type { AppProps } from "next/app";
import { ReceiverThemeProvider } from "@/design/ReceiverThemeProvider";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { XmtpProvider } from "@relaycc/xmtp-hooks";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PlausibleProvider } from "@/lib/plausible/PlausibleProvider";
import "../styles/baseStyles.css";
import Head from "next/head";

export const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
});

export default function App({ Component, pageProps }: AppProps) {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setWorker(new Worker("/xmtp.js"));
  }, []);
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="font"
          href="/fonts/Satoshi-Regular.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/Satoshi-Medium.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/Satoshi-Bold.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/Satoshi-Black.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <PlausibleProvider>
        <ReceiverThemeProvider>
          <WagmiConfig client={client}>
            <RainbowKitProvider chains={chains}>
              <GlobalStyles />
              {(() => {
                if (worker === null) {
                  return null;
                } else {
                  return (
                    <XmtpProvider config={{ worker: worker as Worker }}>
                      <Component {...pageProps} />
                    </XmtpProvider>
                  );
                }
              })()}
            </RainbowKitProvider>
          </WagmiConfig>
        </ReceiverThemeProvider>
      </PlausibleProvider>
    </>
  );
}
