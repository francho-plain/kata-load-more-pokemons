import React from 'react';
import { Pokemon } from '../../types';

export interface PokemonCardProps {
  pokemon: Pokemon;
}


export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <h2>{pokemon.name}</h2>
    </div>
  );
}
