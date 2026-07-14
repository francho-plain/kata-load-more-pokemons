# Pokemons list with "Load more" button

> Original exercise statement: [Build a paginated Pokemons list with a "Load more" button, starting from failing unit tests](https://reactpractice.dev/exercise/build-a-paginated-pokemons-list-with-a-load-more-button-starting-from-failing-unit-tests/)

Build a component that displays a list of Pokemons with a "Load more" button. You can use the [free Poke API](https://pokeapi.co/) to retrieve the data.

- Initially, the component should only show the first 5 items
- Below the list, there should be a label saying how many items are being displayed from the total - e.g. "Displaying 20 of 567 results"
- Clicking "Load more" will load another 5 items into the list
- When the are no more results, the button should no longer be displayed

The styling doesn't matter for this component - just make sure to display the pokemons as `<li>` elements in a list (`ul`) and show the name for each.

Make sure to get the unit tests to pass. The tests mock the real API using `msw`. If you haven't used it before, [this is a nice walkthrough](https://kentcdodds.com/blog/stop-mocking-fetch).

## Getting started

1. Run `pnpm install`
2. Open the test file: `src/__tests__/pokemon-list.test.tsx`
3. Run the tests `pnpm test`
4. Fix them!

Tips:

- replace `test("bla")` with `test.only("bla")` to run only that test
- move the console section with the test results to the right side of the code editor, so it's side by side with the code
- consider installing the ["Vitest" VSCode extension](https://github.com/vitest-dev/vscode) to have a better experience running the tests
