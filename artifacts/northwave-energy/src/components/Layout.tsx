import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1 w-full pt-[72px] md:pt-[88px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
