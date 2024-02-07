/** @styles */
import ThemeRegistry from "@/styles/theme/ThemeRegistry";

/** @script */
import SessionAuthProvider from "@/context/SessionAuthProvider";
import TrpcProvider from "./_trpc/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <SessionAuthProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </SessionAuthProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
