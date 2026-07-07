import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export const catalogDownloadSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  company: z.string().min(2, 'El nombre de la empresa es requerido'),
  city: z.string().optional(),
  sector: z.string().optional(),
  accepts_marketing: z.boolean().optional().default(false),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CatalogDownloadFormData = z.infer<typeof catalogDownloadSchema>;
