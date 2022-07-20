import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './resertaHistorico';

const arrBottun = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    expect(screen.getByRole('heading', { name: /Encountered pokémons/i })).toBeDefined();
  });

  test('se é exibido o próximo pokémon da lista quando o botão Próximo pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    expect(screen.getByText(/Pikachu/i)).toBeDefined();

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNext);
    expect(screen.getByText(/Charmander/i)).toBeDefined();
    userEvent.click(buttonNext);
    expect(screen.getByText(/Caterpie/i)).toBeDefined();
  });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    expect(screen.getAllByRole('img').length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    screen.getAllByTestId('pokemon-type-button')
      .forEach((aa, ii) => {
        expect(aa).toBeDefined();
        userEvent.click(screen.getByRole('button', { name: arrBottun[ii] }));
        expect(screen.getAllByText(arrBottun[ii]).length).toBe(2);
        expect(screen.getAllByRole('button', { name: 'All' })).toBeDefined();
      });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText(/Pikachu/i)).toBeDefined();
    userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    expect(screen.getByText(/Charmander/i)).toBeDefined();
  });
});
