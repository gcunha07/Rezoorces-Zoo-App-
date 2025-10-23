import React, { useState, useEffect } from 'react'
import { getAnimalsAPI, getFoodAPI } from '@/services/api'

export default function Home() {
  const [animals, setAnimals] = useState([])
  const [foods, setFoods] = useState([])

  useEffect(() => {
    fetchAnimals()
    fetchFoods()
  }, [])

  async function fetchAnimals() {
    try {
      const data = await getAnimalsAPI()
      setAnimals(data)
    } catch (error) {
      console.error('Erro ao carregar animais', error)
    }
  }

  async function fetchFoods() {
    try {
      const data = await getFoodAPI()
      setFoods(data)
    } catch (error) {
      console.error('Erro ao carregar alimentos', error)
    }
  }

  // Determina o tipo de recurso com base no nome do animal
  function getFoodForAnimal(animalName) {
    let targetFoodName = null

    if (animalName.toLowerCase().includes('leão')) targetFoodName = 'Carne'
    else if (animalName.toLowerCase().includes('girafa')) targetFoodName = 'Fruta'
    else if (animalName.toLowerCase().includes('foca')) targetFoodName = 'Peixe'
    else if (animalName.toLowerCase().includes('elefante')) targetFoodName = 'Vegetais'

    if (!targetFoodName) return null

    return foods.find(
      (food) => food.name.toLowerCase() === targetFoodName.toLowerCase()
    )
  }

  // Retorna cor de fundo do card com base nos dias restantes
  function getCardColor(diasRestantes) {
    if (diasRestantes === null) return 'bg-gray-100 border-gray-300'
    if (diasRestantes < 3) return 'bg-red-100 border-red-300'
    if (diasRestantes < 7) return 'bg-yellow-100 border-yellow-300'
    return 'bg-green-100 border-green-300'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {animals.map((animal) => {
          const food = getFoodForAnimal(animal.name)
          const diasRestantes = food
            ? Math.floor(food.totalKg / (animal.personalFoodIntake * animal.number))
            : null

          const cardColor = getCardColor(diasRestantes)

          return (
            <div
              key={animal._id}
              className={`${cardColor} border rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center text-center`}
            >
              <div className="w-28 h-28 rounded-full overflow-hidden bg-white border mb-4">
                  <img
                    src={food.photoFoodUrl}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
              </div>

              {food ? (
                <div className="text-sm text-gray-800 w-full bg-white bg-opacity-70 rounded-lg px-3 py-2 shadow-inner">
                  <p>
                    Recurso: <strong>{food.name}</strong>
                  </p>
                  <p>
                    Stock atual: <strong>{food.totalKg} kg</strong>
                  </p>
                  <p>
                    Dura aproximadamente{' '}
                    <strong>{diasRestantes}</strong>{' '}
                    {diasRestantes === 1 ? 'dia' : 'dias'}
                  </p>
                </div>
              ) : (
                <div className="bg-red-200 text-red-800 px-3 py-2 rounded-lg text-sm w-full">
                  Nenhum recurso atribuído
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
