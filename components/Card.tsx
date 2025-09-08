"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Droplets, Clock, CheckCircle, AlertCircle, Wallet, Network, Zap, Copy } from "lucide-react"
import { toast } from "sonner"
import { useWallet } from "@/context/wallet-context"
import Image from "next/image"

const solanaNetworks = [
  { id: "mainnet", name: "Mainnet Beta", description: "Production network", rpc: "https://api.mainnet-beta.solana.com", disabled: true },
  { id: "devnet", name: "Devnet", description: "Development network", rpc: "https://api.devnet.solana.com" },
  { id: "testnet", name: "Testnet", description: "Test network", rpc: "https://api.testnet.solana.com" },
  { id: "custom", name: "Custom RPC", description: "Custom RPC endpoint", rpc: "" },
]

export function SolCard() {
  const [selectedNetwork, setSelectedNetwork] = useState("devnet")
  const [customRpc, setCustomRpc] = useState("")
  const [solAmount, setSolAmount] = useState("1.0")
  const [isLoading, setIsLoading] = useState(false)
  const [lastDrop, setLastDrop] = useState<Date | null>(null)

  const { isConnected, selectedWallet, walletAddress } = useWallet()

  const handleSolDrop = async () => {
    if (!isConnected) {
      toast.error("Wallet Not Connected", { description: "Please connect your Solana wallet first." })
      return
    }

    if (selectedWallet?.type !== "solana") {
      toast.error("Wrong Wallet Type", { description: "Please connect a Solana wallet (Phantom, Solflare, etc.)" })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setLastDrop(new Date())
      toast.success("SOL Airdropped Successfully! ✨", {
        description: `${solAmount} SOL sent to your wallet on ${
          solanaNetworks.find((n) => n.id === selectedNetwork)?.name
        }`,
      })
    }, 3000)
  }

  const canRequestTokens = !lastDrop || Date.now() - lastDrop.getTime() > 24 * 60 * 60 * 1000
  const currentNetwork = solanaNetworks.find((n) => n.id === selectedNetwork)

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      toast("Wallet Address Copied ✅", { description: "Your address was copied to clipboard." })
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="h-12 w-12   flex items-center justify-center">
            <Image src="/logo.svg" width={42} height={42} alt="Logo" />
          </div>
          <CardTitle className="text-3xl font-bold">True-Faucet</CardTitle>
        </div>
        <CardDescription className="text-lg">Get free SOL tokens for development</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {isConnected && selectedWallet && (
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5" />
                <span className="text-sm font-medium">Connected Wallet</span>
              </div>
              <Badge variant="outline">Connected</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {selectedWallet.icon && (
                  <img
                    src={selectedWallet.icon}
                    alt={selectedWallet.name.toString()}
                    className="h-5 w-5"
                  />
                )}
                <span className="text-sm font-medium">{selectedWallet.name.toString()}</span>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded">
                <span className="font-mono text-xs break-all flex-1">{walletAddress}</span>
                <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* SOL Amount */}
        <div className="space-y-3">
          <Label htmlFor="sol-amount" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>SOL Amount</span>
          </Label>
          <div className="relative">
            <Input
  id="sol-amount"
  type="number"
  step="0.1"
  min="0.1"
  max="5.0"
  value={solAmount}
  onChange={(e) => setSolAmount(e.target.value)}
  placeholder="1.0"
  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
/>

            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Badge variant="outline">SOL</Badge>
            </div>
          </div>
        </div>

        {/* Network Selection */}
        <div className="space-y-3">
          <Label htmlFor="network" className="flex items-center space-x-2">
            <Network className="h-4 w-4" />
            <span>Solana Network</span>
          </Label>
          <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {solanaNetworks.map((network) => (
                <SelectItem key={network.id} value={network.id} disabled={network.disabled}>
                  <div className="flex flex-col">
                    <span className="font-medium">{network.name}</span>
                    <span className="text-xs text-muted-foreground">{network.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom RPC */}
        {selectedNetwork === "custom" && (
          <div className="space-y-3">
            <Label htmlFor="custom-rpc">Custom RPC URL</Label>
            <Input
              id="custom-rpc"
              placeholder="https://your-custom-solana-rpc.com"
              value={customRpc}
              onChange={(e) => setCustomRpc(e.target.value)}
            />
          </div>
        )}

        {/* Last Drop */}
        {lastDrop && (
          <div className="flex items-center space-x-2 p-3 border rounded">
            {canRequestTokens ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Ready for next airdrop</span>
              </>
            ) : (
              <>
                <Clock className="h-5 w-5" />
                <span className="text-sm">Last drop: {lastDrop.toLocaleTimeString()}</span>
              </>
            )}
          </div>
        )}

        {/* Airdrop Button */}
        <Button
          onClick={handleSolDrop}
          disabled={isLoading || !canRequestTokens || !isConnected || selectedWallet?.type !== "solana"}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
              Airdropping SOL...
            </>
          ) : !isConnected ? (
            <>
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </>
          ) : selectedWallet?.type !== "solana" ? (
            <>
              <AlertCircle className="h-4 w-4 mr-2" />
              Wrong Wallet Type
            </>
          ) : (
            <>
              <Droplets className="h-4 w-4 mr-2" />
              Airdrop {solAmount} SOL
            </>
          )}
        </Button>

        {!canRequestTokens && (
          <div className="flex items-center space-x-3 p-3 border rounded">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Rate limited: 1 drop / 24h</span>
          </div>
        )}

        {currentNetwork && selectedNetwork !== "custom" && (
          <div className="p-3 border rounded">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Network className="h-3 w-3" />
              <span>RPC: {currentNetwork.rpc}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
