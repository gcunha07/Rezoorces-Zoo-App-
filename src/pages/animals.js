import { useState, useEffect } from 'react'
import { getAnimalsAPI, putAnimalAPI } from '@/services/api'
import AddAnimal from '@/components/AddAnimal'

export default function Animals() {
  const [animals, setAnimals] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [animalToEdit, setAnimalToEdit] = useState(null)

  useEffect(() => {
    getAnimals()
  }, [])

  async function getAnimals() {
    try {
      const data = await getAnimalsAPI()
      setAnimals(data)
    } catch (error) {
      alert('Erro ao carregar animais')
    }
  }

  function handleEditAnimal(animal) {
    setAnimalToEdit(animal)
    setShowEditModal(true)
  }

  async function increaseAnimal(animal) {
    try {
      await putAnimalAPI(animal._id, { number: animal.number + 1 })
      getAnimals() // recarrega a tabela
    } catch (error) {
      alert('Erro ao aumentar número de animais')
    }
  }

  async function decreaseAnimal(animal) {
    if (animal.number <= 1) return // evita valores negativos ou zero
    try {
      await putAnimalAPI(animal._id, { number: animal.number - 1 })
      getAnimals()
    } catch (error) {
      alert('Erro ao diminuir número de animais')
    }
  }


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Animals Management</h1>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
          Add Animals
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Animal</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Comida diária por animal (kg/dia)</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Total comida animais (kg/dia)</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Total Animais</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Foto</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(animal => (
              <tr key={animal._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900 font-medium">{animal.name}</td>
                <td className="py-3 px-4 text-gray-900 font-bold">{animal.personalFoodIntake}</td>
                <td className="py-3 px-4 text-gray-900 font-bold">{(animal.personalFoodIntake * animal.number)}</td>
                <td className="py-3 px-4 text-gray-900 font-bold flex items-center space-x-2">
                  <button
                    onClick={() => decreaseAnimal(animal)}
                    className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                  >
                    −
                  </button>

                  <span>{animal.number}</span>

                  <button
                    onClick={() => increaseAnimal(animal)}
                    className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                  >
                    +
                  </button>
                </td>

                <td className="py-3 px-4">
                  {animal.photoAnimalUrl ? (
                    <img
                      src={animal.photoAnimalUrl}
                      alt={animal.name || 'animal photo'}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-sm text-gray-500 rounded">
                      No image
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddAnimal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={getAnimals}
      />

    </div>
  )
}


