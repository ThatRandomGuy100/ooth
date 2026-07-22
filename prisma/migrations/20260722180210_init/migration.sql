-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "county" TEXT NOT NULL,
    "medicaidId" TEXT NOT NULL,
    "healthPlan" TEXT NOT NULL,
    "needs" TEXT[],
    "situation" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
