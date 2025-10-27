import { Router } from 'express';
import * as demandeController from './demandeController';

const router = Router();
/**
 * @openapi
 * /api/demandes:
 *   get:
 *     summary: Récupérer toutes les demandes de stage
 *     tags: [Demandes]
 *     responses:
 *       200:
 *         description: Liste des demandes
 */
router.get('/', demandeController.getAllDemandes);

/**
 * @openapi
 * /api/demandes:
 *   post:
 *     summary: Créer une nouvelle demande de stage
 *     tags: [Demandes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, prenom, email, service, dateDebut, dateFin]
 *             properties:
 *               nom: { type: string }
 *               prenom: { type: string }
 *               email: { type: string }
 *               service: { type: string }
 *               dateDebut: { type: string }
 *               dateFin: { type: string }
 *               motivation: { type: string }
 *     responses:
 *       201:
 *         description: Demande créée
 *       400:
 *         description: Données invalides
 */
router.post('/', demandeController.createDemande);

export default router;
