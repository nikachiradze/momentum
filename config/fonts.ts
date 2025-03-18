import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Fredoka,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontFredoka = Fredoka({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});
