import { useState, useEffect } from 'react'
import EditFood from '@/components/EditFood'
import AddFood from '@/components/AddFood'
import { getFoodAPI } from '@/services/api'

export default function Food() {
  const [foods, setFoods] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [foodToEdit, setFoodToEdit] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    getFood()
  }, [])

  async function getFood() {
    try {
      const data = await getFoodAPI()
      setFoods(data)
    } catch (error) {
      alert('Erro ao carregar foods')
    }
  }

  function handleEditFood(food) {
    setFoodToEdit(food)
    setShowEditModal(true)
  }

  function handleAddFood() {
    setShowAddModal(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recursos</h1>
        </div>
        <button onClick={() => handleAddFood()} className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
          ➕ Adicionar Food
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Nome</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Preço</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {foods.map(food => (
              <tr key={food._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900 font-medium">{food.name}</td>
                <td className="py-3 px-4 text-blue-600 font-bold">{food.totalKg} kg</td>
                <td className="py-3 px-4">
                  {food.photoFoodUrl ? (
                    <img
                      src={food.photoFoodUrl}
                      alt={food.name || 'food photo'}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-sm text-gray-500 rounded">
                      No image
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditFood(food)} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
