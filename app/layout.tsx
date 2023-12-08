import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "قطاع التدريب والتطوير",
  description: "Created by Mohamed El-Sharqawi",
  icons: ["logo.png"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link
          rel="icon"
          href="/icon<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
