import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './resertaHistorico';

describe('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
  test('', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const h2 = screen.getByText('No favorite pokemon found');
    expect(h2).toBeDefined();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const buttonF = screen.getByRole('checkbox', { Name: 'Pokémon favoritado?' });
    userEvent.click(buttonF);
    const linkF = screen.getAllByRole('link', { Name: 'Favorite Pokémons' });
    userEvent.click(linkF[2]);
    const pika = screen.getByText(/Pikachu/i);
    expect(pika).toBeDefined();
  });
});
