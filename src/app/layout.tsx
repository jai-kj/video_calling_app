import Navbar from "@/components/layout/Navbar";
import PageLayout from "@/components/layout/PageLayout";
import { APP_META } from "@/config/constants";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProvider from "./ClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_META.TITLE,
  description: APP_META.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>
            <Navbar />
            <PageLayout>{children}</PageLayout>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
