import { Inter } from "next/font/google";

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import SubmitPromptModal from "./components/modals/SubmitPromptModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";
import Footer from "./components/Footer";
import SearchHeader from "./components/SearchHeader";
import Banner from "./components/Banner";
import CategoryBanner from "./components/CategoryBanner";
import { PageWrapper } from "./components/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPT Prompts Project",
  description: "Open GPT Prompts Library",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`relative ${font.className}  bg-sky-950 `}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <SubmitPromptModal />
          <LoginModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
          <SearchHeader />

          <Banner currentUser={currentUser} />
          <CategoryBanner />

          <PageWrapper>
            <div>{children}</div>
          </PageWrapper>
        </ClientOnly>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
