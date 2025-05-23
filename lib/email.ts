// lib/email.ts
import { User, UserRole, Consultation } from '@prisma/client';
import { Resend } from 'resend'; // Import Resend

// --- Initialize Resend ---
let resend: Resend | null = null;
const resendApiKey = process.env.RESEND_API_KEY;

if (resendApiKey) {
    resend = new Resend(resendApiKey);
    console.log("Resend client initialized.");
} else {
    console.warn("RESEND_API_KEY environment variable not found. Real email sending disabled.");
}
// --- ---

// --- Define email content structure ---
interface EmailOptions {
  to: string;
  subject: string;
  text: string; // Plain text version
  html: string; // HTML version
}

// --- Interfaces for template data ---
interface UserInfo {
    email: string;
    firstName?: string | null;
    role?: UserRole;
}
interface SenderInfo {
    name: string;
}
interface ConsultationInfo {
    id: string;
    topic: string;
}
interface FeedbackInfo {
    rating: number;
    comment?: string | null;
}


// --- Email Templates ---
export const templates = {
  welcome: (user: UserInfo) => ({
    subject: `Willkommen bei Murph, ${user.firstName || 'Nutzer'}!`,
    text: `Hallo ${user.firstName || 'Nutzer'},\n\nWillkommen bei Murph! Wir freuen uns, Sie an Bord zu haben.\n\nSie können sich jederzeit hier einloggen: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/login\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${user.firstName || 'Nutzer'},</p><p>Willkommen bei Murph! Wir freuen uns, Sie an Bord zu haben.</p><p>Sie können sich jederzeit <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/login">hier einloggen</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  passwordReset: (user: UserInfo, resetLink: string) => ({
    subject: 'Ihr Passwort-Reset für Murph',
    text: `Hallo ${user.firstName || 'Nutzer'},\n\nSie haben angefordert, Ihr Passwort zurückzusetzen. Bitte klicken Sie auf den folgenden Link, um ein neues Passwort festzulegen (dieser Link ist 1 Stunde gültig):\n${resetLink}\n\nWenn Sie dies nicht angefordert haben, können Sie diese E-Mail ignorieren.\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${user.firstName || 'Nutzer'},</p><p>Sie haben angefordert, Ihr Passwort zurückzusetzen. Bitte klicken Sie auf den folgenden Link, um ein neues Passwort festzulegen (dieser Link ist 1 Stunde gültig):</p><p><a href="${resetLink}">${resetLink}</a></p><p>Wenn Sie dies nicht angefordert haben, können Sie diese E-Mail ignorieren.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  // <<< MODIFIED consultationCompleted template >>>
  consultationCompleted: (patient: UserInfo, consultation: ConsultationInfo, feedbackLink: string) => ({
    subject: `Ihre Murph-Beratung "${consultation.topic}" wurde abgeschlossen`,
    text: `Hallo ${patient.firstName || 'Nutzer'},\n\nIhre Murph-Beratung zum Thema "${consultation.topic}" wurde vom Medizinstudenten abgeschlossen.\n\nUm die schriftliche Zusammenfassung der Erklärung einzusehen und als PDF herunterzuladen, bitten wir Sie um ein kurzes Feedback zu Ihrer Erfahrung. Ihr Feedback hilft uns und den Studierenden, Murph stetig zu verbessern.\n\nFeedback geben und Zusammenfassung freischalten:\n${feedbackLink}\n\nNachdem Sie Feedback gegeben haben, finden Sie die Zusammenfassung auf Ihrer Beratungsseite oder im Dashboard.\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${patient.firstName || 'Nutzer'},</p>
           <p>Ihre Murph-Beratung zum Thema "<strong>${consultation.topic}</strong>" wurde vom Medizinstudenten abgeschlossen.</p>
           <p>Um die schriftliche Zusammenfassung der Erklärung einzusehen und als PDF herunterzuladen, bitten wir Sie um ein kurzes Feedback zu Ihrer Erfahrung. Ihr Feedback hilft uns und den Studierenden, Murph stetig zu verbessern.</p>
           <p style="margin-top: 15px; margin-bottom: 15px;"><strong><a href="${feedbackLink}" style="color: #087f5b; text-decoration: underline; padding: 10px 15px; border: 1px solid #087f5b; border-radius: 5px; display: inline-block;">Feedback geben & Zusammenfassung freischalten</a></strong></p>
           <p>Nachdem Sie Feedback gegeben haben, finden Sie die Zusammenfassung auf Ihrer <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}" style="color: #087f5b;">Beratungsseite</a> oder in Ihrem <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/dashboard" style="color: #087f5b;">Dashboard</a>.</p>
           <p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  // <<< END MODIFICATION >>>
  newMessage: (recipient: UserInfo, sender: SenderInfo, consultation: ConsultationInfo) => {
      const dashboardPath = recipient.role === UserRole.PATIENT ? 'patient' : recipient.role === UserRole.STUDENT ? 'student' : '';
      const messageLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${dashboardPath}/beratungen/${consultation.id}`;
      return {
          subject: `Neue Nachricht in Ihrer Murph-Beratung "${consultation.topic}"`,
          text: `Hallo ${recipient.firstName || 'Nutzer'},\n\nSie haben eine neue Nachricht von ${sender.name} in Ihrer Beratung "${consultation.topic}" erhalten.\n\nKlicken Sie hier, um die Nachricht zu lesen:\n${messageLink}\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
          html: `<p>Hallo ${recipient.firstName || 'Nutzer'},</p><p>Sie haben eine neue Nachricht von ${sender.name} in Ihrer Beratung "${consultation.topic}" erhalten.</p><p>Klicken Sie <a href="${messageLink}">hier, um die Nachricht zu lesen</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
      };
  },
  studentVerified: (student: UserInfo) => ({
    subject: 'Ihr Murph Studentenprofil wurde verifiziert!',
    text: `Hallo ${student.firstName || 'Nutzer'},\n\nGute Nachrichten! Ihr Profil als Medizinstudent*in bei Murph wurde erfolgreich verifiziert. Sie können nun offene Beratungsanfragen von Patienten annehmen.\n\nZum Dashboard: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/dashboard\n\nViel Erfolg!\nIhr Murph Team`,
    html: `<p>Hallo ${student.firstName || 'Nutzer'},</p><p>Gute Nachrichten! Ihr Profil als Medizinstudent*in bei Murph wurde erfolgreich verifiziert. Sie können nun offene Beratungsanfragen von Patienten <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/dashboard">in Ihrem Dashboard</a> annehmen.</p><p>Viel Erfolg!<br/>Ihr Murph Team</p>`,
  }),
  requestConfirmation: (patient: UserInfo, consultation: ConsultationInfo) => ({
    subject: `Ihre Murph-Anfrage "${consultation.topic}" wurde empfangen`,
    text: `Hallo ${patient.firstName || 'Nutzer'},\n\nVielen Dank für Ihre Anfrage zum Thema "${consultation.topic}".\n\nWir haben sie erhalten und suchen nun einen passenden Medizinstudenten für Sie. Sie werden benachrichtigt, sobald Ihre Anfrage angenommen wurde.\n\nSie können den Status Ihrer Anfragen hier einsehen: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/dashboard\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${patient.firstName || 'Nutzer'},</p><p>Vielen Dank für Ihre Anfrage zum Thema "${consultation.topic}".</p><p>Wir haben sie erhalten und suchen nun einen passenden Medizinstudenten für Sie. Sie werden benachrichtigt, sobald Ihre Anfrage angenommen wurde.</p><p>Sie können den Status Ihrer Anfragen <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/dashboard">hier einsehen</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  consultationAccepted: (patient: UserInfo, student: SenderInfo, consultation: ConsultationInfo) => ({
    subject: `Ihre Murph-Anfrage "${consultation.topic}" wurde angenommen`,
    text: `Hallo ${patient.firstName || 'Nutzer'},\n\nGute Nachrichten! Ihre Anfrage zum Thema "${consultation.topic}" wurde von Medizinstudent ${student.name} angenommen.\n\nSie können die Beratung jetzt hier starten:\n${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${patient.firstName || 'Nutzer'},</p><p>Gute Nachrichten! Ihre Anfrage zum Thema "${consultation.topic}" wurde von Medizinstudent ${student.name} angenommen.</p><p>Sie können die Beratung jetzt <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}">hier starten</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  feedbackReceived: (student: UserInfo, patient: SenderInfo, consultation: ConsultationInfo, feedback: FeedbackInfo) => ({
    subject: `Neues Feedback für Ihre Murph-Beratung "${consultation.topic}"`,
    text: `Hallo ${student.firstName || 'Nutzer'},\n\nSie haben neues Feedback von ${patient.name} für Ihre abgeschlossene Beratung "${consultation.topic}" erhalten.\n\nBewertung: ${feedback.rating}/5\n${feedback.comment ? `Kommentar: ${feedback.comment}\n` : ''}\nSie können das Feedback und die Beratung hier einsehen:\n${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/beratungen/${consultation.id}\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${student.firstName || 'Nutzer'},</p><p>Sie haben neues Feedback von ${patient.name} für Ihre abgeschlossene Beratung "${consultation.topic}" erhalten.</p><p><b>Bewertung: ${feedback.rating}/5</b></p>${feedback.comment ? `<p><b>Kommentar:</b> ${feedback.comment}</p>` : ''}<p>Sie können das Feedback und die Beratung <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/beratungen/${consultation.id}">hier einsehen</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  accountDeleted: (user: UserInfo) => ({
    subject: 'Ihr Murph-Konto wurde gelöscht',
    text: `Hallo,\n\nIhr Benutzerkonto (${user.email}) bei Murph wurde wunschgemäß dauerhaft gelöscht.\n\nAlle Ihre persönlichen Daten und Beratungsverläufe wurden entfernt.\n\nWir bedauern Ihre Entscheidung und danken Ihnen für die Nutzung von Murph.\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo,</p><p>Ihr Benutzerkonto (<code>${user.email}</code>) bei Murph wurde wunschgemäß dauerhaft gelöscht.</p><p>Alle Ihre persönlichen Daten und Beratungsverläufe wurden entfernt.</p><p>Wir bedauern Ihre Entscheidung und danken Ihnen für die Nutzung von Murph.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
};


// --- Email Sending Function --- (using Resend)
export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<{ success: boolean; error?: string }> {
    if (!resend || !process.env.EMAIL_FROM) {
        const errorMsg = "Email sending is not configured (Resend API Key or EMAIL_FROM missing).";
        console.error("Email Error:", errorMsg);
        console.log('\n--- EMAIL SIMULATION (Fallback due to missing config) ---');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log('---------------------------------\n');
        return { success: false, error: errorMsg };
    }

    const emailFrom = process.env.EMAIL_FROM;

    if (!to || !subject || !html) {
        console.error('Email Error: Missing required fields (to, subject, html).');
        return { success: false, error: 'Missing required email fields.' };
    }

    try {
        console.log(`Attempting to send email via Resend to: ${to} | Subject: ${subject}`);
        const { data, error } = await resend.emails.send({
            from: emailFrom,
            to: [to],
            subject: subject,
            html: html,
            text: text,
        });

        if (error) {
            console.error('Resend API Error:', error);
            const errorMessage = (error as any)?.message || 'Failed to send email via Resend.';
            return { success: false, error: errorMessage };
        }

        console.log('Email sent successfully via Resend:', data);
        return { success: true };

    } catch (error) {
        console.error('Unexpected error sending email:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during email sending.';
        return { success: false, error: errorMessage };
    }
}