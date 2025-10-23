import { useState, useEffect } from 'react'
import { putFoodAPI } from '@/services/api'

export default function EditFood({ isOpen, onClose, onSuccess, food }) {
  const [totalKg, setTotalKg] = useState(0)

  useEffect(() => {
    if (food) {
      setTotalKg(food.totalKg || 0)
    }
  }, [food])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await putFoodAPI(food._id, { totalKg })
      onSuccess()
      onClose()
    } catch (error) {
      alert('Erro ao atualizar quantidade de alimento')
    }
  }

  function handleClose() {
    setTotalKg(0)
    onClose()
  }

  if (!isOpen || !food) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Editar quantidade — {food.name}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="totalKg"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Total em Kg
            </label>
            <input
              type="number"
              step="0.01"
              id="totalKg"
              name="totalKg"
              value={totalKg}
              onChange={(e) => setTotalKg(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex-1"
            >
              Atualizar
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
