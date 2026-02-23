import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0f1a] p-8">
      <main className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Orbis
        </h1>
        <p className="text-lg text-zinc-400">
          A shared, persistent, realtime 3D globe. Plant trees, water the land,
          and watch the planet evolve.
        </p>
        <Link
          href="/planet/earth-001"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Enter Earth
        </Link>
      </main>
    </div>
  );
}
