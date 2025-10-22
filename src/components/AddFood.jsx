import React, { useState } from "react";
import { addFoodAPI } from '@/services/api';

const AddFood = () => {
    const [formData, setFormData] = useState({
        name: "",
        totalKg: 0,
        photoFoodUrl: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit() {
        try {
            await addFoodAPI(formData);
            alert("Comida adicionada com sucesso!");
            setFormData({ name: "", totalKg: 0, photoFoodUrl: "" });
        } catch (err) {
            console.error(err);
            alert("Erro ao adicionar comida");
        }
    };

    return (
        <div className="add-food">
            <h2>Adicionar Comida</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome da Comida"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="totalKg"
                    placeholder="Quantidade Total (kg)"
                    value={formData.totalKg}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="photoFoodUrl"
                    placeholder="URL da Foto"
                    value={formData.photoFoodUrl}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default AddFood;