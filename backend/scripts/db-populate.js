const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear existing demandes
  await prisma.demande.deleteMany();
  console.log('Cleared existing demandes.');

  const demandes = [
    {
      nom: 'Dupont',
      prenom: 'Alice',
      email: 'alice.dupont@example.com',
      service: 'Cardiologie',
      dateDebut: new Date('2025-11-10T09:00:00Z'),
      dateFin: new Date('2025-11-14T17:00:00Z'),
      statut: 'EN_ATTENTE',
      motivation: 'Découverte du service cardiologie et intérêt pour la physiologie cardiaque.',
    },
    {
      nom: 'Martin',
      prenom: 'Bob',
      email: 'bob.martin@example.com',
      service: 'Urgences',
      dateDebut: new Date('2025-12-01T08:30:00Z'),
      dateFin: new Date('2025-12-05T16:30:00Z'),
      statut: 'APPROUVEE',
      motivation: 'Souhaite acquérir de l\'expérience en prise en charge des urgences.',
    },
    {
      nom: 'Petit',
      prenom: 'Charlie',
      email: 'charlie.petit@example.com',
      service: 'Pédiatrie',
      dateDebut: new Date('2025-11-20T09:00:00Z'),
      dateFin: new Date('2025-11-22T17:00:00Z'),
      statut: 'REFUSEE',
      motivation: 'Contrainte de planning, nepot applicable.',
    },
    {
      nom: 'Nguyen',
      prenom: 'Denise',
      email: 'denise.nguyen@example.com',
      service: 'Radiologie',
      dateDebut: new Date('2025-11-25T09:00:00Z'),
      dateFin: new Date('2025-11-28T17:00:00Z'),
      statut: 'EN_ATTENTE',
      motivation: 'Intéressée par l\'imagerie médicale.',
    },
    {
      nom: 'Legrand',
      prenom: 'Éric',
      email: 'eric.legrand@example.com',
      service: 'Neurologie',
      dateDebut: new Date('2025-12-08T09:00:00Z'),
      dateFin: new Date('2025-12-12T17:00:00Z'),
      statut: 'APPROUVEE',
      motivation: 'Projet de recherche en neurophysiologie.',
    },
  ];

  const result = await prisma.demande.createMany({ data: demandes });
  console.log(`Inserted ${result.count} demandes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
