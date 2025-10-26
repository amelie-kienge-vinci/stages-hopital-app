-- CreateEnum
CREATE TYPE "Statut" AS ENUM ('EN_ATTENTE', 'APPROUVEE', 'REFUSEE');

-- CreateTable
CREATE TABLE "Demande" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "statut" "Statut" NOT NULL DEFAULT 'EN_ATTENTE',
    "motivation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Demande_pkey" PRIMARY KEY ("id")
);
