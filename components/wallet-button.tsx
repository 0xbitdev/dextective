"use client"

import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { IconWallet } from '@tabler/icons-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function WalletButton() {
  const { publicKey, disconnect, signMessage, connect } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rpcError, setRpcError] = useState<string | null>(null)
  const [hasRequestedSign, setHasRequestedSign] = useState(false)
  const [signRetryCount, setSignRetryCount] = useState(0)

  // Only fetch balance after the user has confirmed the signature
  // (hasRequestedSign === true). This ensures we wait for wallet
  // confirmation before calling RPC. If the RPC responds with 403,
  // we will reset `hasRequestedSign` to false to request signature again
  // (with a small retry cap) so the user can re-confirm.
  useEffect(() => {
    if (!publicKey || !hasRequestedSign) {
      setBalance(null)
      return
    }

    const fetchBalance = async () => {
      try {
        setIsLoading(true)
        const balanceInLamports = await connection.getBalance(publicKey)
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL
        setBalance(balanceInSOL)
        setRpcError(null)

        // After successful fetch, store wallet info
        try {
          localStorage.setItem('wallet_address', publicKey.toBase58())
          localStorage.setItem('wallet_balance', String(balanceInSOL))
        } catch (e) {
          console.warn('Failed to write wallet info to localStorage', e)
        }
      } catch (error) {
        console.error('[v0] Error fetching balance:', error)
        const msg = (error as any)?.message ?? String(error)
        if (msg.includes('403') || msg.includes('Access forbidden')) {
          // On 403, don't keep fetching. Prompt user to re-confirm by
          // resetting the signature flag so the signing flow will run again.
          setRpcError('RPC access forbidden (403). Will request wallet confirmation again.')
          setBalance(null)
          if (signRetryCount < 2) {
            setSignRetryCount((c) => c + 1)
            setHasRequestedSign(false)
          }
        } else {
          setRpcError('Failed to fetch balance')
          setBalance(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()

    const interval = setInterval(fetchBalance, 30000)
    return () => clearInterval(interval)
  }, [publicKey, connection, hasRequestedSign, signRetryCount])

  const handleConnect = async () => {
    // Prefer opening the modal if available. If that fails or is not
    // available, fall back to the adapter `connect()` method.
    try {
      if (typeof setVisible === 'function') {
        setVisible(true)
        return
      }
    } catch (err) {
      // ignore and try connect()
    }

    try {
      if (connect) await connect()
    } catch (error: any) {
      // WalletNotSelectedError or user rejection are expected possibilities
      const msg = error?.message ?? String(error)
      if (msg.includes('User rejected') || msg.includes('WalletNotSelectedError')) {
        console.log('[v0] Wallet connection cancelled or no wallet selected')
        return
      }
      console.error('[v0] Wallet connection error:', error)
    }
  }

  // When the wallet connects (publicKey set), request a signature to confirm user action
  // and store the publicKey in localStorage for other modules.
  useEffect(() => {
    if (!publicKey || hasRequestedSign) return

    const doSign = async () => {
      try {
        setIsLoading(true)
        // Construct a simple message for the user to sign.
        const message = `Sign this message to authenticate with Dextective at ${new Date().toISOString()}`
        if (signMessage) {
          const encoded = new TextEncoder().encode(message)
          await signMessage(encoded)
        } else {
          // If the adapter doesn't support `signMessage`, skip signing but still proceed.
          console.warn('[v0] Wallet adapter does not support signMessage; skipping signature')
        }

        // Mark that we've received confirmation via signature so the
        // balance fetch effect can run.
        setHasRequestedSign(true)
        setRpcError(null)
      } catch (err: any) {
        const msg = err?.message ?? String(err)
        if (msg.includes('User rejected') || msg.includes('User cancelled')) {
          console.log('[v0] User rejected signature')
        } else {
          console.error('[v0] Signature error:', err)
          setRpcError('Signature request failed')
        }
      } finally {
        setIsLoading(false)
      }
    }

    doSign()
  }, [publicKey, signMessage, hasRequestedSign])

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('[v0] Wallet disconnect error:', error)
    }
  }

  const truncateAddress = (addr?: string) => {
    if (!addr) return ''
    if (addr.length <= 10) return addr
    return `${addr.slice(0, 4)}.....${addr.slice(-5)}`
  }

  if (publicKey) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleDisconnect}
        type="button"
        className="gap-2"
      >
        <IconWallet className="size-4" />
        <span className="text-sm font-mono">
          {truncateAddress(publicKey.toBase58())}
        </span>
        <span className="px-1">-</span>
        <span className="tabular-nums">
          {isLoading
            ? '...'
            : rpcError
            ? 'RPC error'
            : balance !== null
            ? `${balance.toFixed(4)} SOL`
            : '0.0000 SOL'}
        </span>
        {rpcError && (
          <span className="ml-2 text-xs text-red-400" title={rpcError}>
            !
          </span>
        )}
      </Button>
    )
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleConnect}
      type="button"
      className="gap-2"
    >
      <IconWallet className="size-4" />
      Connect Wallet
    </Button>
  )
}
