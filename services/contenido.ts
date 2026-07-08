import { getUntypedReader } from '@/lib/supabase/untyped';

export type Faq = { id: string; pregunta: string; respuesta: string };
export type Testimonio = {
  id: string;
  autor: string;
  cargo: string | null;
  empresa: string | null;
  contenido: string;
  rating: number;
};
export type Cliente = { id: string; nombre: string; logo: string | null };

export async function fetchFaqs(): Promise<Faq[]> {
  const supabase = getUntypedReader();
  if (!supabase) return [];
  const { data } = await supabase.from('faqs').select('id, question, answer').eq('is_active', true).order('display_order');
  return ((data ?? []) as Array<{ id: string; question: string; answer: string }>).map((r) => ({
    id: r.id,
    pregunta: r.question,
    respuesta: r.answer,
  }));
}

export async function fetchTestimonios(): Promise<Testimonio[]> {
  const supabase = getUntypedReader();
  if (!supabase) return [];
  const { data } = await supabase
    .from('testimonials')
    .select('id, author_name, author_role, company, content, rating')
    .eq('is_active', true)
    .order('display_order');
  return (
    (data ?? []) as Array<{
      id: string;
      author_name: string;
      author_role: string | null;
      company: string | null;
      content: string;
      rating: number | null;
    }>
  ).map((r) => ({
    id: r.id,
    autor: r.author_name,
    cargo: r.author_role,
    empresa: r.company,
    contenido: r.content,
    rating: r.rating ?? 5,
  }));
}

export async function fetchClientes(): Promise<Cliente[]> {
  const supabase = getUntypedReader();
  if (!supabase) return [];
  const { data } = await supabase.from('clients').select('id, name, logo_url').eq('is_active', true).order('display_order');
  return ((data ?? []) as Array<{ id: string; name: string; logo_url: string | null }>).map((r) => ({
    id: r.id,
    nombre: r.name,
    logo: r.logo_url,
  }));
}
