// prisma/seed.ts
import { PrismaClient, UserRole, ConsultationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

const SALT_ROUNDS = 10; // Cost factor for bcrypt hashing

async function main() {
  console.log(`Start seeding ...`);

  // --- Clear existing data (optional, but recommended for repeatable seeding) ---
  // Order matters due to foreign key constraints! Delete dependent records first.
  console.log('Deleting existing data (Messages, Documents, Consultations)...');
  await prisma.message.deleteMany();
  await prisma.document.deleteMany();
  await prisma.consultation.deleteMany();

  console.log('Deleting existing profiles (Patient, Student)...');
  await prisma.patientProfile.deleteMany();
  await prisma.studentProfile.deleteMany();

  console.log('Deleting existing users and related auth data (Accounts, Sessions)...');
  await prisma.account.deleteMany(); // Related to User
  await prisma.session.deleteMany(); // Related to User
  await prisma.user.deleteMany();
  console.log('Existing data deleted.');


  // --- Seed Patients ---
  console.log('Seeding Patients...');
  const patientPassword = await bcrypt.hash('passwort123', SALT_ROUNDS); // Same simple password for all demo users

  const patient1 = await prisma.user.create({
    data: {
      email: 'anna.mueller@email.de',
      passwordHash: patientPassword,
      role: UserRole.PATIENT,
      patientProfile: {
        create: {
          firstName: 'Anna',
          lastName: 'Müller',
          dob: new Date('1988-05-12'),
        },
      },
    },
    include: { patientProfile: true } // Include profile to easily access its ID if needed later
  });

  const patient2 = await prisma.user.create({
    data: {
      email: 'max.schmidt@web.de',
      passwordHash: patientPassword,
      role: UserRole.PATIENT,
      patientProfile: {
        create: {
          firstName: 'Max',
          lastName: 'Schmidt',
          dob: new Date('1995-11-23'),
        },
      },
    },
     include: { patientProfile: true }
  });

  const patient3 = await prisma.user.create({
    data: {
      email: 'sophie.fischer@mail.com',
      passwordHash: patientPassword,
      role: UserRole.PATIENT,
      patientProfile: {
        create: {
          firstName: 'Sophie',
          lastName: 'Fischer',
          // dob: null // Example of nullable DOB
        },
      },
    },
     include: { patientProfile: true }
  });
  console.log(`Seeded ${await prisma.user.count({ where: { role: UserRole.PATIENT }})} patients.`);

  // --- Seed Students ---
  console.log('Seeding Students...');
  const studentPassword = await bcrypt.hash('studpass456', SALT_ROUNDS); // Different simple password

  const student1 = await prisma.user.create({
    data: {
      email: 'lukas.huber@med.uni-muenchen.de',
      passwordHash: studentPassword,
      role: UserRole.STUDENT,
      studentProfile: {
        create: {
          firstName: 'Lukas',
          lastName: 'Huber',
          university: 'LMU München',
          clinicalYear: 4,
          isVerified: true, // Verified for V1.0 testing
        },
      },
    },
     include: { studentProfile: true }
  });

  const student2 = await prisma.user.create({
    data: {
      email: 'julia.bauer@charite.de',
      passwordHash: studentPassword,
      role: UserRole.STUDENT,
      studentProfile: {
        create: {
          firstName: 'Julia',
          lastName: 'Bauer',
          university: 'Charité - Universitätsmedizin Berlin',
          clinicalYear: 5,
          isVerified: true,
        },
      },
    },
     include: { studentProfile: true }
  });

   const student3 = await prisma.user.create({
    data: {
      email: 'felix.wagner@med.uni-heidelberg.de',
      passwordHash: studentPassword,
      role: UserRole.STUDENT,
      studentProfile: {
        create: {
          firstName: 'Felix',
          lastName: 'Wagner',
          university: 'Universität Heidelberg',
          clinicalYear: 3,
          isVerified: true,
        },
      },
    },
     include: { studentProfile: true }
  });
  console.log(`Seeded ${await prisma.user.count({ where: { role: UserRole.STUDENT }})} students.`);


  // --- Seed Consultations ---
  console.log('Seeding Consultations...');

  // 1. REQUESTED Consultation (with document)
  const requestedConsultation = await prisma.consultation.create({
    data: {
      patientId: patient1.id,
      status: ConsultationStatus.REQUESTED,
      topic: 'Frage zu Blutwerten',
      patientQuestion: 'Meine Leberwerte (GOT, GPT) sind laut letztem Blutbild leicht erhöht. Was könnte das allgemein bedeuten? Ich habe keine Beschwerden.',
      documents: {
        create: [
          {
            uploaderId: patient1.id,
            fileName: 'Blutbild_Scan.pdf',
            storageUrl: 'placeholder/seed/Blutbild_Scan.pdf', // Placeholder URL
            mimeType: 'application/pdf',
            fileSize: 123456,
          },
           {
            uploaderId: patient1.id,
            fileName: 'Notizen_Arzt.jpg',
            storageUrl: 'placeholder/seed/Notizen_Arzt.jpg', // Placeholder URL
            mimeType: 'image/jpeg',
            fileSize: 78910,
          },
        ]
      }
    }
  });

  // 2. REQUESTED Consultation (no document)
   await prisma.consultation.create({
    data: {
      patientId: patient2.id,
      status: ConsultationStatus.REQUESTED,
      topic: 'Erklärung MRT-Befund Knie',
      patientQuestion: 'Ich habe einen MRT-Befund für mein Knie erhalten und verstehe den Fachbegriff "Chondropathia patellae Grad II" nicht. Können Sie mir das bitte einfach erklären?',
    }
  });

  // 3. IN_PROGRESS Consultation
  const inProgressConsultation = await prisma.consultation.create({
     data: {
      patientId: patient3.id,
      studentId: student1.id, // Assigned to Lukas Huber
      status: ConsultationStatus.IN_PROGRESS,
      topic: 'Nebenwirkungen Medikament X',
      patientQuestion: 'Ich nehme seit einer Woche Medikament X und habe seitdem häufig Kopfschmerzen. Ist das eine bekannte Nebenwirkung?',
      messages: {
        create: [
          { // Initial message copy from question might be redundant if UI handles it, but good for seed data
            senderId: patient3.id,
            content: 'Ich nehme seit einer Woche Medikament X und habe seitdem häufig Kopfschmerzen. Ist das eine bekannte Nebenwirkung?',
            createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
          },
          {
            senderId: student1.id, // Lukas
            content: 'Guten Tag! Vielen Dank für Ihre Anfrage. Kopfschmerzen können tatsächlich eine mögliche Nebenwirkung von Medikament X sein. Wie stark sind die Kopfschmerzen denn?',
            createdAt: new Date(Date.now() - 1000 * 60 * 8), // 8 mins ago
          },
          {
            senderId: patient3.id,
            content: 'Hallo Lukas, danke für die schnelle Antwort. Sie sind eher dumpf und nicht extrem stark, aber störend.',
             createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
          }
        ]
      }
    }
  });

  // 4. COMPLETED Consultation
  const completedConsultation = await prisma.consultation.create({
     data: {
      patientId: patient2.id, // Max Schmidt
      studentId: student2.id, // Assigned to Julia Bauer
      status: ConsultationStatus.COMPLETED,
      topic: 'Unsicherheit nach Arztbesuch',
      patientQuestion: 'Der Arzt hat etwas von einer "Differentialdiagnose" erwähnt in Bezug auf meine Symptome. Was genau bedeutet das?',
      summary: 'Patient fragte nach der Bedeutung des Begriffs "Differentialdiagnose". Erklärt als Prozess des systematischen Ausschlusses von Krankheiten mit ähnlichen Symptomen, um zur wahrscheinlichsten Diagnose zu gelangen. Auf reinen Erklärungscharakter hingewiesen.',
      messages: {
         create: [
          {
            senderId: patient2.id,
            content: 'Hallo, können Sie mir erklären, was "Differentialdiagnose" bedeutet?',
             createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          },
          {
            senderId: student2.id, // Julia
            content: 'Hallo Max, gerne. Eine Differentialdiagnose ist eine Liste von möglichen Erkrankungen, die ähnliche Symptome wie Ihre verursachen könnten. Der Arzt prüft diese dann Schritt für Schritt, um die wahrscheinlichste Ursache zu finden.',
             createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 5), // 2 days ago + 5 mins
          },
           {
            senderId: patient2.id,
            content: 'Ah, verstehe. Das hilft mir sehr weiter, danke!',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), // 2 days ago + 10 mins
          },
           {
            senderId: student2.id, // Julia
            content: 'Freut mich, wenn ich helfen konnte! Wenn keine weiteren Fragen bestehen, würde ich die Beratung nun abschließen.',
             createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15), // 2 days ago + 15 mins
          }
        ]
      }
    }
  });

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
    // Close Prisma Client connection
    await prisma.$disconnect();
  });