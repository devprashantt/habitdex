import { ClerkProvider } from '@clerk/nextjs'
import "./globals.scss";

export const metadata = {
  title: "Habit-Dex",
  description: "Track your habits and get motivated.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
