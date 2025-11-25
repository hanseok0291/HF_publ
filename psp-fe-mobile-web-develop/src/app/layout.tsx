import "styles/global.css";
import type { Metadata, Viewport } from "next";
import ErrorHandler from "@/components/common/ErrorHandler";
import LoginMessageHandler from "@/components/common/LoginMessageHandler";
import { SearchParamsWrapper } from "@/components/common/SearchParamsWrapper";
import SessionExtensionModal from "@/components/common/SessionExtensionModal";
import TouchOptimizer from "@/components/common/TouchOptimizer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "헥토파이낸셜 폐기물 처리 Mobile"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <meta charSet="UTF-8" />
      <body>
        <SearchParamsWrapper>
          <ErrorHandler />
          <LoginMessageHandler />
        </SearchParamsWrapper>

        {children}
        <TouchOptimizer />
        <SessionExtensionModal />
        <Toaster />
      </body>
    </html>
  );
}
