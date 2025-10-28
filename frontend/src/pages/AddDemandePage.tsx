import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  type FormProps,
  message,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { createDemande, getServices } from "../services/DemandeService";
import { useNavigate } from "react-router-dom";
import type { Service } from "../types";

export default function AddDemandePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const onFinish: FormProps["onFinish"] = async (values) => {
    const payload = {
      nom: values.nom,
      prenom: values.prenom,
      email: values.email,
      service: values.service,
      dateDebut: values.dateDebut?.toISOString?.() || values.dateDebut,
      dateFin: values.dateFin?.toISOString?.() || values.dateFin,
      motivation: values.motivation || undefined,
    };

    try {
      setSubmitting(true);
      await createDemande(payload);
      message.success("Demande créée avec succès");
      setError(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      message.error("Erreur lors de la création de la demande");
    } finally {
      setSubmitting(false);
      setError("Une erreur est survenue lors de la soumission de la demande.");
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = () => {
    message.error(
      "Problème lors de la soumission du formulaire. Veuillez vérifier les champs."
    );
  };

  return (
    <div>
      <h1>Ajouter une Demande</h1>
      <Form
        form={form}
        name="add-demande"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nom"
          name="nom"
          rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Prénom"
          name="prenom"
          rules={[{ required: true, message: "Veuillez entrer votre prénom" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Veuillez entrer un email valide",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Service"
          name="service"
          rules={[
            { required: true, message: "Veuillez sélectionner un service" },
          ]}
        >
          <Select>
            {services.map((service) => (
              <Select.Option key={service} value={service}>
                {service}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Date de début"
          name="dateDebut"
          rules={[
            {
              required: true,
              message: "Veuillez sélectionner une date de début",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const end = getFieldValue("dateFin");
                if (!value || !end) return Promise.resolve();
                if (value.isBefore(end)) return Promise.resolve();
                return Promise.reject(
                  new Error(
                    "La date de début doit être antérieure à la date de fin"
                  )
                );
              },
            }),
          ]}
        >
          <DatePicker
            disabledDate={(current) => {
              return (
                !!current &&
                current.isBefore(dayjs().add(1, "day").startOf("day"))
              );
            }}
          />
        </Form.Item>
        <Form.Item
          label="Date de fin"
          name="dateFin"
          rules={[
            {
              required: true,
              message: "Veuillez sélectionner une date de fin",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const start = getFieldValue("dateDebut");
                if (!value || !start) return Promise.resolve();
                if (value.isAfter(start)) return Promise.resolve();
                return Promise.reject(
                  new Error(
                    "La date de fin doit être postérieure à la date de début"
                  )
                );
              },
            }),
          ]}
        >
          <DatePicker
            disabledDate={(current) => {
              const start = form.getFieldValue("dateDebut");
              const min = start
                ? start.startOf("day")
                : dayjs().add(1, "day").startOf("day");
              return !!current && current.isBefore(min);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Motivation"
          name="motivation"
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Soumettre
          </Button>
        </Form.Item>
      </Form>

      {error && (
        <Alert type="error" message="Erreur" description={error} showIcon />
      )}
    </div>
  );
}
