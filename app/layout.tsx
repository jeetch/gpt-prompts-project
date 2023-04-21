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

export const metadata = {
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
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <SubmitPromptModal />
          <LoginModal />
          <SearchModal />
          <div className="bg-gradient-to-t from-sky-900 to-sky-950">
            <Navbar currentUser={currentUser} />
            <SearchHeader />

            <Banner currentUser={currentUser} />
            <div>{children}</div>
          </div>
        </ClientOnly>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
