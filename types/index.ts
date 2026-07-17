import { z } from 'zod';

const optionalTrimmed = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((value) => (value && value.length > 0 ? value : undefined));

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(120, 'El nombre es demasiado largo'),
  email: z
    .string()
    .trim()
    .email('Correo electrónico inválido')
    .max(254, 'El correo es demasiado largo')
    .transform((value) => value.toLowerCase()),
  phone: optionalTrimmed,
  company: optionalTrimmed,
  subject: z
    .string()
    .trim()
    .max(200, 'El asunto es demasiado largo')
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  message: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(5000, 'El mensaje es demasiado largo'),
  accepts_marketing: z.boolean().optional().default(false),
});

export const catalogDownloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(120, 'El nombre es demasiado largo'),
  email: z
    .string()
    .trim()
    .email('Correo electrónico inválido')
    .max(254, 'El correo es demasiado largo')
    .transform((value) => value.toLowerCase()),
  phone: optionalTrimmed,
  company: z
    .string()
    .trim()
    .min(2, 'El nombre de la empresa es requerido')
    .max(200, 'El nombre de la empresa es demasiado largo'),
  city: optionalTrimmed,
  sector: optionalTrimmed,
  accepts_marketing: z.boolean().optional().default(false),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CatalogDownloadFormData = z.infer<typeof catalogDownloadSchema>;
