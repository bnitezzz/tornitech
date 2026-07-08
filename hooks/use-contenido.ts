'use client';

import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';

export type ClientRow = { id: string; name: string; logo_url: string | null };
export type FaqRow = { id: string; question: string; answer: string };
export type TestimonialRow = {
  id: string;
  author_name: string;
  author_role: string | null;
  company: string | null;
  content: string;
  rating: number | null;
};
export type MarcaRow = { id: string; name: string; logo_url: string | null; slug: string };
export type CertRow = { id: string; name: string; code: string; logo_url: string | null };

type PartnerRow = {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  website_url: string | null;
};

export function useMarcas() {
  return useQuery({
    queryKey: ['marcas'],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return [] as MarcaRow[];
      const { data } = await supabase.from('brands').select('id, name, logo_url, slug').eq('is_active', true);
      return (data ?? []) as MarcaRow[];
    },
  });
}

export function useCertificaciones() {
  return useQuery({
    queryKey: ['certificaciones'],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return [] as CertRow[];
      const { data } = await supabase.from('certifications').select('id, name, code, logo_url');
      return (data ?? []) as CertRow[];
    },
  });
}

export function useSocioComercial() {
  return useQuery({
    queryKey: ['socio_comercial'],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return null as PartnerRow | null;
      const { data } = await supabase
        .from('partners')
        .select('id, name, logo_url, description, website_url')
        .eq('is_active', true)
        .order('display_order')
        .limit(1)
        .maybeSingle();
      return data as PartnerRow | null;
    },
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return [] as FaqRow[];
      const { data } = await supabase.from('faqs').select('id, question, answer').eq('is_active', true).order('display_order');
      return (data ?? []) as FaqRow[];
    },
  });
}

export function useTestimonios() {
  return useQuery({
    queryKey: ['testimonios'],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return [] as TestimonialRow[];
      const { data } = await supabase
        .from('testimonials')
        .select('id, author_name, author_role, company, content, rating')
        .eq('is_active', true)
        .order('display_order');
      return (data ?? []) as TestimonialRow[];
    },
  });
}

export function useClientes() {
  return useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return [] as ClientRow[];
      const { data } = await supabase.from('clients').select('id, name, logo_url').eq('is_active', true).order('display_order');
      return (data ?? []) as ClientRow[];
    },
  });
}
