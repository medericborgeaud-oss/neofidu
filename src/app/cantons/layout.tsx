import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CantonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
