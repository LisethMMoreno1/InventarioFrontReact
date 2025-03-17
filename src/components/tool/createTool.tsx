"use client";

import React, { useState, useEffect } from "react";
import { useToolsStore } from "../../store/tool/useToolStore";
import { toolsService } from "../../services/toolsService";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";
import { Tool } from "../../types/tool/tool.types";
import ToolForm from "./toolForm";

const CreateTool: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const createTool = useToolsStore((state) => state.createTool);
  const [toolOptions, setToolOptions] = useState<Tool[]>([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null); // ✅ Estado para manejar errores

  useEffect(() => {
    toolsService
      .getAll()
      .then((data: Tool[]) => setToolOptions(data))
      .catch((error: unknown) =>
        console.error("Error al obtener herramientas:", error)
      );
  }, []);

  useEffect(() => {
    if (saved) {
      alert("Utilitario guardado exitosamente");
      setSaved(false);
    }
  }, [saved]);

  const handleSubmit = async (values: any) => {
    try {
      await createTool(values);
      setSaved(true);
      onSuccess();
      setError(null);
    } catch (error: any) {
      console.error("Error al crear la herramienta:", error);
      setError(error.message || "Error al guardar el utilitario");
    }
  };

  return (
    <ComponentFormInline
      title="Crear Utilitario"
      onSubmit={handleSubmit}
      submitLabel="Crear Utilitario"
    >
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* ✅ Mostrar error */}
      <ToolForm
        initialValues={{
          name: "",
          type: "",
          code: "",
          description: "",
        }}
        onSubmit={handleSubmit}
        toolOptions={toolOptions}
      />
    </ComponentFormInline>
  );
};

export default CreateTool;
