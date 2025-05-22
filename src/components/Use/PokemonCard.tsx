import { use } from "react"

interface PokemonCardProps {
  getPokemon: Promise<any>
}

export const PokemonCard = ({ getPokemon }: PokemonCardProps) => {

  const pokemon = use(getPokemon)

  if (pokemon?.error) {
    return <div>Error: {pokemon?.message}</div>
  }

  if (!pokemon) return null

  return (
    <article>
      <p>{pokemon?.name}</p>
      <img src={pokemon?.sprites?.front_default} alt={`${pokemon?.name}-img`} />
      <p>Peso: {pokemon?.weight}kg</p>
    </article>
  )
}
