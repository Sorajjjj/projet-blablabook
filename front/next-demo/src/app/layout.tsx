import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "BlaBlaBook",
  description: "BlaBlaBook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">  {/* Applique directement Basic comme police par défaut */}
        <AuthProvider>{children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
