import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "قطاع التدريب والتطوير",
  description: "Created by Mohamed El-Sharqawi",
  icons: ["icon.png"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <AuthProvider>
          <main className="flex items-center">
            <Sidebar />

            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
