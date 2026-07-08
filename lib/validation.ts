import { contactFormSchema, catalogDownloadSchema } from '@/types';

export function parseContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}

export function parseCatalogDownloadForm(data: unknown) {
  return catalogDownloadSchema.safeParse(data);
}
