// app/(landing)/page.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrustBadge from "@/components/core/TrustBadge";
import {
  ShieldCheck,
  LockKeyhole,
  GraduationCap,
  FileQuestion,
  MessagesSquare,
  HeartHandshake,
  Sparkles,
  Clock,
  Briefcase,
  CheckCircle,
  User,
  ArrowRight,
  DollarSign,
  Search,
  FileText
} from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";

// --- Animation Variants ---
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};
// --- ---

export default function LandingPage() {
  console.log("Rendering LandingPage (Enhanced Backgrounds)");

  return (
    <div className="w-full bg-white"> {/* Base background */}

      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 text-center relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
        {/* Blurred background shapes */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl opacity-60 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-gray-900"
            >
              Medizinische Erklärungen von <span className="text-brand-primary">Medizinstudenten</span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="max-w-[750px] mx-auto text-lg text-gray-600 md:text-xl mb-8"
            >
              Erhalten Sie schnelle, verständliche Erklärungen zu Ihren medizinischen Fragen und Befunden – vertraulich, sicher und direkt von verifizierten Medizinstudenten.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              className="mb-8 inline-block bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm"
            >
              Wichtig: Nur Erklärungen – Keine Diagnose oder Behandlungsempfehlung!
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {/* Apply animateInteraction to Hero buttons */}
              <Link href="/registrieren?role=PATIENT">
                <Button size="lg" animateInteraction>
                  Für Patienten
                </Button>
              </Link>
              <Link href="/registrieren?role=STUDENT">
                <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm" animateInteraction>
                  Für Medizinstudenten
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        className="w-full py-16 md:py-24 bg-white" // Keep white for contrast
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <motion.div variants={fadeInUpVariants}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-800">Gesundheit verstehen, Sorgen nehmen.</h2>
              <p className="text-lg text-gray-600 mb-6">
                Zwischen langen Wartezeiten, kurzen Arztterminen und komplexem Fachjargon bleiben oft Fragen offen. Murph überbrückt diese Lücke und bietet Ihnen leicht zugängliche, verständliche Erklärungen von Medizinstudenten, die sich Zeit für Sie nehmen.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-brand-primary flex-shrink-0" />
                  <span>Unklare Befunde endlich nachvollziehen.</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-brand-primary flex-shrink-0" />
                  <span>Medizinische Dokumente besser verstehen.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-primary flex-shrink-0" />
                  <span>Schnelle Klärung ohne Terminhatz.</span>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="relative aspect-video rounded-xl overflow-hidden shadow-xl group border"> {/* Enhanced styling */}
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjU5N3wwfDF8c2VhcmNofDF8fGRvY3RvciUyMGxhcHRvcCUyMGRhdGF8ZW58MHx8fHwxNzEyMjQ4ODUwfDA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Person schaut auf medizinische Daten auf einem Laptop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw" // Simplified sizes
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How it Works Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        // Using a light tint of brand primary (adjust HSL values in tailwind.config or use direct color like bg-teal-50)
        className="w-full py-16 md:py-24 bg-gradient-to-b from-teal-50/50 via-white to-teal-50/50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16 text-gray-900">So einfach funktioniert's</h2>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Step 1 */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border border-gray-100">
              <div className="mb-5 rounded-full bg-brand-primary/10 p-4 text-brand-primary">
                <FileQuestion className="h-9 w-9" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Anfrage stellen</h3>
              <p className="text-gray-600">Beschreiben Sie Ihre Frage oder laden Sie relevante Dokumente (z.B. Befunde) sicher hoch.</p>
            </motion.div>
            {/* Step 2 */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border border-gray-100">
              <div className="mb-5 rounded-full bg-brand-primary/10 p-4 text-brand-primary">
                <MessagesSquare className="h-9 w-9" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Erklärung erhalten</h3>
              <p className="text-gray-600">Ein verifizierter Medizinstudent nimmt Ihre Anfrage an und erklärt Ihnen alles verständlich im sicheren Chat.</p>
            </motion.div>
            {/* Step 3 */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border border-gray-100">
              <div className="mb-5 rounded-full bg-brand-primary/10 p-4 text-brand-primary">
                <HeartHandshake className="h-9 w-9" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Sicher fühlen</h3>
              <p className="text-gray-600">Gewinnen Sie Klarheit und Sicherheit im Umgang mit medizinischen Informationen – vertraulich und kompetent.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUpVariants}
        className="w-full py-16 md:py-24 bg-white" // Back to white
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16 text-gray-900">Ihre Vorteile mit Murph</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">

            {/* Patient Benefits */}
            <motion.div variants={fadeInUpVariants} className="p-8 rounded-lg bg-teal-50/40 border border-teal-100 shadow-sm"> {/* Added padding/shadow */}
              <h3 className="flex items-center text-2xl font-semibold mb-6 text-gray-800">
                <User className="mr-3 h-7 w-7 text-brand-primary" />
                Für Patienten
              </h3>
              <motion.ul
                variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Benefit List Items - styling adjusted slightly */}
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Schnelle Antworten</h4>
                    <p className="text-sm text-gray-600">Erhalten Sie zeitnah verständliche Erklärungen, ohne lange Wartezeiten.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <Sparkles className="h-6 w-6 mt-0.5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Klare Sprache</h4>
                    <p className="text-sm text-gray-600">Medizinstudenten erklären komplexe Sachverhalte ohne Fachjargon.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <FileQuestion className="h-6 w-6 mt-0.5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Befunde verstehen</h4>
                    <p className="text-sm text-gray-600">Laden Sie Dokumente hoch und lassen Sie sich den Inhalt erklären.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <LockKeyhole className="h-6 w-6 mt-0.5 text-gray-700 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Vertraulich & Sicher</h4>
                    <p className="text-sm text-gray-600">Ihre Daten und Anfragen werden streng vertraulich behandelt.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Student Benefits */}
            <motion.div variants={fadeInUpVariants} className="p-8 rounded-lg bg-indigo-50/40 border border-indigo-100 shadow-sm"> {/* Added padding/shadow */}
              <h3 className="flex items-center text-2xl font-semibold mb-6 text-gray-800">
                <GraduationCap className="mr-3 h-7 w-7 text-brand-secondary" />
                Für Medizinstudenten
              </h3>
              <motion.ul
                variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Benefit List Items - styling adjusted slightly */}
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <Briefcase className="h-6 w-6 mt-0.5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Praktische Erfahrung</h4>
                    <p className="text-sm text-gray-600">Wenden Sie Ihr Wissen an und verbessern Sie Ihre Kommunikationsfähigkeiten.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <Clock className="h-6 w-6 mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Flexible Zeiteinteilung</h4>
                    <p className="text-sm text-gray-600">Arbeiten Sie, wann und wo es in Ihren Studienplan passt.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <HeartHandshake className="h-6 w-6 mt-0.5 text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Sinnvoller Beitrag</h4>
                    <p className="text-sm text-gray-600">Helfen Sie Patienten, ihre Gesundheit besser zu verstehen und entlasten Sie das System.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <DollarSign className="h-6 w-6 mt-0.5 text-lime-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Faire Vergütung</h4>
                    <p className="text-sm text-gray-600">Erhalten Sie eine angemessene Bezahlung für Ihre wertvolle Zeit und Expertise.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trust & Security Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        // Using a subtle grey gradient
        className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">Vertrauen und Sicherheit an erster Stelle</h2>
          <p className="max-w-3xl mx-auto text-gray-600 md:text-lg mb-16">
            Wir wissen, wie sensibel medizinische Informationen sind. Deshalb legen wir höchsten Wert auf den Schutz Ihrer Daten und die Vertraulichkeit Ihrer Anfragen.
          </p>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUpVariants}>
              <TrustBadge icon={LockKeyhole} iconColor="text-blue-600" title="Streng Vertraulich" description="Alle Anfragen werden absolut vertraulich behandelt. Unsere Studenten unterliegen sinngemäß der ärztlichen Schweigepflicht." />
            </motion.div>
            <motion.div variants={fadeInUpVariants}>
              <TrustBadge icon={ShieldCheck} iconColor="text-green-600" title="Höchste Datensicherheit" description="Moderne Verschlüsselung und sichere Infrastruktur (gehostet auf Vercel in der EU) schützen Ihre Daten." />
            </motion.div>
            <motion.div variants={fadeInUpVariants}>
              <TrustBadge icon={GraduationCap} iconColor="text-indigo-600" title="Verifizierte Studenten" description="Wir prüfen die Immatrikulation und den Fortschritt unserer Medizinstudenten sorgfältig." />
            </motion.div>
          </motion.div>
          <motion.p
            variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="text-base font-semibold text-orange-800 bg-orange-100 px-5 py-2 rounded-full inline-block shadow-sm"
          >
            Wichtiger Hinweis: Murph bietet ausschließlich Erklärungen und keine Diagnosen oder Behandlungsempfehlungen!
          </motion.p>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        className="w-full py-20 md:py-32 text-center bg-white" // Keep final CTA clean
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">Bereit für mehr Klarheit?</h2>
          <p className="max-w-xl mx-auto text-gray-600 md:text-lg mb-8">
            Registrieren Sie sich jetzt kostenlos als Patient oder werden Sie Teil unseres Teams als Medizinstudent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* animateInteraction already present */}
            <Link href="/registrieren?role=PATIENT">
              <Button size="lg" animateInteraction>
                Jetzt als Patient starten <ArrowRight className="ml-2 h-5 w-5"/>
              </Button>
            </Link>
            <Link href="/registrieren?role=STUDENT">
              <Button size="lg" variant="secondary" animateInteraction>
                Als Student bewerben <GraduationCap className="ml-2 h-5 w-5"/>
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}