// libraries
import { ClerkProvider } from "@clerk/nextjs";

// constants
import styles from "./globals.scss";
import { Navbar } from "@/components/Navbar";

// meta-data
export const metadata = {
  title: "Habit-Dex",
  description: "Track your habits and get motivated.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        // layout: {
        //   logoImageUrl: "/favicon.ico",
        //   socialButtonsVariant: "iconButton"
        // },
        variables: {
          colorText: "#081326",
          colorPrimary: "#0e78f9",
          colorBackground: "#e1e8f9",
          colorInputBackground: "#252a41",
          colorInputText: "#fff",
        },
      }}
    >
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://gistcdn.githack.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"
          />
        </head>
        <body>
          <Navbar />
          <div className={styles.page__wrapper}>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
