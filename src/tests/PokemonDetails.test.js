import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './resertaHistorico';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('se informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    expect(screen.getByRole('heading', { name: 'Pikachu Details' })).toBeDefined();
    screen.getAllByRole('link').forEach((aa) => {
      expect(aa.href !== 'http://localhost/pokemons/25').toBe(true);
    });
    expect(screen.getByRole('heading', { name: 'Summary' }).innerHTML).toBe('Summary');
    expect(screen.getByText(/This intelligent Pokémon/i)).toBeDefined();
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('se existe na página uma seção com os mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const pikachuL = 'Pikachu location';
    expect(screen.getByRole('heading', { name: /Game Locations of Pikachu/i }));
    expect(screen.getAllByRole('img', { name: pikachuL }).length).toBe(2);
    const img = screen.getAllByRole('img', { name: pikachuL });
    expect(img[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[0].alt).toBe(pikachuL);
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(img[1].alt).toBe(pikachuL);
    expect(screen.getByText('Kanto Viridian Forest')).toBeDefined();
    expect(screen.getByText('Kanto Power Plant')).toBeDefined();
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/148');

    const pokemonF = screen.getByRole('checkbox');
    expect(pokemonF).toBeDefined();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeDefined();
    userEvent.click(pokemonF);
    expect(screen.getByRole('img', { name: 'Dragonair is marked as favorite' }));
    userEvent.click(pokemonF);
    screen.getAllByRole('img').forEach((aa) => {
      expect(aa.alt !== 'Dragonair is marked as favorite').toBe(true);
    });
  });
});
