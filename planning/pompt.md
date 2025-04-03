Brilliant I would like to continue in a new chat with our project. Please create md documents that I can give to you as you knowledgebase so that you know exactly what has been done so far and what needs to be done in the next prompts. It should be a detailed plan clearly showing steps from start to finish with the final v1 version of this product as the result. It should give you all the info you need so that you can tell me exactlty what we will do in the next steps and what files i should add to your context for that purpose. Please review the entire codebase content in order to create those files and understand what has been done so far. Please also review the our previous chat where we developed the whole project up until this state. I attache all the files from the codebase and the old chat to this message. Please also create a prompt that I can give to you in the new chat based on that. Here is also the current codebase structure for your reference:
.
├── actions
│   ├── auth.ts
│   └── consultations.ts
├── app
│   ├── agb
│   │   └── page.tsx
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   │       └── route.ts
│   │   ├── nachrichten
│   │   │   └── route.ts
│   │   ├── pusher
│   │   │   └── auth
│   │   │       └── route.ts
│   │   └── upload
│   │       └── route.ts
│   ├── (auth)
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── registrieren
│   │       └── page.tsx
│   ├── datenschutz
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── (landing)
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── patient
│   │   ├── anfrage
│   │   │   └── page.tsx
│   │   ├── beratungen
│   │   │   └── [consultationId]
│   │   │       └── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── profil
│   │       └── page.tsx
│   └── student
│       ├── beratungen
│       │   └── [consultationId]
│       │       └── page.tsx
│       ├── dashboard
│       │   └── page.tsx
│       ├── layout.tsx
│       └── profil
│           └── page.tsx
├── auth.config.ts
├── components
│   ├── core
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── NextAuthProvider.tsx
│   │   └── TrustBadge.tsx
│   ├── features
│   │   ├── AuthForm.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ConsultationCard.tsx
│   │   ├── ConsultationList.tsx
│   │   ├── ConsultationRequestForm.tsx
│   │   ├── ConsultationSummaryForm.tsx
│   │   ├── DocumentLink.tsx
│   │   ├── FileUpload.tsx
│   │   ├── MessageInput.tsx
│   │   └── MessageList.tsx
│   └── ui
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
├── components.json
├── eslint.config.mjs
├── hooks
│   ├── useCurrentUser.ts
│   └── usePusherSubscription.ts
├── lib
│   ├── auth.ts
│   ├── constants.ts
│   ├── prisma.ts
│   ├── pusher
│   │   ├── client.ts
│   │   └── server.ts
│   ├── utils.ts
│   └── validation.ts
├── middleware.ts
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── planning
│   ├── API_SPECIFICATION.md
│   ├── AUTHENTICATION_FLOW.md
│   ├── COMPONENT_ARCHITECTURE.md
│   ├── DATABASE_SEEDING.md
│   ├── ERROR_HANDLING_STRATEGY.md
│   ├── FILE_UPLOAD_BLOB.md
│   ├── GERMAN_LANGUAGE_STRATEGY.md
│   ├── PLANNING_OVERVIEW.md
│   ├── REALTIME_CHAT_IMPLEMENTATION.md
│   ├── TRUST_AND_SECURITY_COMMUNICATION.md
│   └── UI_UX_ANIMATIONS.md
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20250330134959_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── types
└── index.ts

40 directories, 100 files