-- CreateTable
CREATE TABLE "DeletionFeedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "userEmail" TEXT NOT NULL,
    "feedback" TEXT,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeletionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeletionFeedback_userEmail_idx" ON "DeletionFeedback"("userEmail");

-- CreateIndex
CREATE INDEX "DeletionFeedback_deletedAt_idx" ON "DeletionFeedback"("deletedAt");
