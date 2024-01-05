/** @components */
import HeaderAppBar from "@/components/molecules/header-app-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderAppBar />
      {children}
    </>
  );
}
