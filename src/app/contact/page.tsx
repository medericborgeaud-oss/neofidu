"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BreadcrumbLight } from "@/components/Breadcrumb";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <BreadcrumbLight
          items={[
            { label: "Accueil", href: "/" },
            { label: "Contact" },
          ]}
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
