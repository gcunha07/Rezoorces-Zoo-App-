import React, { useState } from "react";
import { addFoodAPI } from "@/services/api";

const AddFood = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    totalKg: 0,
    photoFoodUrl: "",
  });

  if (!isOpen) return null; // 👉 Não renderiza nada quando o modal está fechado

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addFoodAPI(formData);
      alert("Comida adicionada com sucesso!");
      setFormData({ name: "", totalKg: 0, photoFoodUrl: "" });
      onSuccess(); // atualiza a lista
      onClose(); // fecha o modal
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar comida");
    }
  }

  return (
    // 🔹 Overlay fixo que cobre toda a tela
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* 🔹 Caixa do modal */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">Adicionar Comida</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome da Comida"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="number"
            name="totalKg"
            placeholder="Quantidade Total (kg)"
            value={formData.totalKg}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="photoFoodUrl"
            placeholder="URL da Foto"
            value={formData.photoFoodUrl}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
