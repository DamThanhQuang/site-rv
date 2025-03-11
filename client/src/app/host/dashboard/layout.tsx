import { Quicksand } from "next/font/google";
import HostHeader from "@/components/layout/HostHeader";
import { Toaster } from "react-hot-toast";

const fontSans = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col ${fontSans.className}`}>
      <Toaster position="top-center" reverseOrder={false} />
      <HostHeader />

      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Main content container */}
          <div className=" shadow-sm p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
