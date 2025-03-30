// components/core/Footer.tsx
import Link from 'next/link';
import React from 'react';
import { ShieldCheck, LockKeyhole } from 'lucide-react'; // Import icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div>
            © {currentYear} Murph. Alle Rechte vorbehalten.
          </div>

          {/* Trust Statements & Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
             <div className="flex items-center gap-1.5" title="Sichere Datenübertragung und -speicherung">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Datensicherheit</span>
             </div>
             <div className="flex items-center gap-1.5" title="Vertrauliche Behandlung Ihrer Anfragen gemäß ärztlicher Schweigepflicht durch Studierende">
                 <LockKeyhole className="h-4 w-4 text-blue-600" />
                 <span>Vertraulichkeit</span>
             </div>
            {/* Static Links */}
            <Link href="/datenschutz" className="hover:text-foreground transition-colors">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-foreground transition-colors">
              AGB
            </Link>
          </div>
        </div>
         {/* Disclaimer */}
         <div className="text-center text-xs mt-6 pt-6 border-t border-muted">
            <p className="font-semibold">Wichtiger Hinweis:</p>
            <p>Murph bietet medizinische Erklärungen durch Medizinstudenten an und ersetzt keine ärztliche Diagnose, Beratung oder Behandlung. Bei gesundheitlichen Beschwerden wenden Sie sich bitte an einen Arzt oder eine Ärztin.</p>
            <p className="mt-2">Unsere Medizinstudenten handeln nach bestem Wissen und Gewissen und unterliegen sinngemäß der ärztlichen Schweigepflicht.</p>
         </div>
      </div>
    </footer>
  );
};

export default Footer;