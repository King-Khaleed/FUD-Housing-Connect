
import { Header } from "@/components/Header";
import { CompareBar } from "@/components/CompareBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <CompareBar />
    </div>
  )
}
