import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdicionarProduto from '@/components/AdicionarProduto'
import EditarProduto from '@/components/EditarProduto'
import { getAnimalsAPI } from '@/services/api'
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
              <th className="py-3 px-4 text-left font-semibold text-gray-700">URL foto</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(animal => (
              <tr key={animal._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900 font-medium">{animal.name}</td>
                <td className="py-3 px-4 text-gray-900 font-bold">{animal.personalFoodIntake}</td>
                <td className="py-3 px-4 text-gray-900 font-bold">{(animal.personalFoodIntake * animal.number)}</td>
                <td className="py-3 px-4 text-gray-900 font-bold">{animal.number}</td>
                <td className="py-3 px-4 text-gray-900 font-bold">{animal.photoAnimalUrl}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditAnimal(animal)} className="bg-white border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
                      Editar
                    </button>
                  </div>
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

      <EditarProduto
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={getAnimals}
        animal={animalToEdit}
      />
    </div>
  )
}


