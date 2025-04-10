-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "messageId" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "DeletionFeedback_userId_idx" ON "DeletionFeedback"("userId");

-- CreateIndex
CREATE INDEX "Document_messageId_idx" ON "Document"("messageId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeletionFeedback" ADD CONSTRAINT "DeletionFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
