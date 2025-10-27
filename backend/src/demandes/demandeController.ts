import type { Request, Response } from "express";
import * as demandeRepository from "./demandeRepository";
import { demandeSchema } from "./demandeModel";

export async function getAllDemandes(_req: Request, res: Response) {
  const demandes = await demandeRepository.getAllDemandes();
  res.status(200).json(demandes);
}

export async function createDemande(req: Request, res: Response) {
  try {
    const data = demandeSchema.parse(req.body);
    const newDemande = await demandeRepository.createDemande(data);
    res.status(201).json(newDemande);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
