import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export function LegalPageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenido-principal" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
