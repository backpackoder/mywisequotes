import "./globals.css";
import { Inter } from "next/font/google";

// Components
import NavbarMain from "@/components/NavbarMain";
import Footer from "@/components/Footer";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My wise quotes",
  description: "Discover and save your favorite quotes and their authors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavbarMain />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
