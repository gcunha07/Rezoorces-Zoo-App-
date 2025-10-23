// GET /api/animals - Carregar todos os animais
export async function getAnimalsAPI() {
  try {
    const response = await fetch('/api/animals')

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao carregar animais')
    }
    
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erro ao carregar animais:', error)
    throw error
  }
}

// POST /api/animals - Criar novo animal
export async function addAnimalAPI(dataAnimal) {
  try {
    const response = await fetch('/api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAnimal)
    })

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao adicionar animalAPI')
    }
    
    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao adicionar animal:', error)
    throw error
  }
}

// PUT /api/animals/:id - Atualizar animal existente
export async function putAnimalAPI(id, dataAnimal) {
  try {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAnimal)
    })

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao atualizar animal')
    }
    
    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao atualizar animal:', error)
    throw error
  }
}

// GET /api/food - Carregar todas as comidas
export async function getFoodAPI() {
  try {
    const response = await fetch('/api/food')

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao carregar comidas')
    }
    
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erro ao carregar comidas:', error)
    throw error
  }
}

// POST /api/food - Criar nova comida
export async function addFoodAPI(dataFood) {
  try {
    const response = await fetch('/api/food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFood)
    })

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao adicionar comida')
    }
    
    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao adicionar comida:', error)
    throw error
  }
}

// PUT /api/food/:id - Atualizar comida existente
export async function putFoodAPI(id, dataFood) {
  try {
    const response = await fetch(`/api/food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFood)
    })

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao atualizar comida')
    }

    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao atualizar comida:', error)
    throw error
  }
}

