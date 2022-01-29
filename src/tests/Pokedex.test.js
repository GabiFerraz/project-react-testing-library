import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />);

      const button = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(button).toHaveTextContent('Próximo pokémon');

      pokemons.forEach(({ name }) => {
        const currentName = screen.getByText(name);
        expect(currentName).toBeInTheDocument();
        userEvent.click(button);
      });
    });

  it('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const imgPokemon = screen.getAllByRole('img');
    expect(imgPokemon).toHaveLength(1);
  });

  it('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const buttonType = screen.getByRole('button', { name: pokemon.type });
      expect(buttonType).toBeInTheDocument();
      expect(buttonType).toHaveTextContent(pokemon.type);
    });

    const numberButtons = 7;
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonType).toHaveLength(numberButtons);

    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(buttonFire);
    const currentName = screen.getByText('Charmander');
    expect(currentName).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNext);
    const nextName = screen.getByText('Rapidash');
    expect(nextName).toBeInTheDocument();

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeVisible();
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toHaveTextContent('All');

    userEvent.click(buttonAll);

    const currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();
  });
});
