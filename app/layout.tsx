import "./globals.css";
import { Inter } from "next/font/google";

// Components
import { AuthProvider } from "./AuthProvider";
import { NavbarMain } from "@/components/navbars/NavbarMain";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My wise quotes",
  description: "Discover and save your favorite quotes and their authors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className} mt-[75px] sm:mt-0`}>
          <NavbarMain />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
