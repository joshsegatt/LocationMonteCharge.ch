import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { track } from '../lib/analytics';
import { waLink, PHONE_TEL, PHONE_DISPLAY } from '../lib/contact';

const LINK = 'underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A192F]';
const LABEL = 'block text-sm font-medium text-[#0A192F] mb-1.5';
const FIELD =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 text-base text-[#0A192F] placeholder:text-slate-400 outline-none transition-colors focus:border-[#0A192F] focus:ring-2 focus:ring-[#0052A3]/25';

const MAPS_ROUTE = 'https://www.google.com/maps/dir/?api=1&destination=Rue+De-Monthoux+64,+1201+Gen%C3%A8ve';

export default function ContactPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://formspree.io/f/xgorrdkg', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormStatus('success');
        track('lead_form_submit');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white text-[#0A192F] pt-24 sm:pt-32 pb-16 md:pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <nav aria-label="Fil d’Ariane" className="flex items-center gap-1.5 text-[13px] text-slate-500 mb-6 lg:mb-8">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            className={`${LINK} hover:text-[#0A192F]`}
          >
            Accueil
          </a>
          <ChevronRight size={12} className="text-slate-400" aria-hidden="true" />
          <span className="text-[#0A192F]">Contact</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <h1 className="font-display font-semibold text-[38px] sm:text-[52px] leading-[1.04] tracking-[-0.035em] text-balance">
              Demander un devis gratuit
            </h1>
            <p className="mt-5 text-[16px] sm:text-lg leading-[1.55] text-slate-600 max-w-md">
              Le plus simple&nbsp;: une photo de l’objet sur WhatsApp, avec l’étage et la commune. Vous pouvez aussi
              nous appeler ou remplir le formulaire.
            </p>

            <dl className="mt-9 border-t border-slate-200">
              <div className="grid grid-cols-[104px_1fr] items-baseline gap-4 py-4 border-b border-slate-200">
                <dt className="text-sm text-slate-500">Téléphone</dt>
                <dd>
                  <a href={PHONE_TEL} className={`font-display font-semibold text-lg tabular-nums ${LINK}`}>
                    {PHONE_DISPLAY}
                  </a>
                  <span className="ml-2 text-sm text-slate-500">gratuit</span>
                </dd>
              </div>
              <div className="grid grid-cols-[104px_1fr] items-baseline gap-4 py-4 border-b border-slate-200">
                <dt className="text-sm text-slate-500">WhatsApp</dt>
                <dd>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-display font-semibold text-lg tabular-nums ${LINK}`}
                  >
                    079 889 64 06
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[104px_1fr] items-baseline gap-4 py-4 border-b border-slate-200">
                <dt className="text-sm text-slate-500">E-mail</dt>
                <dd>
                  <a href="mailto:info@batimove.ch" className={`font-display font-semibold text-lg ${LINK}`}>
                    info@batimove.ch
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#F1F5F8] rounded-xl p-5 sm:p-8">
              {formStatus === 'success' ? (
                <div role="status" className="py-10 sm:py-16">
                  <h2 className="font-display font-semibold text-2xl sm:text-[28px] tracking-[-0.02em]">
                    Demande envoyée
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 max-w-md">
                    Merci. Nous vous recontactons par téléphone ou par e-mail avec le devis.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className={`mt-6 py-1 text-base font-semibold text-[#0A192F] ${LINK}`}
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} aria-labelledby="contact-form-title">
                  <h2 id="contact-form-title" className="font-display font-semibold text-xl sm:text-2xl tracking-[-0.02em]">
                    Formulaire de devis
                  </h2>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                    <div>
                      <label htmlFor="contact-name" className={LABEL}>
                        Nom ou société
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        required
                        type="text"
                        maxLength={100}
                        autoComplete="name"
                        className={`${FIELD} h-12`}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className={LABEL}>
                        Téléphone
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        required
                        type="tel"
                        maxLength={25}
                        pattern="[\+]?[\d\s\-\(\)]{8,20}"
                        title="Format attendu&nbsp;: +41 79 000 00 00"
                        autoComplete="tel"
                        placeholder="+41 79 000 00 00"
                        className={`${FIELD} h-12 tabular-nums`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="contact-email" className={LABEL}>
                        E-mail
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        required
                        type="email"
                        maxLength={120}
                        autoComplete="email"
                        className={`${FIELD} h-12`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="contact-message" className={LABEL}>
                        Votre demande
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        maxLength={1500}
                        rows={5}
                        placeholder="L’objet à monter, l’étage, la commune et la date souhaitée."
                        className={`${FIELD} py-3 resize-y min-h-[132px]`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="press mt-6 w-full sm:w-auto inline-flex items-center justify-center h-14 px-7 rounded-full bg-[#E10600] hover:bg-[#C80500] text-white text-[16px] font-semibold disabled:opacity-60 disabled:cursor-default"
                  >
                    {formStatus === 'sending' ? 'Envoi en cours…' : 'Envoyer la demande'}
                  </button>

                  {formStatus === 'error' && (
                    <p className="mt-4 text-sm text-[#C80500]" role="alert">
                      L’envoi a échoué. Réessayez ou appelez le{' '}
                      <a href={PHONE_TEL} className="font-semibold underline underline-offset-4 tabular-nums">
                        {PHONE_DISPLAY}
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display font-semibold text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.03em]">
              Nous trouver
            </h2>
            <address className="mt-4 not-italic text-base leading-relaxed text-slate-600">
              BatiMove Sàrl
              <br />
              Rue De-Monthoux 64
              <br />
              1201 Genève
            </address>
            <a
              href={MAPS_ROUTE}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-block py-1 text-base font-semibold text-[#0A192F] ${LINK}`}
            >
              Ouvrir l’itinéraire dans Google Maps
            </a>
            <p className="mt-6 text-sm leading-relaxed text-slate-500 tabular-nums">
              IDE CHE-143.091.230. Assurance RC professionnelle jusqu’à CHF&nbsp;5’000’000.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-[#F1F5F8]">
              <iframe
                title="Carte&nbsp;: BatiMove Sàrl, Rue De-Monthoux 64, Genève"
                src="https://maps.google.com/maps?q=Rue%20De-MONTHOUX%2064,%201201%20Gen%C3%A8ve&t=m&z=15&ie=UTF8&iwloc=B&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
