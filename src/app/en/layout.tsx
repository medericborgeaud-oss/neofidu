import { EnglishFormMessages } from "@/components/EnglishFormMessages";

// Wraps every /en route so native form-validation messages render in
// English regardless of the visitor's browser language.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnglishFormMessages />
      {children}
    </>
  );
}
