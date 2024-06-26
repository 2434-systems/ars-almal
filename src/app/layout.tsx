import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ars Clicker",
  description: "How big can she go?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          accentColor="blue"
          grayColor="slate"
          radius="large"
          scaling="100%"
          appearance="light"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
