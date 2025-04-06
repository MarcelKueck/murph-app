// lib/email.ts
import { User, UserRole, Consultation } from '@prisma/client'; // Import relevant types

// Define email content structure
interface EmailOptions {
  to: string;
  subject: string;
  text: string; // Plain text version
  html: string; // HTML version
}

// Interface for user data passed to templates
interface UserInfo {
    email: string;
    firstName?: string | null;
    role?: UserRole;
}
// Interface for sender data in templates
interface SenderInfo {
    name: string;
}
// Interface for consultation data in templates
interface ConsultationInfo {
    id: string;
    topic: string;
}
// Interface for feedback data
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
    text: `Hallo ${user.firstName || 'Nutzer'},\n\nSie haben angefordert, Ihr Passwort zurückzusetzen... Link (gültig für 1 Stunde):\n${resetLink}\n\n...`,
    html: `<p>Hallo ${user.firstName || 'Nutzer'},</p><p>... Link (gültig für 1 Stunde):</p><p><a href="${resetLink}">${resetLink}</a></p><p>...`,
  }),
  consultationCompleted: (patient: UserInfo, consultation: ConsultationInfo, feedbackLink: string) => ({
    subject: `Ihre Murph-Beratung "${consultation.topic}" wurde abgeschlossen`,
    text: `Hallo ${patient.firstName || 'Nutzer'},\n\nIhre Beratung zum Thema "${consultation.topic}" wurde abgeschlossen...\nDashboard: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}\n\nFeedback:\n${feedbackLink}\n\n...`,
    html: `<p>Hallo ${patient.firstName || 'Nutzer'},</p><p>... <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}">hier einsehen</a>.</p><p>... <a href="${feedbackLink}">Feedback geben</a> ...</p><p>...`,
  }),
  newMessage: (recipient: UserInfo, sender: SenderInfo, consultation: ConsultationInfo) => {
      const dashboardPath = recipient.role === UserRole.PATIENT ? 'patient' : recipient.role === UserRole.STUDENT ? 'student' : '';
      const messageLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${dashboardPath}/beratungen/${consultation.id}`;
      return {
          subject: `Neue Nachricht in Ihrer Murph-Beratung "${consultation.topic}"`,
          text: `Hallo ${recipient.firstName || 'Nutzer'},\n\nSie haben eine neue Nachricht von ${sender.name} in Ihrer Beratung "${consultation.topic}" erhalten.\n\nLink: ${messageLink}\n\n...`,
          html: `<p>Hallo ${recipient.firstName || 'Nutzer'},</p><p>Neue Nachricht von ${sender.name} in Beratung "${consultation.topic}".</p><p><a href="${messageLink}">Nachricht ansehen</a>.</p><p>...`,
      };
  },
  studentVerified: (student: UserInfo) => ({
    subject: 'Ihr Murph Studentenprofil wurde verifiziert!',
    text: `Hallo ${student.firstName || 'Nutzer'},\n\nGute Nachrichten! Ihr Profil wurde verifiziert.\n\nLink zum Dashboard: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/dashboard\n\n...`,
    html: `<p>Hallo ${student.firstName || 'Nutzer'},</p><p>Gute Nachrichten! Profil verifiziert.</p><p><a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/dashboard">Anfragen annehmen</a>.</p><p>...`,
  }),

  // <<< NEW TEMPLATES >>>
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
  // <<< END NEW TEMPLATES >>>
};


// Simulated Email Sending Function (Logs to console)
export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<{ success: boolean; error?: string }> {
    const emailFrom = process.env.EMAIL_FROM || 'noreply@murph.local';

    if (!to || !subject || (!text && !html)) {
        console.error('Email Error: Missing required fields (to, subject, text/html).');
        return { success: false, error: 'Missing required email fields.' };
    }

    console.log('\n--- SENDING EMAIL (SIMULATION) ---');
    console.log(`From: ${emailFrom}`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('--- Text ---');
    console.log(text);
    console.log('--- HTML ---');
    console.log(html);
    console.log('---------------------------------\n');

    await new Promise(resolve => setTimeout(resolve, 50));

    return { success: true };
}