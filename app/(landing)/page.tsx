// app/(landing)/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, LockKeyhole, GraduationCap } from 'lucide-react';
import TrustBadge from "@/components/core/TrustBadge";
import { motion } from "framer-motion"; // Import motion

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-12">
      <motion.h1 // Example: Animate heading
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold tracking-tight"
      >
        Medizinische Fragen verständlich erklärt.
      </motion.h1>
      <motion.p // Example: Animate paragraph
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-muted-foreground max-w-2xl"
      >
        Erhalten Sie klare Erklärungen zu medizinischen Befunden oder Fragen von geprüften Medizinstudenten – sicher, vertraulich und ohne Fachjargon.
      </motion.p>
      <p className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
        Wichtig: Nur Erklärungen – Keine Diagnose oder Behandlungsempfehlung!
      </p>
      <div className="flex gap-4">
        {/* --- Add animateInteraction prop --- */}
        <Button size="lg" asChild animateInteraction>
          <Link href="/registrieren">Jetzt Registrieren</Link>
        </Button>
        {/* Outline button usually doesn't need the strong pulse/scale */}
        <Button size="lg" variant="outline" asChild>
          <Link href="/#wie-funktionierts">Mehr erfahren</Link> {/* Link to a section below */}
        </Button>
      </div>

      {/* Trust Indicators Section - Stagger animation example */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } // Stagger children
        }}
        className="flex flex-wrap justify-center gap-6 md:gap-10 pt-10"
      >
         {/* Wrap TrustBadge in motion.div for stagger */}
         <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <TrustBadge
                icon={GraduationCap}
                title="Geprüfte Studenten"
                description="Unsere Studenten sind verifiziert und im fortgeschrittenen Studium."
            />
         </motion.div>
         <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <TrustBadge
                icon={LockKeyhole}
                title="Vertraulichkeit"
                description="Ihre Anfragen werden streng vertraulich behandelt (ärztl. Schweigepflicht)."
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <TrustBadge
                icon={ShieldCheck}
                title="Datensicherheit"
                description="Moderne Verschlüsselung und sichere Speicherung Ihrer Daten."
            />
          </motion.div>
      </motion.div>

      {/* Placeholder for "How it works" section */}
      <div id="wie-funktionierts" className="pt-20">
         <h2 className="text-3xl font-bold mb-6">So funktioniert's</h2>
         <p className="text-muted-foreground">(Inhalt folgt...)</p>
         {/* Add actual content and potentially animations here */}
      </div>
    </div>
  );
}