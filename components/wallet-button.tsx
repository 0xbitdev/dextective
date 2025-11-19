"use client"

import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { IconWallet } from '@tabler/icons-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function WalletButton() {
  const { publicKey, disconnect } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!publicKey) {
      setBalance(null)
      return
    }

    const fetchBalance = async () => {
      try {
        setIsLoading(true)
        const balanceInLamports = await connection.getBalance(publicKey)
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL
        setBalance(balanceInSOL)
      } catch (error) {
        console.error('[v0] Error fetching balance:', error)
        setBalance(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()

    // Update balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000)

    return () => clearInterval(interval)
  }, [publicKey, connection])

  const handleConnect = async () => {
    try {
      setVisible(true)
    } catch (error: any) {
      if (error?.message?.includes('User rejected')) {
        console.log('[v0] User cancelled wallet connection')
        return
      }
      console.error('[v0] Wallet connection error:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('[v0] Wallet disconnect error:', error)
    }
  }

  if (publicKey) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleDisconnect}
        className="gap-2"
      >
        <IconWallet className="size-4" />
        <span className="tabular-nums">
          {isLoading ? '...' : balance !== null ? `${balance.toFixed(4)} SOL` : '0.0000 SOL'}
        </span>
      </Button>
    )
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleConnect}
      className="gap-2"
    >
      <IconWallet className="size-4" />
      Connect Wallet
    </Button>
  )
}
