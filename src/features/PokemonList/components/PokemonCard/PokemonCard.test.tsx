import { render } from "@testing-library/react"
import { PokemonCard } from "./PokemonCard"
import { Pokemon } from "../../types"

describe("PokemonCard", () => {

  it("show pokemon name", () => {
    const pikachu: Pokemon = {
      name: "pikachu",
    }
    const { getByText } = render(<PokemonCard pokemon={pikachu} />)
    expect(getByText(pikachu.name)).toBeInTheDocument()
  })

})