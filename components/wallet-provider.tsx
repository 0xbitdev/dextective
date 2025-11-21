"use client"

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { useMemo } from 'react'

require('@solana/wallet-adapter-react-ui/styles.css')

export function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet
  // Allow overriding the RPC endpoint via `NEXT_PUBLIC_SOLANA_RPC_URL`.
  // Useful when the default public RPC is rate-limited or requires an API key.
  const endpoint = useMemo(() => {
    const proxyDefault = '/api/solana-proxy'
    const envUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL

    // When running on the server (prerender/build), the ConnectionProvider
    // requires an absolute HTTP(S) URL. During client runtime we prefer the
    // local proxy if the NEXT_PUBLIC is set to the public mainnet URL so
    // browser requests go through the server proxy and avoid 403/CORS.
    const isServer = typeof window === 'undefined'

    if (isServer) {
      return envUrl && envUrl.length > 0 ? envUrl : clusterApiUrl(network)
    }

    // client runtime
    if (envUrl === 'https://api.mainnet-beta.solana.com') {
      // Use an absolute URL for the local proxy so `Connection` accepts it.
      // window.location.origin is available on the client.
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      return origin ? `${origin}${proxyDefault}` : proxyDefault
    }

    return envUrl && envUrl.length > 0 ? envUrl : clusterApiUrl(network)
  }, [network])

  // Helpful debug: show the endpoint the client is using at runtime.
  // This will appear in the browser console (client-side) when the component mounts.
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.debug('[dextective] Solana RPC endpoint:', endpoint)
  }

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  )

  const onError = (error: any) => {
    // Silently ignore user rejection errors - this is expected behavior
    if (
      error?.message?.includes('User rejected') ||
      error?.message?.includes('User cancelled') ||
      error?.name === 'WalletConnectionError'
    ) {
      return
    }
    // Log other errors
    console.error('Wallet error:', error)
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export { WalletContextProvider as WalletProviderWrapper }
