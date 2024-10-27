// components
import { CommonFooter } from "@/components/common/common-footer";
import { CommonHeader } from "@/components/common/common-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonHeader />
      {children}
      <CommonFooter />
    </>
  );
}
