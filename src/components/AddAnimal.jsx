import { useState } from 'react'
import { addAnimalAPI } from '@/services/api'

export default function AddAnimal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    personalFoodIntake: 0,
    number: 1,
    photoAnimalUrl: ''
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await addAnimalAPI(formData)
      setFormData({ name: '', personalFoodIntake: 0, number: 1, photoAnimalUrl: '' })
      onSuccess()
      onClose()
    } catch (error) {
      alert('Erro ao adicionar animal')
    }
  }

  function handleClose() {
    setFormData({ name: '', personalFoodIntake: 0, number: 1, photoAnimalUrl: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">➕ Adicionar Animal</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Animal
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Leão" />
          </div>

          <div>
            <label htmlFor="personalFoodIntake" className="block text-sm font-medium text-gray-700 mb-2">
              Consumo diário (kg)
            </label>
            <input type="number" id="personalFoodIntake" name="personalFoodIntake" value={formData.personalFoodIntake} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 5" />
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <input type="number" id="number" name="number" value={formData.number} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 1" />
          </div>

          <div>
            <label htmlFor="photoAnimalUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL da Foto
            </label>
            <input type="text" id="photoAnimalUrl" name="photoAnimalUrl" value={formData.photoAnimalUrl} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: URL foto" />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex-1">
              Adicionar 
            </button>
            
            <button type="button" onClick={handleClose} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex-1">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}