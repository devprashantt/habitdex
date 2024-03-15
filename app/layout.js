import { ClerkProvider } from '@clerk/nextjs'
import "./globals.scss";
import myFont from '@/lib/font';
import localFont from "next/font/local"
import Head from 'next/head';

export const metadata = {
  title: "Habit-Dex",
  description: "Track your habits and get motivated.",
};


export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="https://gistcdn.githack.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css" />

        </Head>
        <body >{children}</body>
      </html>
    </ClerkProvider>
  );
}
