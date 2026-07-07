'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitContact } from '@/actions/contact';
import { contactFormSchema } from '@/types';
import { SITE_CONFIG } from '@/constants/site';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    const response = await submitContact(result.data);
    setIsSubmitting(false);
    if (response.success) {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setErrors({ form: response.message });
    }
  };

  return (
    <section id="contacto" className="w-full bg-[#052042] py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-[1170px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[40px] font-extrabold uppercase tracking-wide text-white mb-4">
            CONTÁCTANOS
          </h2>
          <p className="text-xl text-white/70">
            Nuestro equipo está listo para ayudarte con tu proyecto.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-[10px] bg-[#fab43a]/20 flex items-center justify-center group-hover:bg-[#fab43a] transition-colors">
                  <Phone className="w-5 h-5 text-[#fab43a] group-hover:text-[#3c4456]" />
                </div>
                <div>
                  <p className="font-bold text-white group-hover:text-[#fab43a] transition-colors">{SITE_CONFIG.phone}</p>
                  <p className="text-sm text-white/60">Teléfono directo</p>
                </div>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-[10px] bg-[#fab43a]/20 flex items-center justify-center group-hover:bg-[#fab43a] transition-colors">
                  <Mail className="w-5 h-5 text-[#fab43a] group-hover:text-[#3c4456]" />
                </div>
                <div>
                  <p className="font-bold text-white group-hover:text-[#fab43a] transition-colors">{SITE_CONFIG.email}</p>
                  <p className="text-sm text-white/60">Correo electrónico</p>
                </div>
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-[10px] bg-[#fab43a]/20 flex items-center justify-center group-hover:bg-[#fab43a] transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#fab43a] group-hover:text-[#3c4456]" />
                </div>
                <div>
                  <p className="font-bold text-white group-hover:text-[#fab43a] transition-colors">WhatsApp</p>
                  <p className="text-sm text-white/60">Respuesta inmediata</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[10px] bg-[#fab43a]/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#fab43a]" />
                </div>
                <div>
                  <p className="font-bold text-white">Dirección</p>
                  <p className="text-sm text-white/60">{SITE_CONFIG.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, deseo solicitar una cotización.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full min-h-[46px] rounded-[10px] bg-[#fab43a] px-6 py-3 text-lg font-normal text-[#3c4456] hover:bg-[#f0a52a] transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Cotizar por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#f2f2f7] rounded-[20px] p-6 md:p-8">
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-[#3c4456] mb-6">
                Envíanos un mensaje
              </h3>

              {success && (
                <div role="status" className="bg-[#316d92]/10 border border-[#316d92]/30 rounded-[10px] p-4 mb-6">
                  <p className="text-[#316d92] font-medium">Mensaje enviado. Nos pondremos en contacto pronto.</p>
                </div>
              )}
              {errors.form && (
                <div role="alert" className="bg-red-50 border border-red-200 rounded-[10px] p-4 mb-6">
                  <p className="text-red-600 font-medium">{errors.form}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name', label: 'Nombre *', placeholder: 'Tu nombre', err: errors.name },
                    { id: 'email', label: 'Email *', placeholder: 'tu@empresa.com', err: errors.email, type: 'email' },
                  ].map((f) => (
                    <div key={f.id} className="space-y-2">
                      <Label htmlFor={f.id} className="text-[#3c4456] font-medium">{f.label}</Label>
                      <Input
                        id={f.id} name={f.id} type={f.type || 'text'}
                        value={(formData as any)[f.id]} onChange={handleChange}
                        placeholder={f.placeholder}
                        required
                        aria-invalid={!!f.err}
                        aria-describedby={f.err ? `${f.id}-error` : undefined}
                        className={`border-[#316d92]/30 ${f.err ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {f.err && <p id={`${f.id}-error`} role="alert" className="text-xs text-red-500">{f.err}</p>}
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'phone', label: 'Teléfono', placeholder: '+58 ' },
                    { id: 'company', label: 'Empresa', placeholder: 'Nombre empresa' },
                  ].map((f) => (
                    <div key={f.id} className="space-y-2">
                      <Label htmlFor={f.id} className="text-[#3c4456] font-medium">{f.label}</Label>
                      <Input
                        id={f.id} name={f.id}
                        value={(formData as any)[f.id]} onChange={handleChange}
                        placeholder={f.placeholder}
                        className="border-[#316d92]/30"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#3c4456] font-medium">Mensaje *</Label>
                  <Textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    placeholder="Describe tu consulta o proyecto..." rows={4}
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`border-[#316d92]/30 ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                  {errors.message && <p id="message-error" role="alert" className="text-xs text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[46px] rounded-[10px] bg-[#fab43a] px-6 py-3 text-lg font-normal text-[#3c4456] hover:bg-[#f0a52a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Enviar mensaje</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
