import { useState, useEffect } from 'react'
import EditFood from '@/components/EditFood'
import AddFood from '@/components/AddFood'
import { getFoodAPI, getAnimalsAPI } from '@/services/api'

export default function Food() {
  const [foods, setFoods] = useState([])
  const [animals, setAnimals] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [foodToEdit, setFoodToEdit] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    getFood()
    getAnimals()
  }, [])

  async function getFood() {
    try {
      const data = await getFoodAPI()
      setFoods(data)
    } catch {
      alert('Erro ao carregar foods')
    }
  }

  async function getAnimals() {
    try {
      const data = await getAnimalsAPI()
      setAnimals(data)
    } catch {
      console.error('Erro ao carregar animais')
    }
  }

  function totalDailyConsumption() {
    return animals.reduce((sum, a) => sum + a.number * a.personalFoodIntake, 0)
  }

  function handleEditFood(food) {
    setFoodToEdit(food)
    setShowEditModal(true)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🌾 Recursos Alimentares</h1>
          <p className="text-gray-600">
            Monitorize os recursos e saiba quando vão acabar
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Adicionar Recurso
        </button>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {foods.map(food => {
          const totalConsumption = totalDailyConsumption()
          const dailyConsumption = totalConsumption || 1 // evita divisão por 0
          const daysLeft = food.totalKg / dailyConsumption

          return (
            <div
              key={food._id}
              className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col text-center items-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 mb-4 border">
                {food.photoFoodUrl ? (
                  <img
                    src={food.photoFoodUrl}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    Sem foto
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold text-gray-900">{food.name}</h2>
              <p className="text-blue-600 font-bold">{food.totalKg} kg restantes</p>

              {/* Indicador de previsão */}
              <div className="w-full mt-3">
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className={`h-3 rounded-full ${
                      daysLeft > 7
                        ? 'bg-green-500'
                        : daysLeft > 3
                        ? 'bg-yellow-400'
                        : 'bg-red-500'
                    }`}
                    style={{
                      width: `${Math.min((daysLeft / 10) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {daysLeft.toFixed(1)} dias restantes
                </p>
              </div>

              <button
                onClick={() => handleEditFood(food)}
                className="mt-4 bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
              >
                Editar
              </button>
            </div>
          )
        })}
      </div>

      {/* Modais */}
      <EditFood
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={getFood}
        food={foodToEdit}
      />

      <AddFood
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={getFood}
      />
    </div>
  )
}
