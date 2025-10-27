import prisma from "../utils/prisma";
import { DemandeInput } from "./demandeModel";

export async function getAllDemandes() {
  return prisma.demande.findMany({orderBy: { createdAt: 'desc' }});
}

export async function createDemande(data: DemandeInput) {
  return prisma.demande.create({ data });
}