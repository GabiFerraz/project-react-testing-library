import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeInTheDocument();

      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeInTheDocument();

      const favoritePokesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(favoritePokesLink).toBeInTheDocument();
    });

  test(`se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test(`se a aplicação é redirecionada para a página de About, na URL /about,
    ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test(`se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokesLink).toBeInTheDocument();

    userEvent.click(favoritePokesLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test(`se a aplicação é redirecionada para a página Not Found ao entrar em
    uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
