/** @styles */
import ThemeRegistry from "@/styles/theme/ThemeRegistry";

/** @script */
import SessionAuthProvider from "@/context/SessionAuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
