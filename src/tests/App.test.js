import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './resertaHistorico';

describe('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    history.push('/');

    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkAbout);

    const { location: { pathname } } = history;
    const aboutH2 = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(aboutH2).toBeDefined();
    expect(pathname).toBe('/about');
  });

  test(' se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite/i });

    userEvent.click(linkFavorite);

    const { location: { pathname } } = history;
    const aboutH2 = screen.getByRole('heading', { name: /Favorite/i });

    expect(aboutH2).toBeDefined();
    expect(pathname).toBe('/favorites');
  });

  test(' Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/asdasd');
    const aboutH2 = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(aboutH2).toBeDefined();
  });
});
