// app/(auth)/login/page.tsx
import AuthForm from '@/components/features/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center"> {/* Adjust min-height as needed */}
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Willkommen zurück!</CardTitle>
                    <CardDescription>Melden Sie sich bei Ihrem Murph-Konto an.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm mode="login" />
                </CardContent>
            </Card>
        </div>
    );
}