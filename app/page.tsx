// Components
import RandomQuote from "@/components/RandomQuote";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 border-2">
      <section className="flex flex-col items-center min-w-full border-2">
        {/* @ts-expect-error Async Server Component */}
        <RandomQuote />
      </section>
    </main>
  );
}
