"use client";

import { FC, ReactNode, useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet as useAdapterWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BitgetWalletAdapter,
  AlphaWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export const AppWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BitgetWalletAdapter(),
      new AlphaWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

// ✅ Custom wrapper hook (typed)
export function useWallet() {
  const { connected, publicKey, wallet } = useAdapterWallet();

  return {
    isConnected: connected, // alias for clarity
    walletAddress: publicKey?.toBase58() ?? null,
    selectedWallet: wallet
      ? {
          name: wallet.adapter.name,
          icon: wallet.adapter.icon,
          type: "solana",
        }
      : null,
  };
}
