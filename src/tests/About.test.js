import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokeInfo1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(pokeInfo1).toBeInTheDocument();

    const pokeInfo2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(pokeInfo2).toBeInTheDocument();
  });

  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokeInfo1 = screen.getByText(/This application simulates a Pokédex/i);
    const pokeInfo2 = screen.getByText(/One can filter Pokémons by type/i);
    const pokeInfos = [pokeInfo1, pokeInfo2];
    expect(pokeInfos).toHaveLength(2);
  });

  test('se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { alt: /Pokédex/i });
    expect(img.src).toBe(src);
  });
});
