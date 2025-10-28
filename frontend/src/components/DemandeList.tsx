import { Button, Select, Spin, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllDemandes, getServices } from "../services/DemandeService";
import { useNavigate } from "react-router-dom";
import type { Demande, Service } from "../types";

const DemandeList = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    loadDemandes();
    loadServices();
  }, []);

  const loadDemandes = async () => {
    try {
      setLoading(true);
      const data = await getAllDemandes();
      setDemandes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDemandes = demandes.filter((demande) => {
    return (
      (selectedStatus ? demande.statut === selectedStatus : true) &&
      (selectedService ? demande.service === selectedService : true)
    );
  });

  const columns = [
    {
      title: "Nom complet",
      key: "fullName",
      render: (_: unknown, record: Demande) => `${record.nom} ${record.prenom}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Période",
      key: "periode",
      render: (_: unknown, record: Demande) => {
        const debut = new Date(record.dateDebut).toLocaleDateString("fr-FR");
        const fin = new Date(record.dateFin).toLocaleDateString("fr-FR");
        return `${debut} → ${fin}`;
      },
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut: string) => <span>{statut}</span>,
    },
  ];
  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      ></div>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("/ajouter-demande")}
      >
        Nouvelle demande
      </Button>

      <Select
        placeholder="Filtrer par statut"
        style={{ width: 200 }}
        allowClear
        onChange={(value) => setSelectedStatus(value)}
        options={[
          { label: "En attente", value: "EN_ATTENTE" },
          { label: "Approuvée", value: "APPROUVEE" },
          { label: "Refusée", value: "REFUSEE" },
        ]}
      />
      <Select
        placeholder="Filtrer par service"
        style={{ width: 200 }}
        allowClear
        onChange={(value) => setSelectedService(value)}
        options={services.map((service) => ({
          label: service,
          value: service,
        }))}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={filteredDemandes}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "Aucune demande trouvée" }}
          onRow={(d: Demande) => ({
            onClick: () => navigate(`/demande-details/${d.id}`),
            style: { cursor: 'pointer' },
            tabIndex: 0,
            role: 'button',
          })}
        />
      )}
    </div>
  );
};

export default DemandeList;
