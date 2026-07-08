import { z } from 'zod';
import type { CatalogDownloadFormData } from '@/types';

export const catalogDownloadFieldsSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  company: z.string().min(2, 'El nombre de la empresa es requerido'),
  city: z.string().optional(),
  sector: z.string().optional(),
  accepts_marketing: z.boolean(),
});

export type CatalogDownloadFields = z.infer<typeof catalogDownloadFieldsSchema>;

export function toCatalogPayload(fields: CatalogDownloadFields): CatalogDownloadFormData {
  return {
    name: fields.name,
    email: fields.email,
    phone: fields.phone || undefined,
    company: fields.company,
    city: fields.city || undefined,
    sector: fields.sector || undefined,
    accepts_marketing: fields.accepts_marketing,
  };
}
