const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/mongodb');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

const Animals = require('./models/Animals');
const Food = require('./models/Food');

// ===== ROTAS DA API REST =====

// GET /api/animals - Carregar todos os animais
app.get('/api/animals', async (req, res) => {
  try {
    const animals = await Animals.find();  // Busca todos os animais no MongoDB
    res.json(animals);
  } catch (error) {
    console.error('Erro ao carregar animais:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/animals - Criar novo animal
app.post('/api/animals', async (req, res) => {
  try {
    const { name, dailyFoodIntake, number, photoAnimalUrl } = req.body;  // Extrai dados do body da requisição

    const newAnimal = new Animals({
      name,
      dailyFoodIntake: parseFloat(dailyFoodIntake),
      number,
      photoAnimalUrl,
    });

    const savedAnimal = await newAnimal.save();  // Guarda no MongoDB
    res.status(201).json(savedAnimal);
  } catch (error) {
    console.error('Erro ao criar animal:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PUT /api/animals/:id - Atualizar animal existente
app.put('/api/animals/:id', async (req, res) => {
  try {
    const animal = await Animals.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // Retorna documento atualizado e executa validações
    );

    if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });
    res.json(animal);
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});


// GET /api/food - Carregar todas as comidas
app.get('/api/food', async (req, res) => {
  try {
    const food = await Food.find();  // Busca todas as comidas no MongoDB
    res.json(food);
  } catch (error) {
    console.error('Erro ao carregar comidas:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/food - Criar nova comida
app.post('/api/food', async (req, res) => {
  try {
    const { name, totalKg, photoFoodUrl } = req.body;

    const newFood = new Food({
      name,
      totalKg,
      photoFoodUrl,
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    console.error('Erro ao criar comida:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PUT /api/food/:id - Atualizar comida existente
app.put('/api/food/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!food) return res.status(404).json({ erro: 'Comida não encontrada' });
    res.json(food);
  } catch (error) {
    console.error('Erro ao atualizar comida:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});


// ===== INICIALIZAÇÃO DO SERVIDOR =====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Next.js + Express a correr em http://localhost:${PORT}`);
   
  });
});
