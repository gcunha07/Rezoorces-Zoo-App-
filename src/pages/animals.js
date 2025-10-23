import { useState, useEffect } from 'react'
import { getAnimalsAPI, putAnimalAPI } from '@/services/api'
import AddAnimal from '@/components/AddAnimal'

export default function Animals() {
  const [animals, setAnimals] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

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

  async function increaseAnimal(animal) {
    try {
      await putAnimalAPI(animal._id, { number: animal.number + 1 })
      getAnimals()
    } catch {
      alert('Erro ao aumentar número de animais')
    }
  }

  async function decreaseAnimal(animal) {
    if (animal.number <= 1) return
    try {
      await putAnimalAPI(animal._id, { number: animal.number - 1 })
      getAnimals()
    } catch {
      alert('Erro ao diminuir número de animais')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Animals</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add Animal
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {animals.map(animal => (
          <div
            key={animal._id}
            className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center text-center"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 mb-4 border">
              {animal.photoAnimalUrl ? (
                <img
                  src={animal.photoAnimalUrl}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  No photo
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold text-gray-900">{animal.name}</h2>
            <p className="text-gray-600 text-sm mb-2">
              Eats <strong>{animal.personalFoodIntake}</strong> kg/day
            </p>
            <p className="text-gray-800 font-bold mb-4">
              Total daily: {(animal.personalFoodIntake * animal.number).toFixed(1)} kg
            </p>

            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => decreaseAnimal(animal)}
                className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full text-lg font-bold"
              >
                −
              </button>
              <span className="text-gray-800 text-lg font-semibold w-6 text-center">
                {animal.number}
              </span>
              <button
                onClick={() => increaseAnimal(animal)}
                className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de adicionar */}
      <AddAnimal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={getAnimals}
      />
    </div>
  )
}
