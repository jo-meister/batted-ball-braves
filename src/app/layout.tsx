import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Batted Balls Braves",
  description: "Player batted ball metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-4 flex justify-center">
          <h1 className="text-3xl font-bold">Batted Balls Braves</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
