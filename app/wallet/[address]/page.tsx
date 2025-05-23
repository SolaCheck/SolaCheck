"use client";

import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useParams } from "next/navigation";
import Image from "next/image";

interface NFT {
  name: string;
  uri: string;
  mint: string;
}

interface SPLToken {
  mint: string;
  amount: number;
  decimals: number;
  symbol?: string;
}

export default function WalletPage() {
  const params = useParams() as { address?: string };
  const address = params.address ?? "";

  const [solBalance, setSolBalance] = useState<number>(0);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [splTokens, setSplTokens] = useState<SPLToken[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const publicKey = new PublicKey(address);
        const connection = new Connection(
          "https://mainnet.helius-rpc.com/?api-key=2f7ac0fb-908f-420c-aad8-290c7c0576e9"
        );

        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / 1e9);

        try {
          const heliusResponse = await fetch(
            "https://mainnet.helius-rpc.com/?api-key=2f7ac0fb-908f-420c-aad8-290c7c0576e9",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                jsonrpc: "2.0",
                id: "get-nfts",
                method: "getAssetsByOwner",
                params: {
                  ownerAddress: publicKey.toBase58(),
                  page: 1,
                  limit: 1000,
                  displayOptions: {
                    showUnverifiedCollections: true,
                    showCollectionMetadata: true,
                  },
                },
              }),
            }
          );

          if (!heliusResponse.ok) {
            throw new Error(`Helius API responded with status ${heliusResponse.status}`);
          }

          const heliusData = await heliusResponse.json();
          const fetchedNfts: NFT[] = heliusData.result.items.map(
            (item: {
              id: string;
              content?: {
                metadata?: { name?: string };
                links?: { image?: string };
              };
            }) => ({
              name: item.content?.metadata?.name || "Unknown NFT",
              uri: item.content?.links?.image || "/placeholder.png",
              mint: item.id,
            })
          );

          setNfts(fetchedNfts);
        } catch (nftError) {
          console.error("Error fetching NFTs via Helius:", nftError);
          setError("Failed to load NFTs.");
        }

        try {
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
          });

          const tokens: SPLToken[] = tokenAccounts.value
            .map(({ account }) => {
              const info = account.data.parsed.info as {
                tokenAmount: { amount: string; decimals: number };
                mint: string;
              };
              const amount = parseInt(info.tokenAmount.amount);
              const decimals = info.tokenAmount.decimals;
              const mint = info.mint;
              return { mint, amount, decimals };
            })
            .filter((token) => token.amount > 0);

          setSplTokens(tokens);
        } catch (tokenError) {
          console.error("Error fetching SPL tokens:", tokenError);
          setError("Failed to load SPL tokens.");
        }
      } catch (err) {
        console.error("Wallet fetch error:", err);
        setError("Invalid wallet address or error fetching data.");
      }
      setLoading(false);
    };

    fetchData();
  }, [address]);

  function formatAmount(amount: number, decimals: number) {
    return (amount / Math.pow(10, decimals)).toFixed(decimals > 0 ? 4 : 0);
  }

  function isSafeImageUri(uri: string): boolean {
    return uri.startsWith("https://") && /\.(jpg|jpeg|png|webp|gif|svg)$/.test(uri);
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-red-500 text-2xl font-bold">{error}</h1>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Wallet Information</h1>
      <p className="text-lg text-gray-300 mb-2 text-center break-all">
        Address: {address}
      </p>
      <p className="text-lg text-green-400 mb-6 text-center">
        Balance: {solBalance.toFixed(4)} SOL
      </p>

      <h2 className="text-2xl font-bold mb-4">SPL Tokens:</h2>
      {splTokens.length === 0 ? (
        <p className="text-gray-400">No SPL tokens found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {splTokens.map((token) => (
            <div
              key={token.mint}
              className="bg-gray-900 rounded-xl p-4 flex flex-col items-center"
            >
              <p className="text-white font-semibold mb-2">
                {token.symbol || `${token.mint.slice(0, 6)}...`}
              </p>
              <p className="text-green-400">
                {formatAmount(token.amount, token.decimals)}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">NFTs:</h2>
      {nfts.length === 0 ? (
        <p className="text-gray-400">No NFTs found in this wallet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.mint}
              className="bg-gray-900 rounded-xl p-4 flex flex-col items-center"
            >
              <Image
                src={isSafeImageUri(nft.uri) ? nft.uri : "/placeholder.png"}
                alt={nft.name}
                width={160}
                height={160}
                className="object-cover rounded mb-2"
              />
              <p className="text-white text-center mb-1">{nft.name}</p>
              <a
                href={`https://magiceden.io/item-details/${nft.mint}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                View on Magic Eden
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
