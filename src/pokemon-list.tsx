// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useEffect, useState } from "react"

const POKEMON_LIMIT = 5

type Pokemon = {
    name: string
}

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [numPokemons, setNumPokemons ] = useState(0) 
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}}&offset=${page * POKEMON_LIMIT}`)
        const data = await response.json()
        setPokemons(results => [...results, ...data.results])
        setNumPokemons(data.count)
      } catch (error) {
        console.error("Error fetching pokemons:", error)
      }
    }

    fetchPokemons()
  }, [page])


  return (
    <div>
      <h1>Pokemon List</h1>
      <p>Displaying {pokemons.length} of {numPokemons} results</p>
      <ul>
        {pokemons && pokemons.map((pokemon: Pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul> 
      
      {
        pokemons.length < numPokemons && (
          <button onClick={() => {setPage(prev => prev + 1)}}>Load more</button>
        )
      }

    </div>

  )
}

export default PokemonList
