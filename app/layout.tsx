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
      <head>
        <title>GPT Prompts Project: Explore and Share Free GPT Prompts</title>
        <meta
          name="description"
          content="We are an open platform for sharing GPT-optimized prompts; fostering collaboration, expanding AI accessibility, and promoting knowledge sharing"
        />

        <meta property="og:url" content="https://www.gptpromptsproject.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="GPT Prompts Project: Explore and Share Free GPT Prompts"
        />
        <meta
          property="og:description"
          content="We are an open platform for sharing GPT-optimized prompts; fostering collaboration, expanding AI accessibility, and promoting knowledge sharing"
        />
        <meta
          property="og:image"
          content="https://gptpromptsproject.com/images/readme.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="gptpromptsproject.com" />
        <meta
          property="twitter:url"
          content="https://www.gptpromptsproject.com/"
        />
        <meta
          name="twitter:title"
          content="GPT Prompts Project: Explore and Share Free GPT Prompts"
        />
        <meta
          name="twitter:description"
          content="We are an open platform for sharing GPT-optimized prompts; fostering collaboration, expanding AI accessibility, and promoting knowledge sharing"
        />
        <meta
          name="twitter:image"
          content="https://gptpromptsproject.com/images/readme.jpg"
        />
      </head>
      <body className={`relative ${font.className} bg-sky-950 bg-cover`}>
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
