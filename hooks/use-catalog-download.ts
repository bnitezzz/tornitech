'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { submitCatalogDownload } from '@/actions/contact';
import { catalogDownloadSchema } from '@/types';
import type { CatalogItem } from '@/types/catalog';

export type CatalogDownloadFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  sector: string;
  accepts_marketing: boolean;
};

const INITIAL_FORM: CatalogDownloadFields = {
  name: '',
  email: '',
  phone: '',
  company: '',
  city: '',
  sector: '',
  accepts_marketing: false,
};

export function useCatalogDownload() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [selectedCatalogTitle, setSelectedCatalogTitle] = useState('');
  const [selectedCatalogSlug, setSelectedCatalogSlug] = useState('');
  const [formData, setFormData] = useState<CatalogDownloadFields>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const downloadTriggerRef = useRef<HTMLButtonElement>(null);
  const catalogDialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(catalogDialogRef, {
    isActive: modalOpen,
    returnFocusRef: downloadTriggerRef,
    initialFocusRef: closeButtonRef,
  });

  const openModal = useCallback((catalog: CatalogItem) => {
    setSelectedCatalogId(catalog.id);
    setSelectedCatalogTitle(catalog.title);
    setSelectedCatalogSlug(catalog.slug);
    setErrors({});
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setErrors({});
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen, closeModal]);

  const updateField = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const setAcceptsMarketing = useCallback((value: boolean) => {
    setFormData((prev) => ({ ...prev, accepts_marketing: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = catalogDownloadSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});
      const response = await submitCatalogDownload({
        ...result.data,
        catalogId: selectedCatalogId,
        catalogSlug: selectedCatalogSlug,
      });
      setIsSubmitting(false);

      if (response.success && response.data?.downloadUrl) {
        setSuccess(true);
        const link = document.createElement('a');
        link.href = response.data.downloadUrl;
        link.download = `${selectedCatalogTitle}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          setModalOpen(false);
          setSuccess(false);
          setFormData(INITIAL_FORM);
        }, 2500);
      } else {
        setErrors({ form: response.message });
      }
    },
    [formData, selectedCatalogId, selectedCatalogSlug, selectedCatalogTitle]
  );

  return {
    modalOpen,
    selectedCatalogTitle,
    formData,
    errors,
    isSubmitting,
    success,
    downloadTriggerRef,
    catalogDialogRef,
    closeButtonRef,
    openModal,
    closeModal,
    updateField,
    setAcceptsMarketing,
    handleSubmit,
  };
}
