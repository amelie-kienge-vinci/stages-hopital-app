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

/**
 * @openapi
 * /api/demandes/{id}:
 *   get:
 *     summary: Récupérer une demande de stage par ID
 *     tags: [Demandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la demande
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Demande trouvée
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Demande non trouvée
 */
router.get('/:id', demandeController.getDemandeById);

/**
 * @openapi
 * /api/demandes/{id}/status:
 *   patch:
 *     summary: Mettre à jour le statut d'une demande de stage
 *     tags: [Demandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la demande
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [statut]
 *             properties:
 *               statut:
 *                 type: string
 *                 enum: ["EN_ATTENTE", "APPROUVEE", "REFUSEE"]
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *       400:
 *         description: ID invalide ou statut invalide
 *       404:
 *         description: Demande non trouvée
 */
router.patch('/:id/status', demandeController.updateDemandeStatusController);

export default router;
