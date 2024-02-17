/** @components */
import HeaderAppBar from '@/app/_components/molecules/header-app-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ width: '100vw' }}>
      <HeaderAppBar />
      {children}
    </div>
  );
}
