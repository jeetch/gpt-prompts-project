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

// export const metadata = {
//   title: "GPT Prompts Project",
//   description: "Open GPT Prompts Library",
//   openGraph: {
//     title: "GPT Prompts Project",
//     description: "Open GPT Prompts Library",
//     type: "website",
//     images: ["/images/readme.jpg"],
//   },
// };

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
        <meta property="og:title" content="GPT Prompts Project" />
        <meta
          property="og:description"
          content="Explore and Share ChatGPT Prompts"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gptpromptsproject.com/" />
        <meta
          property="og:image"
          content="https://gptpromptsproject.com/images/readme.jpg"
        />
        <meta property="og:image" content="/images/readme.jpg" />
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
