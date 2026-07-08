import { z } from 'zod';
import type { ContactFormData } from '@/types';

/** Client-side contact form fields (React Hook Form). */
export const contactFormFieldsSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  accepts_marketing: z.boolean(),
});

export type ContactFormFields = z.infer<typeof contactFormFieldsSchema>;

/** Maps RHF field values to the server action payload. */
export function toContactPayload(fields: ContactFormFields): ContactFormData {
  return {
    name: `${fields.firstName} ${fields.lastName}`.trim(),
    email: fields.email,
    phone: fields.phone || undefined,
    company: fields.company || undefined,
    subject: fields.subject || undefined,
    message: fields.message,
    accepts_marketing: fields.accepts_marketing,
  };
}
