"use client";

import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidSolanaAddress = (address: string) => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!wallet.trim()) {
      setError("Please enter a wallet address.");
      return;
    }

    if (!isValidSolanaAddress(wallet)) {
      setError("That doesn't look like a valid wallet address.");
      return;
    }

    router.push(`/wallet/${wallet}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <Image
          src="/logoremovebg.png"
          alt="SolaCheck Logo"
          width={250}
          height={250}
          priority
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Understand any wallet in seconds.
      </h1>

      <p className="text-lg md:text-xl text-gray-300 text-center mb-6 max-w-xl">
        Clear. Fast. No connection needed.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          id="wallet"
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Enter wallet address"
          className="w-full px-4 py-2 mb-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-white text-black w-full py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Launch SolaCheck
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/whitepaper"
          className="text-white underline hover:text-gray-300 transition"
        >
          📄 Read the Whitepaper – Visibility & Privacy
        </Link>
      </div>
    </main>
  );
}
