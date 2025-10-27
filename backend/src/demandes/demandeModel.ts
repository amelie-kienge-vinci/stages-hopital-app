import { z } from "zod";

export const demandeSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
  email: z.email("Email invalide"),
  service: z.string().min(1, "Le service est requis"),
  dateDebut: z.string().transform((val) => new Date(val)),
  dateFin: z.string().transform((val) => new Date(val)),
  motivation: z.string().optional(),
}).refine((data) => data.dateFin > data.dateDebut, {
  message: "La date de fin doit être après la date de début",
  path: ["dateFin"],
});

export type DemandeInput = z.infer<typeof demandeSchema>;