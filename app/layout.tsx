import "./globals.css";
import { Inter } from "next/font/google";

// Components
import Providers from "@/components/Providers";
import NavbarMain from "@/components/NavbarMain";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My wise quotes",
  description: "Discover and save your favorite quotes and their authors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarMain />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
