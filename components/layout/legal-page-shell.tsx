import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SkipLink } from '@/components/layout/skip-link';

export function LegalPageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="contenido-principal" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
