// app/(landing)/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, LockKeyhole, GraduationCap } from 'lucide-react';
import TrustBadge from "@/components/core/TrustBadge"; // We'll create this next

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Medizinische Fragen verständlich erklärt.
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        Erhalten Sie klare Erklärungen zu medizinischen Befunden oder Fragen von geprüften Medizinstudenten – sicher, vertraulich und ohne Fachjargon.
      </p>
      <p className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
        Wichtig: Nur Erklärungen – Keine Diagnose oder Behandlungsempfehlung!
      </p>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/registrieren">Jetzt Registrieren</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/#wie-funktionierts">Mehr erfahren</Link> {/* Link to a section below */}
        </Button>
      </div>

      {/* Trust Indicators Section */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-10">
         <TrustBadge
            icon={GraduationCap}
            title="Geprüfte Studenten"
            description="Unsere Studenten sind verifiziert und im fortgeschrittenen Studium."
          />
         <TrustBadge
            icon={LockKeyhole}
            title="Vertraulichkeit"
            description="Ihre Anfragen werden streng vertraulich behandelt (ärztl. Schweigepflicht)."
          />
          <TrustBadge
            icon={ShieldCheck}
            title="Datensicherheit"
            description="Moderne Verschlüsselung und sichere Speicherung Ihrer Daten."
          />
      </div>

      {/* Placeholder for "How it works" section */}
      <div id="wie-funktionierts" className="pt-20">
         <h2 className="text-3xl font-bold mb-6">So funktioniert's</h2>
         <p className="text-muted-foreground">(Inhalt folgt...)</p>
      </div>
    </div>
  );
}