import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDemandeById,
  updateDemandeStatus,
} from "../services/DemandeService";
import type { Demande, Statut } from "../types";
import { Alert, Button, Card, Descriptions, Spin, Tag } from "antd";

const ViewDemandePage = () => {
  const { id } = useParams<{ id: string }>();
  const [demande, setDemande] = useState<Demande | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        if (id) {
          const data = await getDemandeById(id);
          setDemande(data);
        } else {
          console.error("ID de la demande manquant");
        }
      } catch (error) {
        console.error(error);
        setError("Erreur lors de la récupération de la demande");
      }
    };
    loadDetails();
  }, [id]);

  const updateStatus = async (newStatus: Statut, demande: Demande) => {
    try {
        const updatedDemande = { ...demande, statut: newStatus };
        setDemande(updatedDemande);
        await updateDemandeStatus(demande.id.toString(), { statut: newStatus });
      
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la mise à jour du statut");
    }
  };

  return (
    <div>
      <h1>Détails de la Demande</h1>

      {error ? (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      ) : demande ? (
        <>
          <Card>
            <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label="Statut">
                {
                  demande.statut === 'EN_ATTENTE' ? (
                    <Tag color="orange">En attente</Tag>
                  ) : demande.statut === 'APPROUVEE' ? (
                    <Tag color="green">Approuvée</Tag>
                  ) : (
                    <Tag color="red">Refusée</Tag>
                  )
                }
              </Descriptions.Item>
              <Descriptions.Item label="Nom complet">
                {demande.nom} {demande.prenom}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {demande.email}
              </Descriptions.Item>
              <Descriptions.Item label="Service">
                {demande.service}
              </Descriptions.Item>
              
              <Descriptions.Item label="Date de début">
                {new Date(demande.dateDebut).toLocaleDateString('fr-FR')}
              </Descriptions.Item>
              <Descriptions.Item label="Date de fin">
                {new Date(demande.dateFin).toLocaleDateString('fr-FR')}
              </Descriptions.Item>
              <Descriptions.Item label="Motivation">
                {demande.motivation}
              </Descriptions.Item>
              <Descriptions.Item label="Date de création">
                {new Date(demande.createdAt).toLocaleDateString('fr-FR')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          
          <>
            {demande.statut === 'EN_ATTENTE' ? (
              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  onClick={() => updateStatus('APPROUVEE', demande)}
                >
                  Approuver la demande
                </Button>

                <Button
                  type="primary"
                  danger
                  style={{ marginLeft: 8 }}
                  onClick={() => updateStatus('REFUSEE', demande)}
                >
                  Rejeter la demande
                </Button>
              </div>
            ) : (
              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  onClick={() => updateStatus('EN_ATTENTE', demande)}
                >
                  Remettre en attente
                </Button>
              </div>
            )}
          </>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: 24 }}>
          <Spin tip="Chargement des détails de la demande..." />
        </div>
      )}
    </div>
  );
};

export default ViewDemandePage;
