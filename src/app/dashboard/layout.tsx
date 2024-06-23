export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ width: '100vw' }}>
      {children}
    </div>
  );
}
