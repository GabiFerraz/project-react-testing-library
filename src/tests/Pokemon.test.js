import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <Pokemon.js />,', () => {
  it('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toHaveTextContent(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const typePikachu = screen.getByTestId('pokemon-type', { name: /Electric/i });
    expect(typePikachu).toHaveTextContent(/Electric/i);
    expect(typePikachu).toBeInTheDocument();

    const weightPik = screen.getByTestId('pokemon-weight', { name: /Average weight:/i });
    expect(weightPik).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(weightPik).toBeInTheDocument();

    const imgPika = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(imgPika).toBeInTheDocument();
    const srcImgPika = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(imgPika).toHaveAttribute('src', srcImgPika);
  });

  it(`se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir
    detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id>
    é o id do Pokémon exibido`, () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveTextContent(/More details/i);
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it(`se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
    da aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const pokemonFavoritado = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(pokemonFavoritado).toBeInTheDocument();
    userEvent.click(pokemonFavoritado);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const favoriteIcon = screen.getByRole('img',
      { name: 'Pikachu is marked as favorite' });
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
