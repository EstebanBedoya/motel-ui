/** @styles */
import { Toaster } from 'sonner';
import ThemeRegistry from '@/styles/theme/ThemeRegistry';

/** @script */
import SessionAuthProvider from '@/app/_context/SessionAuthProvider';
import TrpcProvider from './_trpc/TrpcProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          <Toaster />
          <TrpcProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </TrpcProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
