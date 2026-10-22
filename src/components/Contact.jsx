import { useState } from 'react'
import { CheckCircle2, AlertCircle, Send, Mail, Phone, MapPin } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { personalInfo, contactSubtitle, socialLinks } from '../data/siteData'
import {
  sanitizePlainText,
  validateContactForm,
  checkRateLimit,
  safeHref,
} from '../utils/security'

const initial = { name: '', email: '', message: '', consent: false, website: '' }

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const reveal = useReveal()

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    const nextVal = type === 'checkbox' ? checked : value
    // Cap length on the fly (anti-flood)
    const capped =
      type === 'checkbox'
        ? nextVal
        : sanitizePlainText(String(nextVal), name === 'message' ? 2000 : 120)

    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : capped }))
    if (touched[name]) {
      const { errors: next } = validateContactForm({
        ...values,
        [name]: type === 'checkbox' ? checked : capped,
      })
      setErrors(next)
    }
  }

  const onBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    const { errors: next } = validateContactForm(values)
    setErrors(next)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { errors: next, clean, ok, honeypot } = validateContactForm(values)
    setErrors(next)
    setTouched({ name: true, email: true, message: true, consent: true })

    // Silent success for bots (honeypot) — do not process
    if (honeypot) {
      setSubmitted(true)
      setValues(initial)
      return
    }

    if (!ok) return

    const rl = checkRateLimit('contact', 3, 10 * 60 * 1000)
    if (!rl.allowed) {
      setRateLimited(true)
      setErrors({ form: 'Too many submissions. Please wait a few minutes and try again.' })
      return
    }
    setRateLimited(false)

    // Frontend-only success — never inject raw HTML from user input
    // clean is sanitized plain text; React escapes if displayed later
    void clean
    setSubmitted(true)
    setValues(initial)
    setTouched({})
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={reveal.ref} className={`${reveal.className}`}>
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="font-display text-2xl font-bold tracking-wide text-[#E8FFF0] sm:text-3xl md:text-4xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-sm text-[#71917B] sm:text-base">
              {contactSubtitle}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-5">
            <div className="flex flex-col gap-3 lg:col-span-2">
              <a
                href={`mailto:${encodeURIComponent(personalInfo.email).replace(/%40/g, '@')}`}
                className="rounded-xl border border-[#0a6b32] bg-[#07140c]/80 p-4 transition-all hover:border-[#00FF55]/45"
              >
                <Mail className="mb-2 h-5 w-5 text-[#00FF55]" />
                <p className="font-mono text-[0.65rem] text-[#00D9FF]">EMAIL</p>
                <p className="mt-1 break-all font-body text-sm text-[#E8FFF0]">
                  {personalInfo.email}
                </p>
              </a>
{personalInfo.phone && (
              <a
                href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`}
                className="rounded-xl border border-[#0a6b32] bg-[#07140c]/80 p-4 transition-all hover:border-[#00FF55]/45"
              >
                <Phone className="mb-2 h-5 w-5 text-[#00FF55]" />
                <p className="font-mono text-[0.65rem] text-[#00D9FF]">PHONE</p>
                <p className="mt-1 font-body text-sm text-[#E8FFF0]">{personalInfo.phone}</p>
              </a>
              )}
              <div className="rounded-xl border border-[#0a6b32] bg-[#07140c]/80 p-4">
                <MapPin className="mb-2 h-5 w-5 text-[#00FF55]" />
                <p className="font-mono text-[0.65rem] text-[#00D9FF]">LOCATION</p>
                <p className="mt-1 font-body text-sm text-[#E8FFF0]">{personalInfo.location}</p>
              </div>
              <a
                href={safeHref(socialLinks.linkedin)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-xl border border-[#0a6b32] bg-[#07140c]/80 p-4 transition-all hover:border-[#00FF55]/45"
              >
                <p className="font-mono text-[0.65rem] text-[#00D9FF]">LINKEDIN</p>
                <p className="mt-1 font-body text-sm text-[#00FF55]">Connect with me →</p>
              </a>
            </div>

            <div className="lg:col-span-3">
              <div className="relative panel-border-glow rounded-xl bg-[#07140c]/90 p-5 sm:p-7">
                <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#00FF55]/70" />
                <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#00FF55]/70" />
                <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#00FF55]/70" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#00FF55]/70" />

                {submitted ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-center" role="status">
                    <CheckCircle2 className="h-12 w-12 text-[#00FF55] drop-shadow-[0_0_12px_rgba(0,255,85,0.5)]" />
                    <p className="font-display text-sm font-semibold tracking-wide text-[#00FF55]">
                      TRANSMISSION RECEIVED
                    </p>
                    <p className="font-body text-sm text-[#71917B]">
                      Thank you. Your message has been logged successfully.
                    </p>
                    <button
                      type="button"
                      className="btn-neon-outline mt-2"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="space-y-4" autoComplete="on">
                    {/* Honeypot — hidden from users, bots often fill it */}
                    <div
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                      aria-hidden="true"
                    >
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.website}
                        onChange={onChange}
                      />
                    </div>

                    {errors.form && (
                      <p className="flex items-center gap-1 font-mono text-[0.7rem] text-[#ff3366]" role="alert">
                        <AlertCircle size={12} /> {errors.form}
                      </p>
                    )}
                    {rateLimited && !errors.form && (
                      <p className="font-mono text-[0.7rem] text-[#febc2e]" role="status">
                        Rate limit active — please wait before retrying.
                      </p>
                    )}

                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block font-mono text-[0.7rem] tracking-wide text-[#E8FFF0]"
                      >
                        Name<span className="text-[#00FF55]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={80}
                        placeholder="John Doe"
                        value={values.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={`input-cyber ${errors.name && touched.name ? 'error' : ''}`}
                        aria-invalid={!!(errors.name && touched.name)}
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1 flex items-center gap-1 font-mono text-[0.65rem] text-[#ff3366]">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block font-mono text-[0.7rem] tracking-wide text-[#E8FFF0]"
                      >
                        Email Address<span className="text-[#00FF55]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        maxLength={120}
                        placeholder="example@email.com"
                        value={values.email}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={`input-cyber ${errors.email && touched.email ? 'error' : ''}`}
                        aria-invalid={!!(errors.email && touched.email)}
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 flex items-center gap-1 font-mono text-[0.65rem] text-[#ff3366]">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block font-mono text-[0.7rem] tracking-wide text-[#E8FFF0]"
                      >
                        Message<span className="text-[#00FF55]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        maxLength={2000}
                        placeholder="There is space for your concerns here"
                        value={values.message}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={`input-cyber min-h-[100px] resize-y ${
                          errors.message && touched.message ? 'error' : ''
                        }`}
                        aria-invalid={!!(errors.message && touched.message)}
                      />
                      {errors.message && touched.message && (
                        <p className="mt-1 flex items-center gap-1 font-mono text-[0.65rem] text-[#ff3366]">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex cursor-pointer items-start gap-2.5">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={values.consent}
                          onChange={onChange}
                          onBlur={onBlur}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#00FF55]"
                        />
                        <span className="font-body text-xs leading-snug text-[#71917B]">
                          I acknowledge and consent to the storage of my submitted information.
                        </span>
                      </label>
                      {errors.consent && touched.consent && (
                        <p className="mt-1 flex items-center gap-1 font-mono text-[0.65rem] text-[#ff3366]">
                          <AlertCircle size={12} /> {errors.consent}
                        </p>
                      )}
                    </div>

                    <div className="pt-1">
                      <button type="submit" className="btn-neon btn-block">
                        <Send size={14} aria-hidden />
                        <span>Submit</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
