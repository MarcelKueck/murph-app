// prisma/seed.ts
import { PrismaClient, UserRole, ConsultationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  console.log(`Start seeding ...`);

  // --- Clear existing data ---
  console.log('Deleting existing data (PasswordResetTokens)...');
  await prisma.passwordResetToken.deleteMany();
  console.log('Deleting existing data (Messages, Documents, Consultations)...');
  await prisma.message.deleteMany();
  await prisma.document.deleteMany();
  await prisma.consultation.deleteMany();
  console.log('Deleting existing profiles (Patient, Student)...');
  await prisma.patientProfile.deleteMany();
  await prisma.studentProfile.deleteMany();
  console.log('Deleting existing users and related auth data (Accounts, Sessions)...');
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  console.log('Existing data deleted.');


  // --- Seed Admin User ---
  console.log('Seeding Admin User...');
  const adminPassword = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD || 'adminPass123!', SALT_ROUNDS); // Use env var or fallback
  const adminUser = await prisma.user.create({
    data: {
      email: process.env.ADMIN_SEED_EMAIL || 'admin@murph.app', // Use env var or fallback
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      // Admin might not need a specific profile, or you could add a simple one if needed later
    }
  });
  console.log(`Seeded Admin User: ${adminUser.email}`);


  // --- Seed Patients ---
  console.log('Seeding Patients...');
  const patientPassword = await bcrypt.hash('passwort123', SALT_ROUNDS);
  const patient1 = await prisma.user.create({ data: { email: 'anna.mueller@email.de', passwordHash: patientPassword, role: UserRole.PATIENT, patientProfile: { create: { firstName: 'Anna', lastName: 'Müller', dob: new Date('1988-05-12'), }, }, }, include: { patientProfile: true } });
  const patient2 = await prisma.user.create({ data: { email: 'max.schmidt@web.de', passwordHash: patientPassword, role: UserRole.PATIENT, patientProfile: { create: { firstName: 'Max', lastName: 'Schmidt', dob: new Date('1995-11-23'), }, }, }, include: { patientProfile: true } });
  const patient3 = await prisma.user.create({ data: { email: 'sophie.fischer@mail.com', passwordHash: patientPassword, role: UserRole.PATIENT, patientProfile: { create: { firstName: 'Sophie', lastName: 'Fischer', }, }, }, include: { patientProfile: true } });
  console.log(`Seeded ${await prisma.user.count({ where: { role: UserRole.PATIENT }})} patients.`);


  // --- Seed Students ---
  console.log('Seeding Students...');
  const studentPassword = await bcrypt.hash('studpass456', SALT_ROUNDS);
  const student1 = await prisma.user.create({ data: { email: 'lukas.huber@med.uni-muenchen.de', passwordHash: studentPassword, role: UserRole.STUDENT, studentProfile: { create: { firstName: 'Lukas', lastName: 'Huber', university: 'LMU München', clinicalYear: 4, isVerified: true, }, }, }, include: { studentProfile: true } });
  const student2 = await prisma.user.create({ data: { email: 'julia.bauer@charite.de', passwordHash: studentPassword, role: UserRole.STUDENT, studentProfile: { create: { firstName: 'Julia', lastName: 'Bauer', university: 'Charité - Universitätsmedizin Berlin', clinicalYear: 5, isVerified: true, }, }, }, include: { studentProfile: true } });
  const student3 = await prisma.user.create({ data: { email: 'felix.wagner@med.uni-heidelberg.de', passwordHash: studentPassword, role: UserRole.STUDENT, studentProfile: { create: { firstName: 'Felix', lastName: 'Wagner', university: 'Universität Heidelberg', clinicalYear: 3, isVerified: false, }, }, }, include: { studentProfile: true } }); // <<< Made one student unverified
  console.log(`Seeded ${await prisma.user.count({ where: { role: UserRole.STUDENT }})} students.`);


  // --- Seed Consultations ---
  console.log('Seeding Consultations...');
  // 1. REQUESTED (with doc)
  await prisma.consultation.create({ data: { patientId: patient1.id, status: ConsultationStatus.REQUESTED, topic: 'Frage zu Blutwerten', patientQuestion: 'Meine Leberwerte (GOT, GPT) sind laut letztem Blutbild leicht erhöht. Was könnte das allgemein bedeuten? Ich habe keine Beschwerden.',
    categories: ["Befundbesprechung"], // <<< Add categories
    documents: { create: [ { uploaderId: patient1.id, fileName: 'Blutbild_Scan.pdf', storageUrl: 'placeholder/seed/Blutbild_Scan.pdf', mimeType: 'application/pdf', fileSize: 123456, }, { uploaderId: patient1.id, fileName: 'Notizen_Arzt.jpg', storageUrl: 'placeholder/seed/Notizen_Arzt.jpg', mimeType: 'image/jpeg', fileSize: 78910, }, ] } } });
  // 2. REQUESTED (no doc)
  await prisma.consultation.create({ data: { patientId: patient2.id, status: ConsultationStatus.REQUESTED, topic: 'Erklärung MRT-Befund Knie', patientQuestion: 'Ich habe einen MRT-Befund für mein Knie erhalten und verstehe den Fachbegriff "Chondropathia patellae Grad II" nicht. Können Sie mir das bitte einfach erklären?',
    categories: ["Befundbesprechung", "Verfahren"], // <<< Add categories
  } });
  // 3. IN_PROGRESS
  await prisma.consultation.create({ data: { patientId: patient3.id, studentId: student1.id, status: ConsultationStatus.IN_PROGRESS, topic: 'Nebenwirkungen Medikament X', patientQuestion: 'Ich nehme seit einer Woche Medikament X und habe seitdem häufig Kopfschmerzen. Ist das eine bekannte Nebenwirkung?',
    categories: ["Medikamente", "Symptomklärung"], // <<< Add categories
    messages: { create: [ { senderId: patient3.id, content: 'Ich nehme seit einer Woche Medikament X und habe seitdem häufig Kopfschmerzen. Ist das eine bekannte Nebenwirkung?', createdAt: new Date(Date.now() - 1000 * 60 * 10), }, { senderId: student1.id, content: 'Guten Tag! Vielen Dank für Ihre Anfrage. Kopfschmerzen können tatsächlich eine mögliche Nebenwirkung von Medikament X sein. Wie stark sind die Kopfschmerzen denn?', createdAt: new Date(Date.now() - 1000 * 60 * 8), }, { senderId: patient3.id, content: 'Hallo Lukas, danke für die schnelle Antwort. Sie sind eher dumpf und nicht extrem stark, aber störend.', createdAt: new Date(Date.now() - 1000 * 60 * 5), } ] } } });
  // 4. COMPLETED
  await prisma.consultation.create({ data: { patientId: patient2.id, studentId: student2.id, status: ConsultationStatus.COMPLETED, topic: 'Unsicherheit nach Arztbesuch', patientQuestion: 'Der Arzt hat etwas von einer "Differentialdiagnose" erwähnt in Bezug auf meine Symptome. Was genau bedeutet das?', summary: 'Patient fragte nach der Bedeutung des Begriffs "Differentialdiagnose". Erklärt als Prozess des systematischen Ausschlusses von Krankheiten mit ähnlichen Symptomen, um zur wahrscheinlichsten Diagnose zu gelangen. Auf reinen Erklärungscharakter hingewiesen.',
    categories: ["Allgemein"], // <<< Add categories
    messages: { create: [ { senderId: patient2.id, content: 'Hallo, können Sie mir erklären, was "Differentialdiagnose" bedeutet?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), }, { senderId: student2.id, content: 'Hallo Max, gerne. Eine Differentialdiagnose ist eine Liste von möglichen Erkrankungen, die ähnliche Symptome wie Ihre verursachen könnten. Der Arzt prüft diese dann Schritt für Schritt, um die wahrscheinlichste Ursache zu finden.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 5), }, { senderId: patient2.id, content: 'Ah, verstehe. Das hilft mir sehr weiter, danke!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), }, { senderId: student2.id, content: 'Freut mich, wenn ich helfen konnte! Wenn keine weiteren Fragen bestehen, würde ich die Beratung nun abschließen.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15), } ] } } });

  console.log(`Seeded ${await prisma.consultation.count()} consultations.`);
  console.log(`Seeded ${await prisma.message.count()} messages.`);
  console.log(`Seeded ${await prisma.document.count()} documents.`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });