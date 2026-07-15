import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonList from './pokemon-list';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from './__tests__/mock-server';
import pokemonsResultPage1 from './__tests__/pokemon-result-limit-5-offset-0.json';
import pokemonsResultPage2 from './__tests__/pokemon-result-limit-5-offset-5.json';
import pokemonsResultPage3 from './__tests__/pokemon-result-limit-5-offset-10.json';

describe("Pokemon list with 'Load more' button", () => {
  let getPokemonsMock = vi.fn();
  beforeEach(() => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon', async ({ request }) => {
        const url = new URL(request.url);
        console.log(`Pokemons API was called with ${url.searchParams.toString()}`);
        const offset = parseInt(url.searchParams.get('offset') ?? '0'),
          limit = parseInt(url.searchParams.get('limit') ?? '0');
        getPokemonsMock({ offset, limit });

        if (offset === 0) {
          return HttpResponse.json(pokemonsResultPage1);
        } else if (offset === 5) {
          return HttpResponse.json(pokemonsResultPage2);
        } else if (offset === 10) {
          // Mocked data is different from real world:
          // total count was changed to 12, to pretend this is the last page
          return HttpResponse.json(pokemonsResultPage3);
        } else {
          return HttpResponse.json({ count: 0, results: [] });
        }
      })
    );
  });

  it('initially displays the first 5 pokemons', async () => {
    render(<PokemonList />);

    // Use a list to display the products - e.g. an `ul` or `ol` element
    expect(await screen.findByRole('list')).toBeInTheDocument();

    // Check that 5 items are displayed
    expect(await screen.findAllByRole('listitem')).toHaveLength(5);

    // Check that for each pokemon, its name is displayed
    expect(screen.getAllByRole('listitem').map((listItem) => listItem.textContent))
      .toMatchInlineSnapshot(`
[
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
]
`);

    // Check the API was called with the correct `offset` and `limit`
    expect(getPokemonsMock).toHaveBeenCalledWith({ offset: 0, limit: 5 });
  });

  it("shows a 'Load more' button and the info about number of items displayed", async () => {
    render(<PokemonList />);

    // Shows the 'Load more' button
    expect(await screen.findByRole('button')).toHaveTextContent('Load more');

    // Check that the summary correctly says how many items are shown
    expect(
      await screen.findByText(`Displaying 5 of ${pokemonsResultPage1.count} results`)
    ).toBeInTheDocument();
  });

  it("loads 5 more pokemons when the user presses 'Load more'", async () => {
    render(<PokemonList />);

    // Press the "Load more" button
    const user = userEvent.setup();

    await user.click(await screen.findByRole('button', { name: 'Load more' }));

    // Check that the summary correctly updated
    expect(
      await screen.findByText(`Displaying 10 of ${pokemonsResultPage1.count} results`)
    ).toBeInTheDocument();

    // Check that 10 items are displayed
    expect(await screen.findAllByRole('listitem')).toHaveLength(10);

    // Check that those 10 items are what we expect
    expect(screen.getAllByRole('listitem').map((listItem) => listItem.textContent))
      .toMatchInlineSnapshot(`
    [
      "bulbasaur",
      "ivysaur",
      "venusaur",
      "charmander",
      "charmeleon",
      "charizard",
      "squirtle",
      "wartortle",
      "blastoise",
      "caterpie",
    ]
    `);
  });

  it("no longer shows the 'Load more' if the user reached the last page", async () => {
    render(<PokemonList />);

    // Press the "Load more" button twice, so we get to the last page
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Load more' }));
    await user.click(await screen.findByRole('button', { name: 'Load more' }));

    // Check that the summary correctly updated
    expect(await screen.findByText('Displaying 12 of 12 results')).toBeInTheDocument();

    // Check that 12 items are displayed
    expect(screen.getAllByRole('listitem')).toHaveLength(12);

    // Check the 'Load more' button is no longer displayed
    expect(screen.queryByRole('button', { name: 'Load more' })).not.toBeInTheDocument();

    // Check that those 12 items are what we expect
    expect(screen.getAllByRole('listitem').map((listItem) => listItem.textContent))
      .toMatchInlineSnapshot(`
[
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
]
`);
  });
});
