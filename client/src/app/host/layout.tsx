import { Quicksand } from "next/font/google";

const fontSans = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={fontSans.className}>{children}</div>;
}
