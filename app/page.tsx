// Components
import Navbar from "@/components/Navbar";
import RandomQuote from "@/components/RandomQuote";

export default async function Home() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-between min-h-screen p-24 border-2">
        {/* @ts-expect-error Async Server Component */}
        <RandomQuote />

        <section className="flex flex-col items-center min-w-full border-2">
          <h1>My wise quotes</h1>
          <p>Discover and save your favorite quotes.</p>
        </section>
      </main>
    </>
  );
}
