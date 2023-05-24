// Components
import RandomQuote from "@/components/RandomQuote";
import Parts from "@/components/Parts";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen4">
      <section className="flex flex-col items-center min-w-full p-0 border-2">
        {/* @ts-expect-error Async Server Component */}
        <RandomQuote />

        <Parts />
      </section>
    </main>
  );
}
