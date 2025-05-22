import { useState, Suspense } from "react"
import { PokemonCard } from "./PokemonCard"

export const PokemonList = () => {

  const [name, setName] = useState('')


  const getPkemon = () => {
    if (!name) return Promise.resolve()
    const data = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return data
      .then(res => {
        if (res.ok) return res.json()
        return { error: true, message: 'Pokemon no encontrado' }
      })
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Buscar un pokemon</h3>
      <form>
        <input
          type="text"
          placeholder="Ej. Pikachu"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
      <Suspense fallback={<div>Cargando...</div>}>
        <PokemonCard getPokemon={getPkemon()} />
      </Suspense>
    </div>
  )
}
