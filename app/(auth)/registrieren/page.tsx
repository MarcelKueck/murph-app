// app/(auth)/registrieren/page.tsx
import AuthForm from '@/components/features/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
    return (
         <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-8"> {/* Added padding */}
            <Card className="w-full max-w-lg mx-auto"> {/* Allow slightly wider card */}
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Konto erstellen</CardTitle>
                    <CardDescription>Registrieren Sie sich als Patient*in oder Medizinstudent*in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm mode="register" />
                </CardContent>
            </Card>
        </div>
    );
}