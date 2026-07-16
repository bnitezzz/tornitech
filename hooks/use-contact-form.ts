'use client';

import { useState, useCallback } from 'react';
import { submitContact } from '@/actions/contact';
import { contactFormSchema } from '@/types';

export type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  accepts_marketing: boolean;
};

const INITIAL_FORM: ContactFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  accepts_marketing: false,
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormFields>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const next = { ...prev };
        delete next[name];
        return next;
      });
    },
    []
  );

  const setAcceptsMarketing = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, accepts_marketing: checked }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const fieldErrors: Record<string, string> = {};
      if (formData.lastName.trim().length < 2) {
        fieldErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
      }

      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const payload = {
        name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
        accepts_marketing: formData.accepts_marketing,
      };

      const result = contactFormSchema.safeParse(payload);
      if (!result.success) {
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0] as string] = err.message;
        });
      }

      if (Object.keys(fieldErrors).length > 0 || !result.success) {
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      const response = await submitContact(result.data);
      setIsSubmitting(false);

      if (response.success) {
        setSuccess(true);
        setFormData(INITIAL_FORM);
        setErrors({});
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrors({ form: response.message });
      }
    },
    [formData]
  );

  return {
    formData,
    errors,
    isSubmitting,
    success,
    handleChange,
    setAcceptsMarketing,
    handleSubmit,
  };
}
