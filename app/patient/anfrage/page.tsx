// app/patient/anfrage/page.tsx
import ConsultationRequestForm from '@/components/features/ConsultationRequestForm';

// Auth is handled by layout/middleware
export default function RequestConsultationPage() {
    return (
        <div className="container mx-auto py-8">
            <ConsultationRequestForm />
        </div>
    );
}