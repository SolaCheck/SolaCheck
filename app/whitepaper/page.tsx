// ❌ Ya no pongas "use client" porque usas `metadata` en este archivo

import React from "react";

export const metadata = {
  title: "SolaCheck Whitepaper - Visibility & Privacy",
  description:
    "Learn about SolaCheck's core values, roadmap, and its commitment to privacy and transparency.",
};

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto prose prose-invert">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Visibility & Privacy
        </h1>

        {/* TL;DR Section */}
        <section className="mb-10 bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">TL;DR</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
            <li>No wallet connection needed</li>
            <li>No data tracking or storage</li>
            <li>Plans for encrypted private tools (SolaSafe)</li>
            <li>Utility-driven Sola Token for premium access</li>
          </ul>
        </section>

        <section className="mb-10" id="introduction">
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p className="text-gray-300">
            SolaCheck offers immediate insights into any Solana wallet,
            without requiring wallet connection or authentication. The aim is
            clear: to offer transparency, speed, and simplicity. It is
            designed to be user-friendly, secure, and fast — with privacy
            always in mind.
          </p>
        </section>

        <section className="mb-10" id="core-values">
          <h2 className="text-2xl font-semibold mb-3">Core Values</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Visibility</strong>: We believe that open access to
              wallet activity can empower users, researchers, and developers.
            </li>
            <li>
              <strong>Privacy</strong>: While SolaCheck reveals data, we don’t
              store anything. No tracking, no saving, no analytics.
            </li>
          </ul>
        </section>

        <section className="mb-10" id="solasafe">
          <h2 className="text-2xl font-semibold mb-3">
            Looking Ahead: SolaSafe
          </h2>
          <p className="text-gray-300">
            In the future, we will introduce SolaSafe — a layer of private
            analysis tools and encrypted storage features. It will allow users
            to monitor, categorize, and track wallet activities securely
            without making them public.
          </p>
        </section>

        <section className="mb-10" id="what-we-are">
          <h2 className="text-2xl font-semibold mb-3">What We Are</h2>
          <p className="text-gray-300">
            SolaCheck is a web-based application and a community-driven
            project. It is not a company. It is not a service that monetizes
            your data. It is a tool — built for the people who value clarity
            and respect privacy.
          </p>
        </section>

        <section className="mb-10" id="sola-token">
          <h2 className="text-2xl font-semibold mb-3">
            Expansion and Sola Token
          </h2>
          <p className="text-gray-300 mb-4">
            While SolaCheck is currently built on Solana, our roadmap includes
            expanding to other major blockchains such as Ethereum, Arbitrum,
            and others. Our vision is to become the unified wallet
            intelligence layer for Web3.
          </p>
          <p className="text-gray-300">
            We are also introducing the <strong>Sola Token</strong>, a native
            utility token that will power premium features within SolaSafe. It
            will enable flexible payments (credit card, crypto, or Sola
            Token), unlock advanced tools, and support future community
            governance. The token is designed with purpose, not hype.
          </p>
        </section>

        <section className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            For inquiries, contact us via the live chat or{" "}
            <a
              href="mailto:support@solacheck.xyz"
              className="text-blue-400 underline"
            >
              email
            </a>
            . Go back to the{" "}
            <a href="/" className="text-blue-400 underline">
              home page
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
