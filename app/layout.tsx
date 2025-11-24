import Centralizer from "@/components/general/Centralizer";
import Spinner from "@/components/general/Spinner";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/contexts/ModalContext";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Gems Camp - Luxury Residential Camp in England",
  description:
    "Experience world-class education with our immersive summer programs in Next Gems Camp - Luxury Residential Camp in England. Register now for 2026 placements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster />
        <Suspense
          fallback={
            <Centralizer>
              <Spinner />
            </Centralizer>
          }
        >
          <div className="max-w-480 mx-auto w-full">
            <ModalProvider>{children}</ModalProvider>
          </div>
        </Suspense>
        <SanityLive />
      </body>
    </html>
  );
}
