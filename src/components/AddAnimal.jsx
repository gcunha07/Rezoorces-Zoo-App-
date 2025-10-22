import React, { useState } from "react";
import axios from "axios";
import e from "express";

const AddAnimal = () => {
    const [formData, setFormData] = useState({
        name: "",
        personalFoodIntake: "",
        number: "",
        photoAnimalUrl: "",

    });

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post("http://localhost:3000/api/animals",formData);
        alert("✅ Animal adicionado com sucesso!");
        setFormData({name: "", personalFoodIntake: "", number: "", photoAnimalUrl: "" });
    } catch (err) {
        console.error(err);
        alert("❌ Erro ao adicionar animal")
    }
};

return (
    <div className="add-animal">
        <h2>Adicionar Animal</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nome do Animal"
                value={formData.name}
                onChange={handleChnage}
                required
            />
            <input
                type="number"
                name="personalFoodIntake"
                placeholder="Consumo diário (kg)"
                value={formData.personalFoodIntake}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="number"
                placeholder="Quantidade"
                value={formData.number}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="photoAnimalUrl"
                placeholder="URL da Photo"
                value={formData.photoAnimalUrl}
                onChange={handleChange}
                required
            />
            <button type="submit">Adicionar</button>
        </form>
    </div>
 );
};

export default AddAnimal;
