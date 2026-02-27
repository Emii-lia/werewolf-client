import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQuery";
import { ToastContainer } from "react-toastify";
import type { ReactNode } from "react";
import Websocket from "@/providers/Websocket";
import Topbar from "@/components/Topbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Werewolf",
  description: "A web-based implementation of the popular social deduction game, Werewolf. Players take on the roles of villagers and werewolves, trying to outsmart each other in a battle of wits and deception.",
  keywords: ["werewolf", "social deduction game", "multiplayer", "online game", "villagers", "werewolves", "strategy", "deception"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  icons: [{
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/icons/werewolf.svg`,
    type: "image/svg+xml",
    sizes: "18x18",
    href: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/icons/werewolf.svg`,
    fetchPriority: "high",
  }],
  openGraph: {
    title : "Werewolf - Online Multiplayer Game",
    description : "Join the thrilling world of Werewolf, an online multiplayer game where players take on the roles of villagers and werewolves. Outsmart your opponents in a battle of wits and deception!",
    url : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName : "Werewolf Game",
    images : [{
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/images/roles/werewolf.png`,
      width: 1200,
      height: 630,
      alt: "Werewolf Game",
      type: "image/png",
    }]
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    languages: {
      "en-US": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      "en-GB": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      "fr-FR": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      "x-default": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <Topbar />
          {children}
          <ToastContainer/>
          <Websocket/>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
