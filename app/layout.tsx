import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontFredoka } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          fontSans.variable,
          fontFredoka.variable,
          "w-screen h-screen px-32 py-5"
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
