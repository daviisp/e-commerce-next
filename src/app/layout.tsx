import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Next",
  description: "E-commerce build in Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ClerkProvider localization={ptBR}>
        <body
          className={clsx(
            inter.className,
            "h-screen bg-slate-500 text-gray-300"
          )}
        >
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
