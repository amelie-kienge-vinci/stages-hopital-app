import type { Request, Response } from "express";
import * as demandeRepository from "./demandeRepository";
import { demandeSchema, demandeStatusUpdateSchema } from "./demandeModel";
import { updateDemandeStatus } from "./demandeRepository";

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

export async function getDemandeById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }
  const demande = await demandeRepository.getDemandeById(id);
  if (!demande) {
    return res.status(404).json({ error: "Demande non trouvée" });
  }
  res.status(200).json(demande);
}

export async function updateDemandeStatusController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    const demande = await demandeRepository.getDemandeById(id);
    if (!demande) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }
    const statut = demandeStatusUpdateSchema.parse(req.body);

    const updated = await updateDemandeStatus(id, statut);
    res.status(200).json(updated);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export async function getServices(req: Request, res: Response) {
  const services = await demandeRepository.getServices();
  res.status(200).json(services);
}
