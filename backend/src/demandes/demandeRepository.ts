import { Statut } from "@prisma/client";
import prisma from "../utils/prisma";
import { DemandeInput, DemandeStatusUpdate } from "./demandeModel";


export async function getAllDemandes() {
  return prisma.demande.findMany({orderBy: { createdAt: 'desc' }});
}

export async function createDemande(data: DemandeInput) {
  return prisma.demande.create({ data });
}

export async function getDemandeById(id: number) {
  return prisma.demande.findUnique({ where: { id } });
}

export async function updateDemandeStatus(id: number, { statut }: DemandeStatusUpdate) {
  return prisma.demande.update({
    where: { id },
    data: { statut },
  });
}

export async function getServices(){
  return prisma.demande.findMany({
    select: { service: true },
    distinct: ['service']
  }).then(rows => rows.map(r => r.service).sort());
}