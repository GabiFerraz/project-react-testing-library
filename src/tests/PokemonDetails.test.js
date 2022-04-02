import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const linkPikachu = '/pokemons/25';

  it('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(linkPikachu);

    const pikachuDetails = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });
    expect(pikachuDetails).toBeInTheDocument();
    expect(pikachuDetails).toHaveTextContent('Pikachu Details');

    const moreDetails = screen.queryByRole('link', { name: /More details/i });
    expect(moreDetails).not.toBeInTheDocument();

    const textSummary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(textSummary).toBeInTheDocument();

    const detailsPika = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(detailsPika).toBeInTheDocument();
  });

  it('se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(linkPikachu);

      const gameLocations = screen.getByRole('heading',
        { level: 2, name: 'Game Locations of Pikachu' });
      expect(gameLocations).toBeInTheDocument();

      const pikachuLocation = 'Pikachu location';

      const locations = screen.getAllByRole('img', { name: pikachuLocation });
      expect(locations).toHaveLength(2);

      const srcs = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];
      locations.forEach((location, index) => {
        expect(location).toHaveAttribute('src', srcs[index]);
        expect(location).toHaveAttribute('alt', pikachuLocation);
      });
    });

  it('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(linkPikachu);

    const pokemonFavoritado = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(pokemonFavoritado).toBeInTheDocument();

    userEvent.click(pokemonFavoritado);

    const favoriteIcon = screen.getByRole('img',
      { name: 'Pikachu is marked as favorite' });
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(pokemonFavoritado);

    const notFavoriteIcon = screen.queryByRole('img',
      { name: 'Pikachu is marked as favorite' });
    expect(notFavoriteIcon).not.toBeInTheDocument();
  });
});
