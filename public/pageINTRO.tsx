import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <Image
          src="/logoremovebg.png"
          alt="SolaCheck Logo"
          width={250}
          height={250}
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Understand any wallet in seconds.
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center mb-6 max-w-xl">
        Clear. Fast. No connection needed.
      </p>
      <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
        Launch SolaCheck
      </button>
    </main>
  );
}
